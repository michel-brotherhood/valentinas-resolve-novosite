

# Auditoria de Segurança – Valentina's Resolve

Conduzi auditoria adversarial assumindo abusador real. Abaixo, achados ordenados por severidade, com correções concretas e patches.

---

## Resumo executivo

**Bom (já protegido):**
- RLS habilitado em todas as 5 tabelas (`professionals`, `professional_documents`, `service_requests`, `rate_limit_attempts`, `user_roles`).
- `SELECT/UPDATE` restritos a `admin`/`staff` via `has_role()` (security definer).
- Bucket `professional-documents` é **privado** (`public: false`).
- Service role só é usada em Edge Functions (server-side), nunca no cliente.
- HTML escape em e-mails, validação de MIME e sanitização de nome de arquivo.
- `user_roles` em tabela separada (sem privilege escalation).

**Crítico que bloqueia operação contínua:**
1. Rate limiting trivialmente bypassável (chave = e-mail enviado pelo cliente).
2. Sem proteção anti-bot (sem honeypot, sem time-trap, sem CAPTCHA).
3. Política de Storage permite upload anônimo para qualquer caminho do bucket (poluição/abuso).
4. RLS de `INSERT` totalmente aberto sem WITH CHECK semântico → injeção de lixo, custo, DoS lógico.
5. Edge Functions deployadas com `verify_jwt = true` por default mas chamadas com a publishable key (ok), porém **sem qualquer assinatura/origem verificada** → spam pode vir de qualquer origem.
6. `professional_documents.INSERT` aberto a `anon` permite vincular documento a `professional_id` arbitrário (IDOR de escrita).

---

## Achados detalhados

### 🔴 SEV-1 | Rate limit bypassável (todas as Edge Functions)
- **Local:** `send-contact-email`, `send-hire-service-email`, `send-professional-email`, `send-accounting-email`.
- **Impacto:** Atacante muda 1 caractere do e-mail (`a+1@x.com`, `a+2@x.com`…) e envia ilimitado. Custo Resend, custo DB, possível bloqueio do domínio remetente, flood na caixa de atendimento.
- **Exploração:** `for i in {1..10000}; curl ... -d '{"email":"a+'$i'@x.com",...}'`
- **Correção:** rate limit por **IP** (header `cf-connecting-ip` / `x-forwarded-for`) **e** por e-mail, ambos. Janela: 5 req / IP / 15 min e 3 req / e-mail / 15 min.

### 🔴 SEV-1 | Sem anti-bot (honeypot + time-trap)
- **Local:** todos os formulários públicos.
- **Impacto:** Bots simples enchem banco e caixa de e-mail.
- **Correção:** Adicionar campo honeypot oculto + carimbo de timestamp de render. Servidor rejeita se honeypot preenchido OU se submissão < 3 s desde render OU > 2 h.

### 🔴 SEV-1 | IDOR em `professional_documents` (escrita)
- **Local:** RLS `Anyone can insert documents WITH CHECK (true)`.
- **Impacto:** Anônimo pode inserir linhas com qualquer `professional_id` e qualquer `file_path`, vinculando documentos falsos a profissionais reais.
- **Exploração:** Uma chamada direta ao PostgREST com `apikey: anon` insere linha apontando para profissional alvo.
- **Correção:** **Revogar INSERT público nesta tabela.** Apenas a Edge Function (service role) insere. RLS do anon vira `WITH CHECK (false)`.

### 🔴 SEV-1 | Storage: upload anônimo irrestrito
- **Local:** policy `Anyone can upload documents` no bucket `professional-documents`.
- **Impacto:** Qualquer um faz `PUT` de arquivos arbitrários no bucket (qualquer caminho, qualquer tipo), enchendo storage e gerando custo.
- **Correção:** **Revogar policy de INSERT pública no Storage.** Edge Function (service role) é a única que sobe arquivos. Anônimo não precisa de acesso direto.

### 🟠 SEV-2 | INSERT público sem WITH CHECK semântico em `professionals` e `service_requests`
- **Impacto:** Atacante grava registros com `status='approved'`, datas absurdas, campos enormes. Lixo no painel admin, possível confiança indevida.
- **Correção:** WITH CHECK força `status = 'pending'` e limita tamanhos de string básicos no banco (cinto e suspensórios da validação na Edge Function).

