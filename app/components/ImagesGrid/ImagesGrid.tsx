import Image from "next/image";
import styles from "./ImagesGrid.module.scss";
import { useEffect } from "react";
import { useLenis } from "@/app/contexts/LenisContext";

interface ImagesGridProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export default function ImagesGrid({ wrapperRef }: ImagesGridProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis || !wrapperRef?.current) return;

    const handleScroll = (e: { scroll: number }) => {
      const windowHeight = window.innerHeight;
      const wrapperStart = wrapperRef.current!.offsetTop;
      const wrapperHeight = wrapperRef.current!.offsetHeight;

      const scrollStart = wrapperStart;
      const scrollEnd = wrapperStart + wrapperHeight - windowHeight;

      const progress = Math.max(
        0,
        Math.min(1, (e.scroll - scrollStart) / (scrollEnd - scrollStart))
      );

      //   // Apply horizontal scroll transform
      //   if (!scrollerRef.current) return;

      //   const scrollerWidth = scrollerRef.current.scrollWidth;
      //   const viewportWidth = window.innerWidth;
      //   const maxScroll = scrollerWidth - viewportWidth;

      //   scrollerRef.current.style.transform = `translateX(-${
      //     progress * maxScroll
      //   }px)`;
    };

    lenis.on("scroll", handleScroll);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis, wrapperRef]);

  return (
    <div className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.imgWrapper}>
          <Image src="/applications/1.jpg" alt="1" width="815" height="460" />
        </div>
        <div className={styles.imgWrapper}>
          <Image src="/applications/2.jpg" alt="2" width="815" height="460" />
        </div>

        <div className={styles.imgWrapper}>
          <Image src="/applications/3.jpg" alt="3" width="815" height="460" />
        </div>
        <div className={styles.imgWrapper}>
          <Image src="/applications/4.jpg" alt="4" width="815" height="460" />
        </div>
        <div className={styles.imgWrapper}>
          <Image src="/applications/5.jpg" alt="5" width="815" height="460" />
        </div>
        <div className={styles.imgWrapper}>
          <Image src="/applications/6.jpg" alt="6" width="815" height="460" />
        </div>
      </div>
    </div>
  );
}
