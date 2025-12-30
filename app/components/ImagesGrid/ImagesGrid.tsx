import Image from "next/image";
import styles from "./ImagesGrid.module.scss";
import { useEffect, useRef } from "react";
import { useLenis } from "@/app/contexts/LenisContext";
import * as THREE from "three";

interface ImagesGridProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

const remapProgress = (progress: number, start: number, end: number) => {
  return Math.max(0, Math.min(1, (progress - start) / (end - start)));
};

export default function ImagesGrid({ wrapperRef }: ImagesGridProps) {
  const lenis = useLenis();
  const image1 = useRef<HTMLImageElement>(null);
  const image2 = useRef<HTMLImageElement>(null);
  const image3 = useRef<HTMLImageElement>(null);
  const image4 = useRef<HTMLImageElement>(null);
  const image5 = useRef<HTMLImageElement>(null);
  const image6 = useRef<HTMLImageElement>(null);

  const imageAnimation = [
    {
      imageRef: image1,
      startX: -1000,
      startY: -800,
      animationStart: 0,
      animationEnd: 0.5,
    },
    {
      imageRef: image2,
      startX: 100,
      startY: -1200,
      animationStart: 0,
      animationEnd: 0.7,
    },
    {
      imageRef: image3,
      startX: 500,
      startY: -1800,
      animationStart: 0,
      animationEnd: 0.55,
    },
    {
      imageRef: image4,
      startX: -800,
      startY: 1800,
      animationStart: 0,
      animationEnd: 0.45,
    },
    {
      imageRef: image5,
      startX: 300,
      startY: 1200,
      animationStart: 0,
      animationEnd: 0.65,
    },
    {
      imageRef: image6,
      startX: 2000,
      startY: 800,
      animationStart: 0,
      animationEnd: 0.6,
    },
  ];

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

      imageAnimation.forEach((animation) => {
        const imageProgress = remapProgress(
          progress,
          animation.animationStart,
          animation.animationEnd
        );
        const imageX = THREE.MathUtils.lerp(
          animation.startX,
          0,
          Math.pow(imageProgress, 2)
        );
        const imageY = THREE.MathUtils.lerp(
          animation.startY,
          0,
          Math.pow(imageProgress, 2)
        );
        const imageScale = THREE.MathUtils.lerp(2, 1, imageProgress);

        const animatingImage = animation.imageRef.current;

        if (!animatingImage) return;
        animatingImage.style.transform = `translate(${imageX}px, ${imageY}px)`;
        animatingImage.style.scale = `${imageScale}`;
        animatingImage.style.opacity = `${imageProgress}`;
      });
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [imageAnimation, lenis, wrapperRef]);

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <h3 className={styles.title}>Applications</h3>
        <div className={styles.imgWrapper}>
          <Image
            src="/applications/1.jpg"
            alt="1"
            width="815"
            height="460"
            ref={image1}
          />
        </div>
        <div className={styles.imgWrapper}>
          <Image
            src="/applications/2.jpg"
            alt="2"
            width="815"
            height="460"
            ref={image2}
          />
        </div>

        <div className={styles.imgWrapper}>
          <Image
            src="/applications/3.jpg"
            alt="3"
            width="815"
            height="460"
            ref={image3}
          />
        </div>
        <div className={styles.imgWrapper}>
          <Image
            src="/applications/4.jpg"
            alt="4"
            width="815"
            height="460"
            ref={image4}
          />
        </div>
        <div className={styles.imgWrapper}>
          <Image
            src="/applications/5.jpg"
            alt="5"
            width="815"
            height="460"
            ref={image5}
          />
        </div>
        <div className={styles.imgWrapper}>
          <Image
            src="/applications/6.jpg"
            alt="6"
            width="815"
            height="460"
            ref={image6}
          />
        </div>
      </div>
    </div>
  );
}
