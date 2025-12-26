"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "../contexts/LenisContext";

export default function ScrollAnimatedElement() {
  const lenis = useLenis();
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (e: {
      scroll: number;
      limit: number;
      velocity: number;
      direction: number;
      progress: number;
    }) => {
      if (elementRef.current) {
        // Example: rotate based on scroll
        elementRef.current.style.transform = `rotate(${e.scroll * 0.1}deg)`;
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  return (
    <div
      ref={elementRef}
      style={{
        width: "100px",
        height: "100px",
        backgroundColor: "blue",
      }}
    >
      I rotate on scroll!
    </div>
  );
}
