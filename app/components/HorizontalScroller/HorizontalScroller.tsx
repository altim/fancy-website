"use client";

import Image from "next/image";
import styles from "./HorizontalScroller.module.scss";
import { useEffect, useRef } from "react";
import { useLenis } from "@/app/contexts/LenisContext";

interface HorizontalScrollerProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export default function HorizontalScroller({
  wrapperRef,
}: HorizontalScrollerProps) {
  const lenis = useLenis();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lenis || !wrapperRef?.current) return;

    const handleScroll = (e: { scroll: number }) => {
      const windowHeight = window.innerHeight;
      const wrapperStart = wrapperRef.current!.offsetTop;
      const wrapperHeight = wrapperRef.current!.offsetHeight;

      // Start when wrapper top hits viewport top, end when wrapper bottom hits viewport bottom
      const scrollStart = wrapperStart;
      const scrollEnd = wrapperStart + wrapperHeight - windowHeight;

      const progress = Math.max(
        0,
        Math.min(1, (e.scroll - scrollStart) / (scrollEnd - scrollStart))
      );

      // Apply horizontal scroll transform
      if (!scrollerRef.current) return;

      const scrollerWidth = scrollerRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxScroll = scrollerWidth - viewportWidth;

      scrollerRef.current.style.transform = `translateX(-${
        progress * maxScroll
      }px)`;
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, wrapperRef]);

  return (
    <div className={styles.root} ref={scrollerRef}>
      <div className={styles.slide}>
        <div className={styles.slideContent}>
          <div className={styles.imageWrapper}>
            <Image src="/how-it-works/detect.jpg" alt="detect" fill />
          </div>
          <div>
            <h3>Detect</h3>
            <p>
              Firetrace systems do not require electronic fire detectors.
              Instead, the system detects fires using specially designed tubing.
              The tubing is made of a flexible polymer that can be installed
              anywhere a fire might start. Firetrace tubing can detect both heat
              and flames. When it detects either, then it bursts open,
              activating the system.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.slide}>
        <div className={styles.slideContent}>
          <div className={styles.imageWrapper}>
            <Image src="/how-it-works/activate.jpg" alt="activate" fill />
          </div>
          <div>
            <h3>Activate</h3>
            <p>
              When the detection tubing bursts, there is a pressure change in
              the system. This activates a valve, which releases gas or powder
              stored in the cylinder. Unlike fire extinguishers, Firetrace
              systems do not require manual operation. However, systems can be
              manually operated by pushing a button called the manual release.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.slide}>
        <div className={styles.slideContent}>
          <div className={styles.imageWrapper}>
            <Image src="/how-it-works/suppress.jpg" alt="suppress" fill />
          </div>
          <div>
            <h3>Suppress</h3>
            <p>
              Firetrace systems contain specialized gas or powder, designed for
              putting out fires. These are called suppression agents.
              Suppression agents put out fires by eliminating heat or oxygen or
              by disrupting chemical reactions. When the system activates, the
              agent travels from the cylinder to the protected space, either
              directly through the detection tube or through connected hoses and
              nozzles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
