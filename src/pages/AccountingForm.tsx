import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Mail, Upload } from "lucide-react";
import { maskPhone } from "@/lib/masks";

const accountingFormSchema = z.object({
  fullName: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  phone: z.string().trim().min(10, "Telefone inválido").max(20),
  email: z.string().trim().email("Email inválido").max(255),
  cityNeighborhood: z.string().trim().min(3, "Cidade/Bairro obrigatório").max(100),
  interestType: z.array(z.string()).min(1, "Selecione pelo menos um tipo de interesse"),
  description: z.string().trim().min(10, "Descrição muito curta").max(400),
  acceptTerms: z.boolean().refine(val => val === true, "Você deve aceitar os termos"),
});

const interestTypes = [
  "Sou cliente da plataforma e quero regularizar meu CPF",
  "Sou profissional autônomo e quero suporte contábil",
  "Tenho empresa e quero integração fiscal completa",
];

export default function AccountingForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    cityNeighborhood: "",
    interestType: [] as string[],
    description: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleInterestToggle = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interestType: prev.interestType.includes(value)
        ? prev.interestType.filter(v => v !== value)
        : [...prev.interestType, value]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validFormats = ['application/pdf', 'image/jpeg', 'image/png'];
      
      if (!validFormats.includes(file.type)) {
        toast({
          title: "Formato inválido",
          description: "Apenas PDF, JPG e PNG são aceitos",
          variant: "destructive",
        });
        return;
      }
      
      setUploadedFile(file);
      toast({
        title: "Arquivo anexado",
        description: file.name,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      accountingFormSchema.parse(formData);
      setErrors({});

      // Prepare WhatsApp message
      const message = `*Solicitação de Contabilidade*

*Nome:* ${formData.fullName}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Cidade/Bairro:* ${formData.cityNeighborhood}

*Tipo de Interesse:*
${formData.interestType.map(t => `• ${t}`).join('\n')}

*Descrição:* ${formData.description}

${uploadedFile ? `*Documento anexado:* ${uploadedFile.name}` : ''}`;

      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/5500000000000?text=${encodedMessage}`, "_blank");

      toast({
        title: "Solicitação enviada!",
        description: "Em breve entraremos em contato com você.",
      });

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        cityNeighborhood: "",
        interestType: [],
        description: "",
        acceptTerms: false,
      });
      setUploadedFile(null);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Contabilidade Integrada
            </h1>
            <p className="text-lg text-muted-foreground">
              Regularize seu CPF, obtenha suporte contábil ou integração fiscal completa
            </p>
          </div>

          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados Pessoais */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Dados Pessoais e de Contato</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Seu nome completo"
                    />
                    {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone / WhatsApp *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: maskPhone(e.target.value)})}
                      placeholder="+55 (11) 99999-9999"
                      maxLength={19}
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="cityNeighborhood">Cidade de Residência *</Label>
                    <Input
                      id="cityNeighborhood"
                      value={formData.cityNeighborhood}
                      onChange={(e) => setFormData({...formData, cityNeighborhood: e.target.value})}
                      placeholder="Cidade/Bairro"
                    />
                    {errors.cityNeighborhood && <p className="text-sm text-destructive mt-1">{errors.cityNeighborhood}</p>}
                  </div>
                </div>
              </div>

              {/* Tipo de Interesse */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Tipo de Interesse</h2>
                
                <div className="space-y-3">
                  {interestTypes.map(option => (
                    <div key={option} className="flex items-start space-x-3">
                      <Checkbox
                        id={option}
                        checked={formData.interestType.includes(option)}
                        onCheckedChange={() => handleInterestToggle(option)}
                      />
                      <Label htmlFor={option} className="font-normal cursor-pointer leading-tight">{option}</Label>
                    </div>
                  ))}
                </div>
                {errors.interestType && <p className="text-sm text-destructive mt-1">{errors.interestType}</p>}
              </div>

              {/* Descrição */}
              <div>
                <Label htmlFor="description">Descreva brevemente sua necessidade *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Conte-nos mais sobre sua situação e como podemos ajudar..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">Máximo 400 caracteres</p>
                {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
              </div>

              {/* Upload de Documento */}
              <div>
                <Label htmlFor="document">Anexar Documento (opcional)</Label>
                <div className="mt-2">
                  <label
                    htmlFor="document"
                    className="flex items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {uploadedFile ? uploadedFile.name : "Escolher arquivo"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, JPG, PNG
                      </p>
                    </div>
                  </label>
                  <input
                    id="document"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Formatos aceitos: PDF, JPG, PNG</p>
              </div>

              {/* Termos */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked) => setFormData({...formData, acceptTerms: checked as boolean})}
                  />
                  <Label htmlFor="acceptTerms" className="font-normal cursor-pointer">
                    Concordo em compartilhar meus dados com profissionais parceiros da plataforma para fins de orçamento.
                  </Label>
                </div>
                {errors.acceptTerms && <p className="text-sm text-destructive mt-1">{errors.acceptTerms}</p>}
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black font-bold">
                <Mail className="mr-2 h-5 w-5" />
                ENVIAR MENSAGEM
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Após o envio, um especialista entrará em contato via WhatsApp ou e-mail.
              </p>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
