export interface Service {
  name: string;
  description: string;
  companyTypes?: ("MEI" | "LTDA" | "EI" | "Todos")[];
  regions?: string[];
}

export interface Subcategory {
  name: string;
  description: string;
  services: Service[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  subcategories: Subcategory[];
}

export const servicesData: Category[] = [
  {
    id: "domesticos",
    name: "Domésticos",
    icon: "Home",
    description: "Serviços residenciais e de manutenção doméstica",
    subcategories: [
      {
        name: "Limpeza Residencial",
        description: "Serviços de limpeza para sua casa",
        services: [
          { name: "Faxina completa", description: "Limpeza profunda de toda residência" },
          { name: "Limpeza leve", description: "Manutenção básica e organização" },
          { name: "Limpeza de rotina", description: "Serviço regular de higienização" },
        ],
      },
      {
        name: "Limpeza Pós-Obra",
        description: "Limpeza após reformas e construções",
        services: [
          { name: "Limpeza pesada", description: "Remoção de resíduos e sujeira de obra" },
          { name: "Retirada de entulho", description: "Coleta e descarte de materiais" },
          { name: "Finalização", description: "Acabamento e polimento final" },
        ],
      },
      {
        name: "Limpeza Comercial",
        description: "Limpeza para ambientes corporativos",
        services: [
          { name: "Escritórios", description: "Limpeza de ambientes corporativos" },
          { name: "Lojas", description: "Higienização de estabelecimentos comerciais" },
          { name: "Consultórios", description: "Limpeza especializada para área da saúde" },
        ],
      },
      {
        name: "Limpeza Especializada",
        description: "Serviços de limpeza específicos",
        services: [
          { name: "Estofados", description: "Higienização profunda de sofás e poltronas" },
          { name: "Carpetes", description: "Limpeza profissional de carpetes" },
          { name: "Pisos", description: "Tratamento e polimento de pisos" },
          { name: "Vidros", description: "Limpeza de janelas e fachadas" },
          { name: "Ar-condicionado", description: "Higienização e manutenção" },
        ],
      },
      {
        name: "Manutenção e Higiene",
        description: "Serviços de manutenção preventiva",
        services: [
          { name: "Caixa d'água", description: "Limpeza e desinfecção" },
          { name: "Piscina", description: "Tratamento e manutenção" },
          { name: "Toldos", description: "Lavagem e conservação" },
          { name: "Fachada", description: "Limpeza de fachadas prediais" },
        ],
      },
    ],
  },
  {
    id: "beleza",
    name: "Beleza",
    icon: "Sparkles",
    description: "Serviços de beleza e estética",
    subcategories: [
      {
        name: "Cabelos e Barba",
        description: "Cuidados capilares e barbearia",
        services: [
          { name: "Corte", description: "Cortes modernos e clássicos" },
          { name: "Escova", description: "Escova modeladora profissional" },
          { name: "Prancha", description: "Alisamento e modelagem" },
          { name: "Barba", description: "Design e manutenção de barba" },
          { name: "Tratamento capilar", description: "Hidratação e reconstrução" },
        ],
      },
      {
        name: "Unhas e Sobrancelhas",
        description: "Cuidados com unhas e design de sobrancelhas",
        services: [
          { name: "Manicure", description: "Cuidados com as unhas das mãos" },
          { name: "Pedicure", description: "Cuidados com os pés" },
          { name: "Design de sobrancelhas", description: "Modelagem e design" },
          { name: "Alongamento de unhas", description: "Aplicação de alongamento" },
          { name: "Henna", description: "Aplicação de henna" },
        ],
      },
      {
        name: "Maquiagem e Penteados",
        description: "Serviços para eventos especiais",
        services: [
          { name: "Maquiagem social", description: "Make para eventos" },
          { name: "Maquiagem para eventos", description: "Maquiagem profissional" },
          { name: "Noivas", description: "Penteado e make para casamento" },
          { name: "Madrinhas", description: "Beleza para madrinhas" },
        ],
      },
      {
        name: "Cuidados com a Pele",
        description: "Tratamentos faciais e corporais",
        services: [
          { name: "Limpeza de pele", description: "Limpeza profunda facial" },
          { name: "Peeling", description: "Renovação celular" },
          { name: "Estética facial", description: "Tratamentos faciais" },
          { name: "Estética corporal", description: "Tratamentos corporais" },
        ],
      },
      {
        name: "Massagem e Spa",
        description: "Relaxamento e bem-estar",
        services: [
          { name: "Massagem relaxante", description: "Relaxamento muscular" },
          { name: "Drenagem linfática", description: "Tratamento drenante" },
          { name: "Day spa domiciliar", description: "Spa em casa" },
        ],
      },
    ],
  },
  {
    id: "saude",
    name: "Saúde",
    icon: "Heart",
    description: "Serviços de saúde e bem-estar",
    subcategories: [
      {
        name: "Atendimento Médico Domiciliar",
        description: "Consultas médicas em casa",
        services: [
          { name: "Clínico geral", description: "Consultas gerais" },
          { name: "Pediatria", description: "Atendimento infantil" },
          { name: "Geriatria", description: "Cuidados com idosos" },
        ],
      },
      {
        name: "Enfermagem e Cuidados",
        description: "Serviços de enfermagem",
        services: [
          { name: "Aplicação de medicamentos", description: "Injeções e soros" },
          { name: "Curativos", description: "Troca de curativos" },
          { name: "Cuidador", description: "Cuidados especializados" },
        ],
      },
      {
        name: "Fisioterapia e Reabilitação",
        description: "Tratamentos fisioterápicos",
        services: [
          { name: "Fisioterapia motora", description: "Reabilitação física" },
          { name: "Fisioterapia respiratória", description: "Tratamento respiratório" },
          { name: "RPG", description: "Reeducação postural" },
        ],
      },
      {
        name: "Psicologia e Terapias Alternativas",
        description: "Saúde mental e terapias",
        services: [
          { name: "Psicoterapia", description: "Terapia individual" },
          { name: "Acupuntura", description: "Medicina tradicional chinesa" },
          { name: "Reiki", description: "Terapia energética" },
        ],
      },
      {
        name: "Nutrição e Acompanhamento",
        description: "Consultoria nutricional",
        services: [
          { name: "Consulta nutricional", description: "Planejamento alimentar" },
          { name: "Dieta personalizada", description: "Cardápio individual" },
          { name: "Acompanhamento", description: "Monitoramento contínuo" },
        ],
      },
    ],
  },
  {
    id: "juridicos",
    name: "Jurídicos",
    icon: "Scale",
    description: "Serviços jurídicos e consultorias",
    subcategories: [
      {
        name: "Jurídico",
        description: "Orientação e documentos legais",
        services: [
          { name: "Advogado cível", description: "Direito civil" },
          { name: "Advogado trabalhista", description: "Direito do trabalho" },
          { name: "Advogado criminal", description: "Defesa criminal" },
          { name: "Advogado de família", description: "Divórcios e inventários" },
        ],
      },
      {
        name: "Contábil e Tributário",
        description: "Serviços contábeis integrados",
        services: [
          { 
            name: "Contabilidade Integrada", 
            description: "DADOS QUE CONECTAM. RESULTADOS QUE TRANSFORMAM. 9 anos de experiência, CRC: RO-010414/O-5. Atende MEI, LTDA e EI",
            companyTypes: ["MEI", "LTDA", "EI"],
            regions: ["Nacional"]
          },
          { 
            name: "Consultoria contábil", 
            description: "Gestão contábil",
            companyTypes: ["Todos"],
            regions: ["Nacional"]
          },
          { 
            name: "Consultoria tributária", 
            description: "Planejamento fiscal",
            companyTypes: ["Todos"],
            regions: ["Nacional"]
          },
          { 
            name: "Declaração de IR", 
            description: "Imposto de renda",
            companyTypes: ["Todos"],
            regions: ["Nacional"]
          },
        ],
      },
      {
        name: "Recursos Humanos e Marketing",
        description: "Consultoria empresarial",
        services: [
          { name: "Consultoria em RH", description: "Gestão de pessoas" },
          { name: "Consultoria em marketing", description: "Estratégias comerciais" },
          { name: "Coaching empresarial", description: "Desenvolvimento organizacional" },
        ],
      },
      {
        name: "Consultoria Agropecuária",
        description: "Gestão rural e agrícola",
        services: [
          { name: "Gestão rural", description: "Administração de fazendas" },
          { name: "Consultoria agrícola", description: "Produção agrícola" },
          { name: "Consultoria pecuária", description: "Criação de animais" },
        ],
      },
      {
        name: "Abertura de Empresas",
        description: "Constituição empresarial (MEI - LTDA - EI)",
        services: [
          { name: "Registro de empresa", description: "Formalização (MEI - LTDA - EI)" },
          { name: "Consultoria MEI", description: "Microempreendedor (MEI - LTDA - EI)" },
          { name: "Alteração contratual", description: "Mudanças societárias (MEI - LTDA - EI)" },
        ],
      },
    ],
  },
  {
    id: "educacao",
    name: "Educação",
    icon: "GraduationCap",
    description: "Serviços educacionais",
    subcategories: [
      {
        name: "Reforço Escolar",
        description: "Aulas particulares",
        services: [
          { name: "Matemática", description: "Reforço em matemática" },
          { name: "Português", description: "Gramática e redação" },
          { name: "Ciências", description: "Biologia, física e química" },
        ],
      },
      {
        name: "Idiomas",
        description: "Aulas de línguas estrangeiras",
        services: [
          { name: "Inglês", description: "Conversação e gramática" },
          { name: "Espanhol", description: "Aulas de espanhol" },
          { name: "Francês", description: "Língua francesa" },
        ],
      },
      {
        name: "Música e Artes",
        description: "Educação artística",
        services: [
          { name: "Violão", description: "Aulas de violão" },
          { name: "Piano", description: "Aulas de piano" },
          { name: "Canto", description: "Técnica vocal" },
          { name: "Desenho", description: "Artes plásticas" },
        ],
      },
      {
        name: "Informática e Programação",
        description: "Tecnologia e computação",
        services: [
          { name: "Informática básica", description: "Introdução ao computador" },
          { name: "Excel avançado", description: "Planilhas profissionais" },
          { name: "Programação", description: "Desenvolvimento de software" },
        ],
      },
      {
        name: "Preparatórios e Treinamentos",
        description: "Cursos profissionalizantes",
        services: [
          { name: "Preparatório ENEM", description: "Preparação para vestibular" },
          { name: "Concursos", description: "Preparação para concursos" },
          { name: "Certificações", description: "Treinamentos técnicos" },
        ],
      },
    ],
  },
  {
    id: "automotivos",
    name: "Automotivos",
    icon: "Car",
    description: "Serviços automotivos",
    subcategories: [
      {
        name: "Higienização e Estética Veicular",
        description: "Limpeza e embelezamento",
        services: [
          { name: "Lavagem completa", description: "Lavagem interna e externa" },
          { name: "Polimento", description: "Polimento de pintura" },
          { name: "Cristalização", description: "Proteção de pintura" },
          { name: "Higienização interna", description: "Limpeza profunda interna" },
        ],
      },
      {
        name: "Mecânica Rápida",
        description: "Serviços mecânicos básicos",
        services: [
          { name: "Diagnóstico", description: "Avaliação mecânica" },
          { name: "Freios", description: "Manutenção de freios" },
          { name: "Suspensão", description: "Reparos de suspensão" },
        ],
      },
      {
        name: "Troca de Óleo e Revisão",
        description: "Manutenção preventiva",
        services: [
          { name: "Troca de óleo", description: "Lubrificação do motor" },
          { name: "Troca de filtros", description: "Filtros de ar, óleo e combustível" },
          { name: "Revisão periódica", description: "Check-up completo" },
        ],
      },
      {
        name: "Chaveiro Automotivo",
        description: "Serviços de chaveiro",
        services: [
          { name: "Cópia de chave", description: "Duplicação de chaves" },
          { name: "Chave codificada", description: "Programação eletrônica" },
          { name: "Abertura de veículo", description: "Destravamento" },
        ],
      },
      {
        name: "Guincho 24h",
        description: "Socorro veicular",
        services: [
          { name: "Reboque", description: "Transporte de veículos" },
          { name: "Socorro mecânico", description: "Atendimento emergencial" },
        ],
      },
      {
        name: "Serviços para Motos",
        description: "Manutenção de motocicletas",
        services: [
          { name: "Revisão de moto", description: "Manutenção completa" },
          { name: "Lavagem de moto", description: "Limpeza especializada" },
        ],
      },
    ],
  },
  {
    id: "pets",
    name: "Pets",
    icon: "Dog",
    description: "Serviços para animais de estimação",
    subcategories: [
      {
        name: "Banho e Tosa",
        description: "Estética pet",
        services: [
          { name: "Banho", description: "Higienização completa" },
          { name: "Tosa", description: "Corte e acabamento" },
          { name: "Tosa higiênica", description: "Higiene específica" },
        ],
      },
      {
        name: "Veterinário Domiciliar",
        description: "Atendimento veterinário em casa",
        services: [
          { name: "Consulta", description: "Avaliação clínica" },
          { name: "Vacinas", description: "Imunização" },
          { name: "Exames", description: "Diagnósticos" },
        ],
      },
      {
        name: "Pet Sitter e Passeio",
        description: "Cuidados e passeios",
        services: [
          { name: "Dog walker", description: "Passeio profissional" },
          { name: "Pet sitter", description: "Cuidador em casa" },
        ],
      },
      {
        name: "Adestramento",
        description: "Treinamento canino",
        services: [
          { name: "Adestramento básico", description: "Comandos essenciais" },
          { name: "Adestramento avançado", description: "Treinamento especializado" },
        ],
      },
      {
        name: "Transporte e Hospedagem",
        description: "Locomoção e hotelaria",
        services: [
          { name: "Transporte pet", description: "Transporte seguro" },
          { name: "Hotel pet", description: "Hospedagem" },
        ],
      },
    ],
  },
  {
    id: "eventos",
    name: "Eventos",
    icon: "PartyPopper",
    description: "Serviços para festas e eventos",
    subcategories: [
      {
        name: "Fotografia e Filmagem",
        description: "Registro profissional",
        services: [
          { name: "Fotografia de eventos", description: "Cobertura fotográfica" },
          { name: "Filmagem", description: "Vídeo profissional" },
          { name: "Drone", description: "Imagens aéreas" },
        ],
      },
      {
        name: "Buffet e Bartender",
        description: "Alimentação e bebidas",
        services: [
          { name: "Buffet completo", description: "Serviço de alimentação" },
          { name: "Coffee break", description: "Eventos corporativos" },
          { name: "Bartender", description: "Drinks profissionais" },
        ],
      },
      {
        name: "Decoração e Cerimonial",
        description: "Ambientação e organização",
        services: [
          { name: "Decoração", description: "Ambientação temática" },
          { name: "Cerimonial", description: "Organização de eventos" },
          { name: "Assessoria", description: "Coordenação completa" },
        ],
      },
      {
        name: "Locação de Estruturas",
        description: "Equipamentos e mobiliário",
        services: [
          { name: "Mesas e cadeiras", description: "Mobiliário para eventos" },
          { name: "Tendas", description: "Cobertura" },
          { name: "Som e iluminação", description: "Equipamentos audiovisuais" },
        ],
      },
      {
        name: "Recreação e Música",
        description: "Animação e entretenimento",
        services: [
          { name: "Recreação infantil", description: "Animação para crianças" },
          { name: "DJ", description: "Música eletrônica" },
          { name: "Banda ao vivo", description: "Música ao vivo" },
        ],
      },
    ],
  },
  {
    id: "criativos",
    name: "Criativos",
    icon: "Palette",
    description: "Serviços criativos e digitais",
    subcategories: [
      {
        name: "Design e Identidade Visual",
        description: "Criação de marcas",
        services: [
          { name: "Logo", description: "Criação de logotipo" },
          { name: "Identidade visual", description: "Manual de marca" },
          { name: "Design gráfico", description: "Peças gráficas" },
        ],
      },
      {
        name: "Social Media e Marketing",
        description: "Marketing digital",
        services: [
          { name: "Gestão de redes sociais", description: "Social media" },
          { name: "Anúncios online", description: "Tráfego pago" },
          { name: "Estratégia digital", description: "Planejamento" },
        ],
      },
      {
        name: "Sites e Lojas Virtuais",
        description: "Desenvolvimento web",
        services: [
          { name: "Site institucional", description: "Website empresarial" },
          { name: "E-commerce", description: "Loja virtual" },
          { name: "Landing page", description: "Página de vendas" },
        ],
      },
      {
        name: "Foto, Vídeo e Edição",
        description: "Produção audiovisual",
        services: [
          { name: "Fotografia profissional", description: "Ensaios fotográficos" },
          { name: "Edição de vídeo", description: "Pós-produção" },
          { name: "Motion graphics", description: "Animações" },
        ],
      },
      {
        name: "Produção de Conteúdo e Copywriting",
        description: "Criação de textos",
        services: [
          { name: "Redação publicitária", description: "Textos persuasivos" },
          { name: "Artigos para blog", description: "Conteúdo editorial" },
          { name: "Scripts", description: "Roteiros" },
        ],
      },
    ],
  },
  {
    id: "construcao",
    name: "Construção",
    icon: "Hammer",
    description: "Serviços de construção e reforma",
    subcategories: [
      {
        name: "Elétrica e Hidráulica",
        description: "Instalações prediais",
        services: [
          { name: "Instalação elétrica", description: "Fiação e quadros" },
          { name: "Manutenção elétrica", description: "Reparos elétricos" },
          { name: "Instalação hidráulica", description: "Encanamento" },
          { name: "Manutenção hidráulica", description: "Vazamentos e reparos" },
        ],
      },
      {
        name: "Pintura e Pequenos Reparos",
        description: "Acabamento e manutenção",
        services: [
          { name: "Pintura residencial", description: "Pintura de casas" },
          { name: "Pintura comercial", description: "Pintura de estabelecimentos" },
          { name: "Reparos gerais", description: "Pequenos consertos" },
        ],
      },
      {
        name: "Instalações e Montagens",
        description: "Montagem de estruturas",
        services: [
          { name: "Montagem de móveis", description: "Móveis planejados" },
          { name: "Instalação de cortinas", description: "Cortinas e persianas" },
          { name: "Instalação de luminárias", description: "Iluminação" },
        ],
      },
      {
        name: "Marcenaria e Serralheria",
        description: "Trabalhos em madeira e metal",
        services: [
          { name: "Móveis sob medida", description: "Marcenaria customizada" },
          { name: "Portas e janelas", description: "Esquadrias" },
          { name: "Grades e portões", description: "Serralheria" },
        ],
      },
      {
        name: "Telhados, Forros e Pisos",
        description: "Cobertura e acabamento",
        services: [
          { name: "Instalação de telhado", description: "Coberturas" },
          { name: "Manutenção de telhado", description: "Reparos em telhados" },
          { name: "Instalação de forro", description: "Forros de gesso e PVC" },
          { name: "Instalação de piso", description: "Revestimentos" },
        ],
      },
    ],
  },
  {
    id: "transporte",
    name: "Transporte",
    icon: "Truck",
    description: "Serviços de transporte e logística",
    subcategories: [
      {
        name: "Motorista Particular",
        description: "Transporte executivo",
        services: [
          { name: "Motorista executivo", description: "Transporte corporativo" },
          { name: "Motorista de aplicativo", description: "Corridas urbanas" },
        ],
      },
      {
        name: "Frete e Carretos",
        description: "Transporte de cargas",
        services: [
          { name: "Mudanças", description: "Transporte de mudanças" },
          { name: "Carreto", description: "Fretes pequenos" },
          { name: "Frete", description: "Transporte de cargas" },
        ],
      },
      {
        name: "Entregas Expressas",
        description: "Delivery rápido",
        services: [
          { name: "Motoboy", description: "Entregas rápidas" },
          { name: "Entrega expressa", description: "Same day delivery" },
        ],
      },
      {
        name: "Transporte Escolar",
        description: "Transporte de estudantes",
        services: [
          { name: "Van escolar", description: "Transporte regular" },
          { name: "Transporte universitário", description: "Faculdades" },
        ],
      },
      {
        name: "Guincho e Transporte de Veículos",
        description: "Socorro e reboque",
        services: [
          { name: "Guincho", description: "Reboque 24h" },
          { name: "Transporte de veículos", description: "Cegonha" },
        ],
      },
    ],
  },
  {
    id: "agricultura",
    name: "Agricultura",
    icon: "Sprout",
    description: "Serviços agrícolas e pecuários",
    subcategories: [
      {
        name: "Serviços Agrícolas",
        description: "Plantio e colheita",
        services: [
          { name: "Plantio", description: "Preparo e plantio" },
          { name: "Colheita", description: "Colheita mecanizada" },
          { name: "Tratorista", description: "Operador de trator" },
        ],
      },
      {
        name: "Consultoria e Manejo Rural",
        description: "Gestão agrícola",
        services: [
          { name: "Consultoria agrícola", description: "Assessoria técnica" },
          { name: "Manejo de solo", description: "Análise e correção" },
          { name: "Controle de pragas", description: "Manejo fitossanitário" },
        ],
      },
      {
        name: "Irrigação e Energia Solar",
        description: "Infraestrutura rural",
        services: [
          { name: "Instalação de irrigação", description: "Sistemas de irrigação" },
          { name: "Manutenção de irrigação", description: "Reparos" },
          { name: "Energia solar rural", description: "Painéis fotovoltaicos" },
        ],
      },
      {
        name: "Construção Rural",
        description: "Edificações rurais",
        services: [
          { name: "Currais", description: "Construção de currais" },
          { name: "Galpões", description: "Barracões rurais" },
          { name: "Cercas", description: "Cercamento de propriedades" },
        ],
      },
      {
        name: "Manutenção de Máquinas e Cercas",
        description: "Conservação rural",
        services: [
          { name: "Mecânica agrícola", description: "Manutenção de máquinas" },
          { name: "Manutenção de cercas", description: "Reparos em cercas" },
        ],
      },
    ],
  },
  {
    id: "personalizados",
    name: "Personalizados",
    icon: "Star",
    description: "Serviços personalizados e especializados",
    subcategories: [
      {
        name: "Organização e Concierge",
        description: "Personal organizer",
        services: [
          { name: "Personal organizer", description: "Organização residencial" },
          { name: "Concierge", description: "Serviços de concierge" },
        ],
      },
      {
        name: "Personal Shopper",
        description: "Consultoria de moda e compras",
        services: [
          { name: "Personal shopper", description: "Consultoria de compras" },
          { name: "Consultoria de imagem", description: "Estilo pessoal" },
        ],
      },
      {
        name: "Assistência a Idosos e Babá",
        description: "Cuidados especiais",
        services: [
          { name: "Cuidador de idosos", description: "Assistência especializada" },
          { name: "Babá", description: "Cuidados infantis" },
          { name: "Acompanhante", description: "Companhia" },
        ],
      },
      {
        name: "Secretariado Virtual",
        description: "Assistência administrativa",
        services: [
          { name: "Secretária virtual", description: "Suporte administrativo" },
          { name: "Gestão de agenda", description: "Organização de compromissos" },
        ],
      },
      {
        name: "Consultoria de Viagem",
        description: "Planejamento de viagens",
        services: [
          { name: "Roteiros personalizados", description: "Planejamento de viagens" },
          { name: "Reservas", description: "Hotéis e passagens" },
        ],
      },
    ],
  },
  {
    id: "turismo",
    name: "Turismo",
    icon: "Plane",
    description: "Serviços de lazer e turismo",
    subcategories: [
      {
        name: "Passeios e Trilhas",
        description: "Ecoturismo",
        services: [
          { name: "Trilhas ecológicas", description: "Caminhadas na natureza" },
          { name: "Passeios guiados", description: "City tour" },
        ],
      },
      {
        name: "Turismo Rural e de Pesca",
        description: "Experiências rurais",
        services: [
          { name: "Turismo rural", description: "Fazendas e sítios" },
          { name: "Pesca esportiva", description: "Pescarias guiadas" },
        ],
      },
      {
        name: "Locação de Equipamentos",
        description: "Equipamentos para aventura",
        services: [
          { name: "Bicicletas", description: "Aluguel de bikes" },
          { name: "Equipamentos de camping", description: "Barracas e acessórios" },
        ],
      },
      {
        name: "Turismo de Aventura",
        description: "Esportes radicais",
        services: [
          { name: "Rapel", description: "Descida em cordas" },
          { name: "Tirolesa", description: "Voo de tirolesa" },
          { name: "Rafting", description: "Descida de rio" },
        ],
      },
      {
        name: "Roteiros Culturais",
        description: "Turismo cultural",
        services: [
          { name: "Museus", description: "Visitas guiadas" },
          { name: "Centros históricos", description: "Tours culturais" },
        ],
      },
    ],
  },
  {
    id: "esportes",
    name: "Esportes",
    icon: "Dumbbell",
    description: "Serviços esportivos e fitness",
    subcategories: [
      {
        name: "Personal Trainer e Treinamento Funcional",
        description: "Treinamento personalizado",
        services: [
          { name: "Personal trainer", description: "Treino individual" },
          { name: "Treinamento funcional", description: "Exercícios funcionais" },
          { name: "Musculação", description: "Treino de força" },
        ],
      },
      {
        name: "Aulas de Esportes e Dança",
        description: "Modalidades esportivas",
        services: [
          { name: "Futebol", description: "Aulas de futebol" },
          { name: "Natação", description: "Aulas de natação" },
          { name: "Dança", description: "Aulas de dança" },
        ],
      },
      {
        name: "Yoga e Meditação",
        description: "Práticas de bem-estar",
        services: [
          { name: "Yoga", description: "Aulas de yoga" },
          { name: "Pilates", description: "Método pilates" },
          { name: "Meditação", description: "Práticas meditativas" },
        ],
      },
      {
        name: "Reabilitação e Avaliação Física",
        description: "Saúde e performance",
        services: [
          { name: "Avaliação física", description: "Análise corporal" },
          { name: "Reabilitação", description: "Recuperação física" },
        ],
      },
      {
        name: "Treinos em Grupo",
        description: "Atividades coletivas",
        services: [
          { name: "Crossfit", description: "Treino intensivo" },
          { name: "Spinning", description: "Ciclismo indoor" },
          { name: "Circuito funcional", description: "Treino em grupo" },
        ],
      },
    ],
  },
];

export const getCategoryById = (id: string): Category | undefined => {
  return servicesData.find(cat => cat.id === id);
};

export const getAllServices = () => {
  return servicesData.flatMap(category =>
    category.subcategories.flatMap(subcategory =>
      subcategory.services.map(service => ({
        ...service,
        category: category.name,
        categoryId: category.id,
        subcategory: subcategory.name,
      }))
    )
  );
};
