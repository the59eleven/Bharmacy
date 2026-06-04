import { useCallback, useRef, useEffect } from "react";
import Lenis from "lenis";
import Hero from "./sections/Hero";
import Dashboard from "./sections/Dashboard";

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      wheelMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleEnterDashboard = useCallback(() => {
    const el = document.getElementById("dashboard");
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.2 });
    }
  }, []);

  return (
    <div className="bg-surface-deep min-h-screen">
      <Hero onEnterDashboard={handleEnterDashboard} />
      <Dashboard />
    </div>
  );
}
