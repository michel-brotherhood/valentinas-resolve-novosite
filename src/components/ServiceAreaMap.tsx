import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import mapaRondonia from "@/assets/mapa-rondonia.webp";

export const ServiceAreaMap = () => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section className="py-6 md:py-10 bg-[hsl(0,0%,5%)] overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`scroll-reveal ${isVisible ? "is-visible" : ""}`}
        >
          {/* Header */}
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3">
              Onde Atuamos
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
              Atendemos todo o estado de Rondônia com profissionais qualificados
              e prontos para atender você
            </p>
          </div>

          {/* Map */}
          <div className="max-w-[200px] sm:max-w-xs md:max-w-sm mx-auto">
            <img
              src={mapaRondonia}
              alt="Mapa de atuação em Rondônia — Porto Velho, Ariquemes, Ji-Paraná e Cacoal"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