### 🟠 SEV-2 | `rate_limit_attempts` com INSERT público sem restrição
- **Impacto:** Atacante envenena a tabela com lixo até forçar a limpeza horária a falhar / ler lento.
- **Correção:** WITH CHECK exige `attempt_type IN (...)` e tamanho de `identifier <= 320`.

### 🟠 SEV-2 | CORS `Access-Control-Allow-Origin: *` em todas as funções
- **Impacto:** Qualquer site no mundo pode invocar suas funções via fetch do navegador.
- **Correção:** Restringir a `https://valentinasresolve.com.br`, `https://*.lovable.app` e domínio do preview.

### 🟡 SEV-3 | `reply_to` controlado pelo usuário sem normalização extra
- **Impacto:** Atacante coloca header injection via newline em e-mails malformados (Resend filtra a maioria, mas não confiar).
- **Correção:** rejeitar `\r`/`\n` em e-mail antes de aceitar.

### 🟡 SEV-3 | Logs vazam PII
- `console.log("Sending professional registration email:", data.fullName)` etc.
- **Correção:** logar apenas hash/iniciais, nunca nome/CPF/e-mail completo.

### 🟡 SEV-3 | Validação de CPF é só dígito/formato
- Aceita `12345678901`. **Correção:** validar dígito verificador real (algoritmo CPF/CNPJ).

### 🟢 SEV-4 | Falta auth no projeto
- Não há tela de login para admins. Como `SELECT` exige `authenticated + has_role`, ninguém consegue ver o que foi gravado pela UI. Não é vazamento, mas significa que dados sensíveis ficam sem painel — **operacionalmente bloqueante**: ou criar painel admin com auth, ou parar de gravar PII no DB.

---

## O que ainda pode vazar (mesmo com tudo acima corrigido)

- **PII em e-mail Resend:** CPF, endereço, telefone, foto de documento ficam na conta Resend e na inbox. Risco real se a conta Resend ou a caixa for comprometida. Mitigar: rotacionar credenciais, MFA na inbox, retenção curta no Resend.
- **DoS de custo:** mesmo com rate limit, alguém com botnet (IPs distintos) consegue gastar cota Resend. Bloqueio só com CAPTCHA real (hCaptcha/Turnstile) em produção.
- **Documentos no Storage privado** dependem de signed URLs futuras: hoje só admin via dashboard pode ver. Se um dia exposer signed URLs no front, revisar TTL.

---

## Plano técnico (para aplicar quando você aprovar)

### 1. Migração SQL (substitui policies inseguras)

```sql
-- DOCS: anônimo NÃO insere mais; só service role
DROP POLICY "Anyone can insert documents" ON public.professional_documents;
CREATE POLICY "No anon insert on documents"
  ON public.professional_documents FOR INSERT TO anon, authenticated
  WITH CHECK (false);

-- STORAGE: revogar upload anônimo
DROP POLICY "Anyone can upload documents" ON storage.objects;
-- (sem nova policy de insert: service role bypassa RLS)

-- PROFESSIONALS: forçar status pending e tamanhos
DROP POLICY "Anyone can insert professionals" ON public.professionals;
CREATE POLICY "Public insert pending professionals"
  ON public.professionals FOR INSERT TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND length(full_name) BETWEEN 2 AND 200
    AND length(email)     BETWEEN 5 AND 255
    AND length(cpf)       BETWEEN 11 AND 18
    AND length(description) BETWEEN 20 AND 2000
  );

-- SERVICE_REQUESTS: idem
DROP POLICY "Anyone can insert service requests" ON public.service_requests;
CREATE POLICY "Public insert pending service requests"
  ON public.service_requests FOR INSERT TO anon, authenticated
  WITH CHECK (
    status = 'pending'
    AND length(client_name)  BETWEEN 2 AND 100
    AND length(client_email) BETWEEN 5 AND 255
    AND length(description)  BETWEEN 10 AND 2000
  );

-- RATE LIMIT: restringir tipos válidos
DROP POLICY "Allow public insert for rate limiting" ON public.rate_limit_attempts;
CREATE POLICY "Public insert valid rate limit"
  ON public.rate_limit_attempts FOR INSERT TO public
  WITH CHECK (
    attempt_type IN ('contact','hire_service','professional','accounting','ip')
    AND length(identifier) <= 320
  );

-- Índice extra para rate limit por IP
CREATE INDEX IF NOT EXISTS idx_rate_limit_ip
  ON public.rate_limit_attempts(identifier, attempt_type, created_at DESC);
```

