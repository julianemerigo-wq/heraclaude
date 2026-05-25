"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50000, suffix: "+", label: "Eventos criados", icon: "🎉" },
  { value: 2, suffix: "M+", label: "Convidados gerenciados", icon: "👥" },
  { value: 98, suffix: "%", label: "Satisfação dos usuários", icon: "⭐" },
  { value: 40, suffix: "M+", label: "Fotos compartilhadas", icon: "📸" },
];

const testimonials = [
  {
    name: "Mariana Costa",
    role: "Noiva · Casamento em São Paulo",
    avatar: "https://i.pravatar.cc/150?img=47",
    text: "O HERA transformou completamente a organização do nosso casamento. O feed social em tempo real fez nossos convidados se sentirem parte de algo especial. Não consigo imaginar sem essa plataforma!",
    stars: 5,
    event: "Casamento",
  },
  {
    name: "Rafael Torres",
    role: "Formando · Medicina FMUSP",
    avatar: "https://i.pravatar.cc/150?img=32",
    text: "Organizamos a formatura de 300 pessoas com o HERA e foi impecável. A gestão financeira nos salvou de muitos problemas. A galeria de fotos foi o hit da turma!",
    stars: 5,
    event: "Formatura",
  },
  {
    name: "Isabela Mendes",
    role: "Cerimonialista · Rio de Janeiro",
    avatar: "https://i.pravatar.cc/150?img=5",
    text: "Como profissional de eventos, uso o HERA em absolutamente todos os meus projetos. A experiência dos clientes mudou completamente. Virei evangelista da plataforma.",
    stars: 5,
    event: "Profissional",
  },
  {
    name: "Carlos Rocha",
    role: "CEO · Eventos Corporativos",
    avatar: "https://i.pravatar.cc/150?img=15",
    text: "O módulo corporativo resolveu todos os nossos problemas de escala. White-label, API, SSO... tudo funcionando perfeitamente. Nossa produtividade aumentou 3x.",
    stars: 5,
    event: "Corporativo",
  },
  {
    name: "Fernanda Lima",
    role: "Mãe aniversariante · Belo Horizonte",
    avatar: "https://i.pravatar.cc/150?img=22",
    text: "Minha filha vai guardar essas memórias para sempre graças ao HERA. Os convites animados foram a primeira coisa que todo mundo comentou. Vale cada centavo!",
    stars: 5,
    event: "Aniversário",
  },
  {
    name: "Pedro Alves",
    role: "Formando · Direito USP",
    avatar: "https://i.pravatar.cc/150?img=60",
    text: "Simples assim: o HERA é o melhor investimento que fizemos para a nossa formatura. O suporte é impecável e a plataforma não cai nunca. Perfeito em tudo.",
    stars: 5,
    event: "Formatura",
  },
];

function AnimatedCounter({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = (now - startTime) / (duration * 1000);
            const progress = Math.min(1, elapsed);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: ".stats-row", start: "top 80%" },
        }
      );

      gsap.utils.toArray<HTMLElement>(".testimonial-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
            delay: (i % 3) * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines opacity-25" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/6 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Stats */}
        <div className="stats-row grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item glass border border-white/5 rounded-2xl p-6 text-center feature-card hover:border-purple-500/20"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl lg:text-4xl font-black text-white mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 glass border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-medium text-purple-300 uppercase tracking-wider">
              Depoimentos
            </span>
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Quem usa, <span className="gradient-text">se apaixona</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Mais de 50.000 eventos criados com amor e organização pelo HERA.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card glass border border-white/5 rounded-3xl p-6 feature-card hover:border-purple-500/15"
              style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.15)" }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <svg key={si} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-5">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover flex-shrink-0"
                  unoptimized
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-gray-500 truncate">{t.role}</p>
                </div>
                <span className="text-xs glass px-2 py-1 rounded-full text-purple-400 border border-purple-500/15">
                  {t.event}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
