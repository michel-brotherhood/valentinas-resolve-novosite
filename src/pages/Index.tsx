import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { PopularServices } from "@/components/PopularServices";
import { AccountingServices } from "@/components/AccountingServices";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <PopularServices />
      <AccountingServices />
      <HowItWorks />
      <Testimonials />
      <Team />
      <Footer />
    </div>
  );
};

export default Index;
