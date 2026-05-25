"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: "Gratuito",
    price: { monthly: "R$ 0", yearly: "R$ 0" },
    period: "para sempre",
    description: "Para quem está começando a organizar eventos",
    featured: false,
    cta: "Começar grátis",
    ctaStyle: "secondary",
    features: [
      { text: "1 evento ativo", included: true },
      { text: "Até 50 convidados", included: true },
      { text: "Feed social básico", included: true },
      { text: "Convite digital simples", included: true },
      { text: "Galeria limitada (100 fotos)", included: true },
      { text: "Gestão financeira", included: false },
      { text: "Domínio personalizado", included: false },
      { text: "Analytics avançado", included: false },
      { text: "Suporte prioritário", included: false },
    ],
  },
  {
    name: "Premium",
    price: { monthly: "R$ 89", yearly: "R$ 59" },
    period: "por evento",
    description: "Para eventos memoráveis sem limites",
    featured: true,
    badge: "Mais popular",
    cta: "Criar evento premium",
    ctaStyle: "primary",
    savings: "Economize R$ 360/ano",
    features: [
      { text: "Eventos ilimitados", included: true },
      { text: "Convidados ilimitados", included: true },
      { text: "Feed social completo", included: true },
      { text: "Convites premium animados", included: true },
      { text: "Galeria ilimitada + exportação HD", included: true },
      { text: "Gestão financeira completa", included: true },
      { text: "Domínio personalizado", included: true },
      { text: "Analytics avançado", included: true },
      { text: "Suporte prioritário 24/7", included: true },
    ],
  },
  {
    name: "Corporativo",
    price: { monthly: "Sob consulta", yearly: "Sob consulta" },
    period: "personalizado",
    description: "Para empresas e grandes cerimônias",
    featured: false,
    cta: "Falar com consultor",
    ctaStyle: "secondary",
    features: [
      { text: "Tudo do Premium", included: true },
      { text: "White-label completo", included: true },
      { text: "API dedicada", included: true },
      { text: "SSO corporativo", included: true },
      { text: "SLA garantido", included: true },
      { text: "Onboarding dedicado", included: true },
      { text: "Manager exclusivo", included: true },
      { text: "Relatórios customizados", included: true },
      { text: "Integrações personalizadas", included: true },
    ],
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-title",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ".pricing-title", start: "top 85%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".pricing-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.97 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: ".pricing-grid", start: "top 80%" },
            delay: i * 0.12,
          }
        );
      });

      // Glow pulse on featured
      if (featuredRef.current) {
        gsap.to(featuredRef.current, {
          boxShadow: "0 0 60px rgba(124,58,237,0.4), 0 0 120px rgba(124,58,237,0.15), 0 0 0 1px rgba(124,58,237,0.5)",
          repeat: -1,
          yoyo: true,
          duration: 2.5,
          ease: "power2.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/8 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="pricing-title text-center mb-12">
          <span className="inline-flex items-center gap-2 glass border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-medium text-purple-300 uppercase tracking-wider">
              Planos e preços
            </span>
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Invista no evento dos seus sonhos.<br />
            <span className="gradient-text">Sem surpresas.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Preços transparentes, cancelamento a qualquer momento.
            Comece grátis e upgrade quando quiser.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 glass border border-white/8 rounded-full p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                !yearly
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                yearly
                  ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Anual
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full border border-green-500/20">
                -34%
              </span>
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="pricing-grid grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              ref={plan.featured ? featuredRef : undefined}
              className={`pricing-card rounded-3xl p-7 relative overflow-hidden ${
                plan.featured
                  ? "pricing-featured lg:-mt-4 lg:mb-4"
                  : "glass border border-white/5"
              }`}
            >
              {/* Featured badge */}
              {plan.badge && (
                <div className="absolute top-5 right-5">
                  <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Shimmer on featured */}
              {plan.featured && (
                <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              )}

              {/* Plan info */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>

                <div className="flex items-end gap-2 mb-1">
                  <span
                    className={`text-4xl font-black ${
                      plan.featured ? "text-white text-glow" : "text-white"
                    }`}
                  >
                    {yearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className="text-gray-500 text-sm mb-1">{plan.period}</span>
                </div>

                {yearly && plan.savings && (
                  <p className="text-xs text-green-400 font-medium">{plan.savings}</p>
                )}
              </div>

              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        f.included
                          ? "bg-purple-500/20"
                          : "bg-white/5"
                      }`}
                    >
                      {f.included ? (
                        <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-3 h-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        f.included ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className={`block text-center font-semibold py-3.5 rounded-xl text-sm transition-all duration-300 relative ${
                  plan.ctaStyle === "primary"
                    ? "btn-primary shine text-white"
                    : "btn-secondary text-gray-300 hover:text-white"
                }`}
              >
                <span className="relative z-10">{plan.cta}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-gray-600 mt-8">
          Sem cartão de crédito necessário · Cancele quando quiser · Suporte em português
        </p>
      </div>
    </section>
  );
}
