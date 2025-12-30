"use client";

import classNames from "classnames";
import { useRef } from "react";
import FireExtinguisherScene from "../components/FireExtinguisherScene/FireExtinguisherScene";
import styles from "./home.module.scss";
import Navigation from "../components/FireExtinguisherScene/components/Navigation/Navigation";
import HorizontalScroller from "../components/HorizontalScroller/HorizontalScroller";
import ImagesGrid from "../components/ImagesGrid/ImagesGrid";

export default function Home() {
  const wrapper1Ref = useRef<HTMLDivElement>(null);
  const wrapper2Ref = useRef<HTMLDivElement>(null);
  const wrapper3Ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <Navigation />

      <div className={styles.wrapper1} ref={wrapper1Ref} id="firetrace">
        <div className={classNames(styles.content, styles.content1)}>
          <div className={styles.contentInner}>
            <div className={styles.text1}>
              <h1>
                Fire protection that
                <br />
                won't let you down
              </h1>
            </div>
          </div>
        </div>

        <div className={classNames(styles.content, styles.content2)}>
          <div
            className={classNames(styles.contentInner, styles.content2Inner)}
          >
            <div className={styles.text2}>
              <p>
                Firetrace fire suppression systems keep your business, people
                and equipment safe by automatically detecting and suppressing
                fires in high-risk equipment, like CNC machines, vehicles, heavy
                equipment, electrical cabinets, and wind turbines.
              </p>
            </div>
          </div>
        </div>

        <div className={classNames(styles.content, styles.content3)}>
          <div
            className={classNames(styles.contentInner, styles.content3Inner)}
          >
            <div className={styles.text3}>
              <h3>Detect</h3>
              <p>
                Firetrace detects fires at the source using proprietary heat and
                flame detection tubing.
              </p>
              <h3>Activate</h3>
              <p>
                The Firetrace system activates automatically, providing
                protection even when no one is around.
              </p>
              <h3>Suppress</h3>
              <p>
                Firetrace systems suppress fires in seconds using clean agents
                that are safe for people, equipment, and the environment.
              </p>
            </div>
          </div>
        </div>

        <div className={classNames(styles.section, styles.section1)}>
          <FireExtinguisherScene wrapperRef={wrapper1Ref} />
        </div>
      </div>

      <div className={styles.wrapper2} id="how-it-works" ref={wrapper2Ref}>
        <div className={classNames(styles.section, styles.section2)}>
          <HorizontalScroller wrapperRef={wrapper2Ref} />
        </div>
      </div>

      <div className={styles.wrapper3} id="applications" ref={wrapper3Ref}>
        <div className={classNames(styles.section, styles.section3)}>
          <ImagesGrid wrapperRef={wrapper3Ref} />
        </div>
      </div>

      <div className={styles.wrapper4} id="contact">
        <div className={classNames(styles.section, styles.section4)}>
          <h1>Third page</h1>
        </div>
      </div>
    </div>
  );
}
