"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "feed",
    badge: "01",
    title: "Feed Social\nem Tempo Real",
    description:
      "Seus convidados interagem como em uma rede social exclusiva do evento. Fotos, curtidas, mensagens e confirmações chegam instantaneamente.",
    cta: "Ver feed demo",
    visual: "feed",
    metrics: [
      { icon: "📸", label: "Fotos compartilhadas", value: "2,400+" },
      { icon: "💬", label: "Mensagens trocadas", value: "8,900+" },
    ],
    feedItems: [
      { avatar: "https://i.pravatar.cc/150?img=47", name: "Mariana C.", msg: "Que lugar incrível! 😍", time: "2s" },
      { avatar: "https://i.pravatar.cc/150?img=32", name: "Rafael T.", msg: "Mal posso esperar! 🎉", time: "45s" },
      { avatar: "https://i.pravatar.cc/150?img=5", name: "Isabela M.", msg: "Confirmada com toda a família!", time: "2m" },
      { avatar: "https://i.pravatar.cc/150?img=15", name: "Carlos R.", msg: "Lindos vocês dois! ❤️", time: "5m" },
    ],
  },
  {
    id: "finance",
    badge: "02",
    title: "Gestão Financeira\nInteligente",
    description:
      "Controle cada centavo do seu evento com relatórios em tempo real. Receitas, despesas e projeções em um painel elegante.",
    cta: "Explorar financeiro",
    visual: "finance",
    metrics: [
      { icon: "💰", label: "Volume gerenciado", value: "R$ 45M+" },
      { icon: "📊", label: "Eventos com lucro", value: "97%" },
    ],
    bars: [
      { label: "Jan", value: 65, color: "#7C3AED" },
      { label: "Fev", value: 80, color: "#8B5CF6" },
      { label: "Mar", value: 55, color: "#7C3AED" },
      { label: "Abr", value: 90, color: "#A855F7" },
      { label: "Mai", value: 75, color: "#8B5CF6" },
      { label: "Jun", value: 95, color: "#7C3AED" },
    ],
  },
  {
    id: "invites",
    badge: "03",
    title: "Convites Digitais\nque Impressionam",
    description:
      "Crie convites deslumbrantes com animações exclusivas. Personalize cada detalhe e encante seus convidados desde o primeiro clique.",
    cta: "Ver templates",
    visual: "invites",
    metrics: [
      { icon: "✉️", label: "Convites enviados", value: "1.2M+" },
      { icon: "👁️", label: "Taxa de abertura", value: "94%" },
    ],
  },
  {
    id: "gallery",
    badge: "04",
    title: "Galeria de Fotos\nColaborativa",
    description:
      "Todos os convidados contribuem para uma galeria viva e emocionante. Organize, exporte e preserve memórias para sempre.",
    cta: "Explorar galeria",
    visual: "gallery",
    metrics: [
      { icon: "🖼️", label: "Fotos armazenadas", value: "40M+" },
      { icon: "⬇️", label: "Downloads realizados", value: "8M+" },
    ],
    photos: [
      "https://i.pravatar.cc/150?img=47",
      "https://i.pravatar.cc/150?img=32",
      "https://i.pravatar.cc/150?img=5",
      "https://i.pravatar.cc/150?img=15",
      "https://i.pravatar.cc/150?img=22",
      "https://i.pravatar.cc/150?img=60",
    ],
  },
];

function FeedVisual({ items }: { items: typeof features[0]["feedItems"] }) {
  if (!items) return null;
  return (
    <div className="space-y-2.5">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-3 glass rounded-xl p-3 border border-white/5 feature-visual-item"
        >
          <Image
            src={item.avatar}
            alt={item.name}
            width={36}
            height={36}
            className="rounded-full flex-shrink-0 object-cover"
            unoptimized
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white font-medium">{item.name}</p>
            <p className="text-xs text-gray-400 truncate">{item.msg}</p>
          </div>
          <span className="text-xs text-gray-600">{item.time}</span>
        </div>
      ))}
    </div>
  );
}

