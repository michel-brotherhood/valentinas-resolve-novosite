import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Sempre true, não pode ser desativado
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    } else {
      // Carregar preferências salvas
      const saved = localStorage.getItem("cookiePreferences");
      if (saved) {
        setPreferences(JSON.parse(saved));
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem("cookiePreferences", JSON.stringify(prefs));
    localStorage.setItem("cookieConsent", "custom");
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(onlyNecessary);
  };

  const handleSaveCustom = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-background border-t border-border shadow-lg animate-slide-in-bottom">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Header with close button on mobile */}
            <div className="flex items-start gap-2 sm:gap-3">
              <Cookie className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
                  Este site utiliza cookies
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Utilizamos cookies essenciais e opcionais.{" "}
                  <Link to="/politica-privacidade" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                  {" "}e{" "}
                  <Link to="/termos-de-uso" className="text-primary hover:underline">
                    Termos de Uso
                  </Link>
                  .
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRejectAll}
                className="flex-shrink-0 h-8 w-8 sm:hidden"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Buttons - stack on mobile, inline on desktop */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setShowSettings(true)}
                size="sm"
                className="w-full sm:w-auto text-xs sm:text-sm h-9 sm:h-10"
              >
                <Settings className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Preferências
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  size="sm"
                  className="flex-1 sm:flex-none text-xs sm:text-sm h-9 sm:h-10"
                >
                  Rejeitar
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  size="sm"
                  className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 text-black font-semibold text-xs sm:text-sm h-9 sm:h-10"
                >
                  Aceitar Todos
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRejectAll}
                className="hidden sm:flex flex-shrink-0"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="h-5 w-5 text-primary" />
              Preferências de Cookies
            </DialogTitle>
            <DialogDescription>
              Gerencie suas preferências de cookies. Os cookies necessários não podem ser desativados pois são essenciais para o funcionamento do site.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Necessary Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 border border-border rounded-lg bg-muted/30">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Label className="text-base font-semibold">Cookies Necessários</Label>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Sempre Ativo</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Estes cookies são essenciais para o funcionamento básico do site, incluindo segurança, acessibilidade e funções de navegação. Não podem ser desativados.
                </p>
              </div>
              <Switch
                checked={preferences.necessary}
                disabled
                className="mt-1"
              />
            </div>

            {/* Analytics Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 border border-border rounded-lg">
              <div className="flex-1">
                <Label className="text-base font-semibold mb-2 block">Cookies Analíticos</Label>
                <p className="text-sm text-muted-foreground">
                  Estes cookies nos ajudam a entender como os visitantes interagem com o site, coletando e reportando informações de forma anônima. Isso nos permite melhorar a experiência do usuário.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) => 
                  setPreferences({ ...preferences, analytics: checked })
                }
                className="mt-1"
              />
            </div>

            {/* Marketing Cookies */}
            <div className="flex items-start justify-between gap-4 p-4 border border-border rounded-lg">
              <div className="flex-1">
                <Label className="text-base font-semibold mb-2 block">Cookies de Marketing</Label>
                <p className="text-sm text-muted-foreground">
                  Estes cookies são usados para rastrear visitantes através de diferentes sites com o objetivo de exibir anúncios relevantes e engajadores. Podem ser usados por parceiros de publicidade.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) => 
                  setPreferences({ ...preferences, marketing: checked })
                }
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setShowSettings(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSaveCustom}
              className="bg-primary hover:bg-primary/90 text-black font-semibold"
            >
              Salvar Preferências
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
