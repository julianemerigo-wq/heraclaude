"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: "✨",
    title: "Crie seu evento",
    description:
      "Em menos de 3 minutos, configure todos os detalhes do seu evento: nome, data, local, tema visual e lista de convidados.",
    detail: "Escolha entre templates exclusivos ou crie do zero",
  },
  {
    number: "02",
    icon: "📨",
    title: "Envie os convites",
    description:
      "Convites digitais elegantes por WhatsApp, email ou link. Cada convidado recebe um acesso personalizado e exclusivo.",
    detail: "Acompanhe as aberturas e confirmações em tempo real",
  },
  {
    number: "03",
    icon: "🎊",
    title: "Viva o momento",
    description:
      "No dia do evento, o feed social, galeria colaborativa e check-in inteligente criam uma experiência inesquecível.",
    detail: "Memórias organizadas automaticamente para você",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hiw-title",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".hiw-title", start: "top 85%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".step-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
            delay: i * 0.15,
          }
        );
      });

      // Progress line animation
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1.5, ease: "power2.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="hiw-title text-center mb-16">
          <span className="inline-flex items-center gap-2 glass border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-medium text-purple-300 uppercase tracking-wider">
              Como funciona
            </span>
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            De zero ao evento dos sonhos<br />
            <span className="gradient-text">em 3 passos simples</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Sem complicação, sem curva de aprendizado. Só elegância e eficiência.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[16.66%] right-[16.66%] h-px bg-white/5 overflow-hidden">
            <div
              ref={lineRef}
              className="absolute inset-0 origin-left"
              style={{
                background: "linear-gradient(90deg, #7C3AED, #A855F7, #7C3AED)",
                boxShadow: "0 0 10px rgba(124,58,237,0.5)",
              }}
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="step-card relative group">
                {/* Number bubble */}
                <div className="flex justify-center mb-6 lg:mb-8">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-violet-700 flex items-center justify-center text-white font-black text-sm glow-purple group-hover:glow-purple-strong transition-all duration-300 relative z-10">
                      {step.number}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-purple-500/20 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100" />
                  </div>
                </div>

                {/* Card */}
                <div
                  className="glass border border-white/5 rounded-3xl p-7 text-center feature-card hover:border-purple-500/20 h-full"
                  style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.2)" }}
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                  <p className="text-xs text-purple-400 font-medium">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <a
            href="#pricing"
            className="btn-primary shine inline-flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-2xl text-base"
          >
            <span className="relative z-10">Começar agora — é grátis</span>
            <svg className="relative z-10 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
