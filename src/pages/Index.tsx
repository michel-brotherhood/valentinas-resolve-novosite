import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { PopularServices } from "@/components/PopularServices";
import { HowItWorks } from "@/components/HowItWorks";
import { Team } from "@/components/Team";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <PopularServices />
      <HowItWorks />
      <Team />
      <Footer />
    </div>
  );
};

export default Index;
