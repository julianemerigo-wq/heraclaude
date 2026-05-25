"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const feedEvents = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?img=47",
    name: "Mariana Costa",
    action: "confirmou presença",
    event: "Casamento Silva & Costa",
    time: "agora mesmo",
    type: "rsvp",
    emoji: "🥂",
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?img=32",
    name: "Rafael Torres",
    action: "compartilhou uma foto",
    event: "Formatura Medicina 2024",
    time: "2 min atrás",
    type: "photo",
    emoji: "📸",
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/150?img=5",
    name: "Isabela Mendes",
    action: "curtiu sua mensagem",
    event: "Aniversário 30 anos",
    time: "5 min atrás",
    type: "like",
    emoji: "❤️",
  },
  {
    id: 4,
    avatar: "https://i.pravatar.cc/150?img=15",
    name: "Carlos Rocha",
    action: "confirmou presença",
    event: "Casamento Silva & Costa",
    time: "8 min atrás",
    type: "rsvp",
    emoji: "✅",
  },
  {
    id: 5,
    avatar: "https://i.pravatar.cc/150?img=22",
    name: "Fernanda Lima",
    action: "adicionou ao álbum",
    event: "Casamento Silva & Costa",
    time: "12 min atrás",
    type: "photo",
    emoji: "🖼️",
  },
  {
    id: 6,
    avatar: "https://i.pravatar.cc/150?img=60",
    name: "Pedro Alves",
    action: "confirmou presença",
    event: "Formatura Medicina 2024",
    time: "15 min atrás",
    type: "rsvp",
    emoji: "🎓",
  },
];

