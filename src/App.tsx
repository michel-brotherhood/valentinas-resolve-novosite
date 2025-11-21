import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FloatingChat } from "@/components/FloatingChat";
import { CookieConsent } from "@/components/CookieConsent";
import Index from "./pages/Index";
import ProfessionalRegistration from "./pages/ProfessionalRegistration";
import Services from "./pages/Services";
import Accounting from "./pages/Accounting";
import AccountingForm from "./pages/AccountingForm";
import Contact from "./pages/Contact";
import About from "./pages/About";
import TeamPage from "./pages/Team";
import WorkWithUs from "./pages/WorkWithUs";
import HireService from "./pages/HireService";
import CategoryPage from "./pages/CategoryPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/servicos/:categoria" element={<CategoryPage />} />
          <Route path="/contabilidade" element={<Accounting />} />
          <Route path="/formulario-contabilidade" element={<AccountingForm />} />
          <Route path="/contratar-servico" element={<HireService />} />
          <Route path="/equipe" element={<TeamPage />} />
          <Route path="/trabalhe-conosco" element={<WorkWithUs />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/registro-profissional" element={<ProfessionalRegistration />} />
          <Route path="/confirmacao" element={<ConfirmationPage />} />
          <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
          <Route path="/termos-de-uso" element={<TermsOfUse />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingChat />
        <CookieConsent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
