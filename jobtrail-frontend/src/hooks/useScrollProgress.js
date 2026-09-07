import { useState, useEffect } from "react";

export function useScrollProgress(threshold = 20, backToTopThreshold = 400) {
  const [progress, setProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      setProgress(maxScroll > 0 ? Math.min(100, Math.max(0, (scrollY / maxScroll) * 100)) : 0);
      setIsScrolled(scrollY > threshold);
      setShowBackToTop(scrollY > backToTopThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, backToTopThreshold]);

  return { progress, isScrolled, showBackToTop };
}