function FinanceVisual({ bars }: { bars?: typeof features[1]["bars"] }) {
  if (!bars) return null;
  return (
    <div className="space-y-4">
      <div className="flex items-end gap-1.5 h-24">
        {bars.map((bar, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full rounded-t-lg transition-all duration-1000"
              style={{
                height: `${bar.value}%`,
                background: `linear-gradient(to top, ${bar.color}, ${bar.color}99)`,
                boxShadow: `0 0 8px ${bar.color}40`,
              }}
            />
            <span className="text-xs text-gray-600">{bar.label}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-xl p-3 border border-green-500/15">
          <p className="text-xs text-gray-500 mb-1">Receita total</p>
          <p className="text-lg font-bold text-green-400">R$ 48.900</p>
        </div>
        <div className="glass rounded-xl p-3 border border-red-500/15">
          <p className="text-xs text-gray-500 mb-1">Despesas</p>
          <p className="text-lg font-bold text-red-400">R$ 24.100</p>
        </div>
      </div>
    </div>
  );
}

function GalleryVisual({ photos }: { photos?: string[] }) {
  if (!photos) return null;
  return (
    <div className="grid grid-cols-3 gap-2">
      {photos.map((src, i) => (
        <div
          key={i}
          className="aspect-square rounded-xl overflow-hidden relative group"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          <Image
            src={src}
            alt={`Gallery photo ${i + 1}`}
            width={100}
            height={100}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}

function InviteVisual() {
  return (
    <div className="relative">
      <div
        className="glass rounded-2xl p-6 border border-purple-500/20 text-center"
        style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(99,102,241,0.08))" }}
      >
        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">💌</span>
        </div>
        <h4 className="text-white font-bold text-lg mb-1">Casamento Silva & Costa</h4>
        <p className="text-gray-400 text-sm mb-4">15 de Dezembro, 2024</p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-gray-400 text-sm">Quinta da Boa Vista</span>
        </div>
        <button className="w-full btn-primary text-white text-sm font-semibold py-2.5 rounded-xl">
          Confirmar presença 🎉
        </button>
      </div>
      <div className="absolute -top-3 -right-3 glass rounded-xl p-2 border border-yellow-500/20 text-xs text-yellow-400 font-medium">
        ✨ 94% abertos
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title reveal
      gsap.fromTo(
        ".features-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-title",
            start: "top 85%",
          },
        }
      );

      // Each feature card
      gsap.utils.toArray<HTMLElement>(".feature-row").forEach((row, i) => {
        const isEven = i % 2 === 1;
        gsap.fromTo(
          row.querySelector(".feature-text"),
          { x: isEven ? 40 : -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
            },
          }
        );

        gsap.fromTo(
          row.querySelector(".feature-visual"),
          { x: isEven ? -40 : 40, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
            },
          }
        );

        // Stagger feed items
        const items = row.querySelectorAll(".feature-visual-item");
        if (items.length) {
          gsap.fromTo(
            items,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: row,
                start: "top 75%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 lg:py-32"
    >
      <div className="absolute inset-0 grid-lines opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="features-title text-center mb-20">
          <span className="inline-flex items-center gap-2 glass border border-purple-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-medium text-purple-300 uppercase tracking-wider">
              Funcionalidades
            </span>
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
            Tudo que seu evento precisa,<br />
            <span className="gradient-text">em um só lugar</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cada recurso foi desenhado para criar momentos memoráveis e
            simplificar cada etapa da organização.
          </p>
        </div>

        {/* Feature rows */}
        <div className="space-y-24">
          {features.map((feature, i) => (
            <div
              key={feature.id}
              className={`feature-row grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                i % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Text side */}
              <div
                className={`feature-text ${i % 2 === 1 ? "lg:col-start-2" : ""}`}
              >
                <span className="text-6xl font-black text-white/5 leading-none block mb-4">
                  {feature.badge}
                </span>
                <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4 whitespace-pre-line">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Metrics */}
                <div className="flex gap-6 mb-8">
                  {feature.metrics.map((metric, mi) => (
                    <div
                      key={mi}
                      className="glass border border-white/5 rounded-2xl px-4 py-3"
                    >
                      <div className="text-xl mb-1">{metric.icon}</div>
                      <div className="text-xl font-bold text-white">
                        {metric.value}
                      </div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors group"
                >
                  {feature.cta}
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>

              {/* Visual side */}
              <div
                className={`feature-visual ${i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}
              >
                <div
                  className="glass-strong rounded-3xl p-6 border border-white/5 relative"
                  style={{
                    boxShadow:
                      "0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(124,58,237,0.08)",
                  }}
                >
                  {/* Feature-specific visual */}
                  {feature.visual === "feed" && (
                    <FeedVisual items={feature.feedItems!} />
                  )}
                  {feature.visual === "finance" && (
                    <FinanceVisual bars={feature.bars} />
                  )}
                  {feature.visual === "invites" && <InviteVisual />}
                  {feature.visual === "gallery" && (
                    <GalleryVisual photos={feature.photos} />
                  )}

                  {/* Glow effect */}
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