### 2. Edge Functions – módulo compartilhado `_shared/security.ts`

- `getClientIp(req)` → lê `cf-connecting-ip` ou primeiro de `x-forwarded-for`.
- `checkRateLimit(supabase, { ip, email, type })` → bloqueia se `>5/IP/15min` ou `>3/email/15min`.
- `validateAntiBot({ honeypot, renderedAt })` → rejeita se `honeypot` não vazio, ou `Date.now() - renderedAt < 3000`, ou `> 7200000`.
- `sanitizeEmailHeader(email)` → bloqueia `\r\n`.
- CORS allowlist (env `ALLOWED_ORIGINS`).

Aplicar nos 4 handlers antes da lógica atual.

### 3. Frontend – honeypot + time-trap em todos os 4 forms

```tsx
// estado
const [renderedAt] = useState(() => Date.now());
const [hp, setHp] = useState(""); // honeypot

// JSX (escondido CSS + aria-hidden)
<input
  type="text" name="company_website" tabIndex={-1} autoComplete="off"
  value={hp} onChange={e => setHp(e.target.value)}
  style={{ position:"absolute", left:"-9999px", opacity:0, height:0, width:0 }}
  aria-hidden="true"
/>

// no body do POST
body: JSON.stringify({ ...payload, _hp: hp, _t: renderedAt })
```

### 4. Logs sem PII

Substituir `console.log("...", data.fullName)` por `console.log("submission ok", { id, masked: data.email.replace(/(.).+(@.+)/, "$1***$2") })`.

### 5. Validação CPF real

Adicionar função com cálculo de dígito verificador em `_shared/validators.ts` e usar nas 4 funções.

### 6. CORS restrito

```ts
const ALLOWED = ["https://valentinasresolve.com.br", "https://valentinas-resolve-site.lovable.app"];
const origin = req.headers.get("origin") ?? "";
const allowOrigin = ALLOWED.includes(origin) ? origin : ALLOWED[0];
const corsHeaders = { "Access-Control-Allow-Origin": allowOrigin, ... };
```

---

## Como testar após a correção

1. **IDOR docs:** `curl POST /rest/v1/professional_documents` com anon key e `professional_id=<uuid de outro>` → deve retornar 401/403.
2. **Storage:** `curl POST /storage/v1/object/professional-documents/x.pdf` com anon → 403.
3. **Honeypot:** submeter form com `_hp="x"` → 400 "request rejected".
4. **Time-trap:** submeter `_t = Date.now()` (instantâneo) → 400.
5. **Rate IP:** disparar 6 POSTs rápidos do mesmo IP com e-mails diferentes → 6º retorna 429.
6. **CORS:** `curl -H "Origin: https://evil.com" -X OPTIONS …` → header `Access-Control-Allow-Origin` ≠ `evil.com`.
7. **Status injection:** POST `service_requests` com `status:'completed'` direto via PostgREST → 403 (RLS WITH CHECK).
8. **CPF inválido:** `cpf:"11111111111"` → 400.

---

## Bloqueadores para produção

1. Aplicar a migração SQL acima (IDOR + storage + WITH CHECK).
2. Implantar `_shared/security.ts` com rate limit por IP, honeypot, time-trap, CORS allowlist.
3. Tirar PII dos logs.
4. Decidir: ou criar painel admin com auth (para operar a base), ou **parar de persistir PII** e usar só e-mail.

Sem 1–3, **não publicar**. Item 4 não é vazamento, mas é bloqueio operacional.

