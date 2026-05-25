import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import SocialProof from "@/components/SocialProof";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SpotlightCursor from "@/components/SpotlightCursor";
import AuroraBackground from "@/components/AuroraBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--bg-primary)" }}>
      <AuroraBackground />
      <SpotlightCursor />
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <SocialProof />
      <CTA />
      <Footer />
    </main>
  );
}
