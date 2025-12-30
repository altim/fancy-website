import Image from "next/image";
import styles from "./ImagesGrid.module.scss";
import { useEffect, useMemo } from "react";
import { useLenis } from "@/app/contexts/LenisContext";
import { useSprings, animated, config } from "@react-spring/web";

interface ImagesGridProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

const remapProgress = (progress: number, start: number, end: number) => {
  return Math.max(0, Math.min(1, (progress - start) / (end - start)));
};

const lerp = (start: number, end: number, t: number) => {
  return start + (end - start) * t;
};

export default function ImagesGrid({ wrapperRef }: ImagesGridProps) {
  const lenis = useLenis();

  const imageConfigs = useMemo(
    () => [
      {
        startX: -1000,
        startY: -800,
        animationStart: 0.1,
        animationEnd: 0.5,
      },
      {
        startX: 100,
        startY: -1200,
        animationStart: 0,
        animationEnd: 0.7,
      },
      {
        startX: 500,
        startY: -1800,
        animationStart: 0,
        animationEnd: 0.55,
      },
      {
        startX: -800,
        startY: 1800,
        animationStart: 0,
        animationEnd: 0.45,
      },
      {
        startX: 300,
        startY: 1200,
        animationStart: 0,
        animationEnd: 0.65,
      },
      {
        startX: 2000,
        startY: 800,
        animationStart: 0,
        animationEnd: 0.6,
      },
    ],
    []
  );

  const [springs, api] = useSprings(imageConfigs.length, (index) => ({
    x: imageConfigs[index].startX,
    y: imageConfigs[index].startY,
    scale: 2,
    opacity: 0,
    config: config.slow,
  }));

  useEffect(() => {
    if (!lenis || !wrapperRef?.current) return;

    const handleScroll = (e: { scroll: number }) => {
      const windowHeight = window.innerHeight;
      const wrapperStart = wrapperRef.current!.offsetTop;
      const wrapperHeight = wrapperRef.current!.offsetHeight;

      const scrollStart = wrapperStart - windowHeight;
      const scrollEnd = wrapperStart + wrapperHeight - windowHeight;

      const progress = Math.max(
        0,
        Math.min(1, (e.scroll - scrollStart) / (scrollEnd - scrollStart))
      );

      api.start((index) => {
        const imageConfig = imageConfigs[index];
        const imageProgress = remapProgress(
          progress,
          imageConfig.animationStart,
          imageConfig.animationEnd
        );
        const easedProgress = Math.pow(imageProgress, 2);

        return {
          x: lerp(imageConfig.startX, 0, easedProgress),
          y: lerp(imageConfig.startY, 0, easedProgress),
          scale: lerp(0.01, 1, imageProgress),
          opacity: easedProgress,
          config: config.gentle, // Creates springy overshoot effect
        };
      });
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [imageConfigs, lenis, wrapperRef, api]);

  const images = [
    { src: "/applications/1.jpg", alt: "1" },
    { src: "/applications/2.jpg", alt: "2" },
    { src: "/applications/3.jpg", alt: "3" },
    { src: "/applications/4.jpg", alt: "4" },
    { src: "/applications/5.jpg", alt: "5" },
    { src: "/applications/6.jpg", alt: "6" },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <h3 className={styles.title}>Applications</h3>
        {springs.map((spring, index) => (
          <animated.div
            key={index}
            className={styles.imgWrapper}
            style={{
              x: spring.x,
              y: spring.y,
              scale: spring.scale,
              opacity: spring.opacity,
            }}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              width="815"
              height="460"
            />
          </animated.div>
        ))}
      </div>
    </div>
  );
}
