import { useEffect, useRef } from "react";
import gsap from "gsap";
import VialScene from "../components/VialScene";
import WaveTube from "../components/WaveTube";

interface HeroProps {
  onEnterDashboard: () => void;
}

export default function Hero({ onEnterDashboard }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full overflow-hidden"
      style={{
        height: "100vh",
        minHeight: "600px",
        background:
          "radial-gradient(ellipse at center, #1a1008 0%, #040405 70%)",
      }}
    >
      <WaveTube />
      <VialScene />

      <div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6"
        style={{ pointerEvents: "none" }}
      >
        <div ref={labelRef} className="opacity-0 mb-6" style={{ pointerEvents: "auto" }}>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#d4a048]">
            Research Peptide Vendors
          </span>
        </div>

        <h1
          ref={titleRef}
          className="opacity-0 font-geist font-light text-7xl md:text-8xl lg:text-[96px] tracking-[-0.03em] text-[#e8e8e6] mb-6"
          style={{ textShadow: "0 0 80px rgba(212,160,72,0.15)" }}
        >
          Bharmacy
        </h1>

        <p
          ref={descRef}
          className="opacity-0 text-center text-[#8a8a88] text-sm md:text-base max-w-md leading-relaxed mb-10"
        >
          Precision inventory tracking for peptide supply chains.
          <br />
          Monitor margins, manage orders, maintain stock.
        </p>

        <button
          ref={ctaRef}
          onClick={onEnterDashboard}
          className="opacity-0 font-mono text-xs uppercase tracking-[0.1em] px-8 py-3 border border-[#d4a048] text-[#d4a048] rounded-full transition-all duration-300 hover:bg-[#d4a048] hover:text-[#040405]"
          style={{ pointerEvents: "auto" }}
        >
          Enter Dashboard
        </button>
      </div>
    </section>
  );
}
