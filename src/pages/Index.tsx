import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { PopularServices } from "@/components/PopularServices";
import { AccountingServices } from "@/components/AccountingServices";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Team } from "@/components/Team";
import { ProfessionalCallout } from "@/components/ProfessionalCallout";
import { Footer } from "@/components/Footer";
import { FloatingChat } from "@/components/FloatingChat";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <PopularServices />
      <AccountingServices />
      <HowItWorks />
      <ProfessionalCallout />
      <Testimonials />
      <FAQ />
      <Team />
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default Index;
