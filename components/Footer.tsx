"use client";

const footerLinks = {
  Produto: ["Recursos", "Preços", "Changelog", "Roadmap"],
  Empresa: ["Sobre nós", "Blog", "Carreiras", "Imprensa"],
  Suporte: ["Central de ajuda", "Documentação", "Status", "Contato"],
  Legal: ["Privacidade", "Termos de uso", "Cookies", "LGPD"],
};

const socials = [
  { name: "Instagram", href: "#", icon: "📷" },
  { name: "Twitter", href: "#", icon: "🐦" },
  { name: "LinkedIn", href: "#", icon: "💼" },
  { name: "YouTube", href: "#", icon: "▶️" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8">
      <div className="absolute inset-0 grid-lines opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-violet-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">H</span>
              </div>
              <span className="font-bold text-xl text-white tracking-tight">HERA</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              A plataforma mais elegante para organizar eventos inesquecíveis.
              Do RSVP à galeria, tudo em um só lugar.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  className="w-9 h-9 glass border border-white/5 rounded-xl flex items-center justify-center text-sm hover:border-purple-500/30 transition-colors duration-200"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} HERA. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
            Todos os sistemas operacionais
          </div>
          <p className="text-xs text-gray-600">
            Feito com ❤️ no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
