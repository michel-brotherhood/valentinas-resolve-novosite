import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import mapaRondonia from "@/assets/mapa-rondonia.webp";

const cities = [
  { name: "Porto Velho", top: "18%", left: "28%" },
  { name: "Ariquemes", top: "35%", left: "38%" },
  { name: "Ji-Paraná", top: "52%", left: "55%" },
  { name: "Cacoal", top: "62%", left: "60%" },
];

export const ServiceAreaMap = () => {
  const { elementRef, isVisible } = useScrollReveal();

  return (
    <section className="py-12 md:py-24 bg-[hsl(0,0%,5%)] overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          ref={elementRef}
          className={`scroll-reveal ${isVisible ? "is-visible" : ""}`}
        >
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              📍 Onde Atuamos
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Atendemos todo o estado de Rondônia com profissionais qualificados
              e prontos para atender você
            </p>
          </div>

          {/* Map */}
          <div className="relative max-w-sm sm:max-w-xl md:max-w-3xl mx-auto">
            <img
              src={mapaRondonia}
              alt="Mapa de atuação em Rondônia"
              className="w-full h-auto rounded-2xl"
              loading="lazy"
            />

            {/* City markers */}
            {cities.map((city) => (
              <div
                key={city.name}
                className="absolute group"
                style={{ top: city.top, left: city.left }}
              >
                {/* Pulse ring */}
                <span className="absolute -inset-2 md:-inset-3 rounded-full bg-primary/30 animate-ping" />
                <span className="absolute -inset-1.5 md:-inset-2 rounded-full bg-primary/20" />

                {/* Dot */}
                <span className="relative block h-3 w-3 md:h-4 md:w-4 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary)),0_0_24px_hsl(var(--primary)/0.5)]" />

                {/* Label */}
                <span className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-card/90 backdrop-blur px-2 md:px-3 py-1 md:py-1.5 text-[10px] md:text-xs font-semibold text-primary border border-primary/30 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none">
                  {city.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
