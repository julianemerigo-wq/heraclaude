"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AuroraBackground() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (orb1Ref.current) {
      gsap.to(orb1Ref.current, {
        x: "random(-80, 80)",
        y: "random(-50, 50)",
        duration: "random(12, 18)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
    if (orb2Ref.current) {
      gsap.to(orb2Ref.current, {
        x: "random(-60, 60)",
        y: "random(-80, 30)",
        duration: "random(15, 22)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 3,
      });
    }
    if (orb3Ref.current) {
      gsap.to(orb3Ref.current, {
        x: "random(-40, 80)",
        y: "random(-60, 60)",
        duration: "random(18, 25)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 6,
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        ref={orb1Ref}
        className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute top-[50%] right-[10%] w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute bottom-[15%] left-[30%] w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
