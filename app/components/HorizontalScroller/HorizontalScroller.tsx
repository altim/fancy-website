import Image from "next/image";
import styles from "./HorizontalScroller.module.scss";

export default function HorizontalScroller() {
  return (
    <div className={styles.root}>
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
    </div>
  );
}