const stats = [
  { value: "98%", label: "Satisfação" },
  { value: "50K+", label: "Eventos" },
  { value: "2M+", label: "Convidados" },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const floatingCard1Ref = useRef<HTMLDivElement>(null);
  const floatingCard2Ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleFeed, setVisibleFeed] = useState(feedEvents.slice(0, 4));

  // Hero entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const words = headlineRef.current?.querySelectorAll(".word-animate");

    tl.fromTo(
      words || [],
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.08, duration: 0.7 },
      0.3
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.3"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.4"
      )
      .fromTo(
        statsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.3"
      )
      .fromTo(
        mockupRef.current,
        { x: 60, opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
        0.5
      );

    // Floating cards
    if (floatingCard1Ref.current) {
      gsap.fromTo(
        floatingCard1Ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 1.2, ease: "power2.out" }
      );
    }
    if (floatingCard2Ref.current) {
      gsap.fromTo(
        floatingCard2Ref.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 1.5, ease: "power2.out" }
      );
    }
  }, []);

  // Mouse parallax on hero
  useEffect(() => {
    const hero = heroRef.current;
    const mockup = mockupRef.current;
    if (!hero || !mockup) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (e.clientX - rect.left - cx) / cx;
      const dy = (e.clientY - rect.top - cy) / cy;

      gsap.to(mockup, {
        rotateY: dx * 4,
        rotateX: -dy * 3,
        duration: 0.8,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      if (floatingCard1Ref.current) {
        gsap.to(floatingCard1Ref.current, {
          x: dx * 10,
          y: dy * 8,
          duration: 1,
          ease: "power2.out",
        });
      }
      if (floatingCard2Ref.current) {
        gsap.to(floatingCard2Ref.current, {
          x: -dx * 12,
          y: -dy * 6,
          duration: 1,
          ease: "power2.out",
        });
      }
    };

    hero.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => hero.removeEventListener("mousemove", onMouseMove);
  }, []);

  // Rotating feed items
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleFeed((prev) => {
        const next = [...prev];
        const newIdx = (feedEvents.findIndex((f) => f.id === prev[0].id) + 4) % feedEvents.length;
        next.unshift(feedEvents[newIdx]);
        next.pop();
        return next;
      });
      setActiveIndex((i) => (i + 1) % feedEvents.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden aurora pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/4 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass border border-purple-500/20 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse-dot" />
              <span className="text-xs font-medium text-purple-300">
                Plataforma #1 para eventos premium
              </span>
            </div>

            {/* Headline */}
            <div ref={headlineRef} className="mb-6">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.05] tracking-tight text-white">
                <span className="word-animate block">Seus eventos,</span>
                <span className="word-animate block gradient-text">
                  reinventados.
                </span>
                <span className="word-animate block text-gray-200">
                  Para sempre.
                </span>
              </h1>
            </div>

            <p
              ref={subtitleRef}
              className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-10 max-w-lg"
            >
              Do RSVP à galeria de fotos, do financeiro ao feed social — tudo
              em uma experiência elegante e inesquecível para você e seus
              convidados.
            </p>

            {/* CTAs */}
            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
              <a
                href="#pricing"
                className="btn-primary shine relative inline-flex items-center gap-2.5 text-white font-semibold px-7 py-4 rounded-2xl text-base group"
              >
                <span className="relative z-10">Criar meu evento</span>
                <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#features"
                className="btn-secondary inline-flex items-center gap-2.5 text-gray-300 font-medium px-7 py-4 rounded-2xl text-base group"
              >
                <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Ver demo
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Mockup */}
          <div ref={mockupRef} className="relative lg:pl-6">
            {/* Main dashboard card */}
            <div
              className="relative glass-strong rounded-3xl overflow-hidden"
              style={{
                boxShadow: "0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Dashboard header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400/70" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
                    <div className="w-3 h-3 rounded-full bg-green-400/70" />
                  </div>
                  <div className="glass rounded-lg px-3 py-1">
                    <span className="text-xs text-gray-500">hera.app/casamento-silva-costa</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
                  <span className="text-xs text-green-400 font-medium">Ao vivo</span>
                </div>
              </div>

              {/* Event banner */}
              <div className="relative h-28 bg-gradient-to-br from-purple-900/60 via-violet-800/40 to-indigo-900/60 overflow-hidden flex items-end p-4">
                <div className="absolute inset-0 dots-pattern opacity-30" />
                <div className="absolute top-3 right-3">
                  <span className="glass text-xs text-purple-300 px-2 py-1 rounded-full border border-purple-500/20">
                    🎉 Casamento
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    Casamento Silva & Costa
                  </h3>
                  <p className="text-purple-300 text-xs mt-0.5">15 de Dezembro, 2024 · Quinta da Boa Vista</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-0 border-b border-white/5">
                {[
                  { label: "Convidados", value: "148", color: "text-purple-400" },
                  { label: "Confirmados", value: "112", color: "text-green-400" },
                  { label: "Pendentes", value: "36", color: "text-yellow-400" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`p-3 text-center ${i < 2 ? "border-r border-white/5" : ""}`}
                  >
                    <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Live feed */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Feed ao vivo
                  </span>
                  <span className="text-xs text-purple-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse-dot inline-block" />
                    Atualizando...
                  </span>
                </div>

                <div className="space-y-2.5 overflow-hidden" style={{ height: "168px" }}>
                  {visibleFeed.map((item, i) => (
                    <div
                      key={`${item.id}-${i}`}
                      className="flex items-center gap-3 glass rounded-xl p-2.5 border border-white/5"
                      style={{
                        animation: i === 0 ? "slide-in-right 0.4s ease forwards" : undefined,
                      }}
                    >
                      <Image
                        src={item.avatar}
                        alt={item.name}
                        width={32}
                        height={32}
                        className="rounded-full flex-shrink-0 object-cover"
                        unoptimized
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-medium truncate">
                          <span className="text-purple-300">{item.name}</span>
                          {" "}{item.action}
                        </p>
                        <p className="text-xs text-gray-600 truncate">{item.time}</p>
                      </div>
                      <span className="text-base flex-shrink-0">{item.emoji}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom progress */}
              <div className="px-4 pb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Confirmações</span>
                  <span className="text-purple-400 font-medium">75%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 to-violet-500"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
            </div>

            {/* Floating card 1 — RSVP notification */}
            <div
              ref={floatingCard1Ref}
              className="absolute -top-6 -left-8 glass-strong rounded-2xl p-3.5 border border-purple-500/20 animate-float z-20"
              style={{ boxShadow: "0 8px 32px rgba(124,58,237,0.2)" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Nova confirmação! 🎉</p>
                  <p className="text-xs text-gray-400">Mariana Costa · agora</p>
                </div>
              </div>
            </div>

            {/* Floating card 2 — Revenue */}
            <div
              ref={floatingCard2Ref}
              className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-3.5 border border-green-500/20 animate-float-delay z-20"
              style={{ boxShadow: "0 8px 32px rgba(34,197,94,0.1)" }}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Receita confirmada</p>
                  <p className="text-sm font-bold text-green-400">R$ 24.800</p>
                </div>
              </div>
            </div>

            {/* Glow behind mockup */}
            <div className="absolute inset-0 -z-10 blur-3xl scale-75 opacity-30 bg-purple-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-gray-500 uppercase tracking-wider">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-500 to-transparent animate-bounce-subtle" />
      </div>
    </section>
  );
}
