"use client";

import { useEffect, useRef } from "react";
import classNames from "classnames";
import { useLenis } from "../contexts/LenisContext";
import styles from "./home.module.scss";
import FireExtinguisherScene from "../components/FireExtinguisherScene/FireExtinguisherScene";

export default function Home() {
  const lenis = useLenis();
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const wrapper2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lenis) return;

    const handleScroll = (e: { scroll: number }) => {
      if (!h1Ref.current || !wrapper2Ref.current) return;

      const windowHeight = window.innerHeight;
      const wrapper2Start = wrapper2Ref.current.offsetTop;
      const wrapper2Height = wrapper2Ref.current.offsetHeight;

      // Start when wrapper top hits viewport top, end when wrapper bottom hits viewport bottom
      const scrollStart = wrapper2Start;
      const scrollEnd = wrapper2Start + wrapper2Height - windowHeight;
      const progressPx = Math.min(
        scrollEnd - scrollStart,
        Math.max(0, e.scroll - scrollStart)
      );
      const progress = Math.max(
        0,
        Math.min(1, (e.scroll - scrollStart) / (scrollEnd - scrollStart))
      );

      // Animate h1 based on progress
      h1Ref.current.style.transform = `scale(${
        0.5 + progress * 0.5
      }) translateX(${progress * 1000}px)`;
      h1Ref.current.style.opacity = `${progress}`;
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  return (
    <div>
      <div className={styles.wrapper1}>
        <div className={classNames(styles.section, styles.section1)}>
          <FireExtinguisherScene />
        </div>
      </div>

      <div className={styles.wrapper2} ref={wrapper2Ref}>
        <div className={classNames(styles.section, styles.section2)}>
          <h1 ref={h1Ref}>Second page</h1>
        </div>
      </div>

      <div className={styles.wrapper3}>
        <div className={classNames(styles.section, styles.section3)}>
          <h1>Third page</h1>
        </div>
      </div>
    </div>
  );
}
