"use client";

import classNames from "classnames";
import { useRef } from "react";
import FireExtinguisherScene from "../components/FireExtinguisherScene/FireExtinguisherScene";
import styles from "./home.module.scss";

export default function Home() {
  const wrapper1Ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div className={styles.wrapper1} ref={wrapper1Ref}>
        <div className={styles.text1}>
          <h1>
            Fire protection that
            <br />
            won’t let you down
          </h1>
        </div>

        <div className={styles.text2}>
          <p>
            Firetrace fire suppression systems keep your business, people and
            equipment safe by automatically detecting and suppressing fires in
            high-risk equipment, like CNC machines, vehicles, heavy equipment,
            electrical cabinets, and wind turbines.
          </p>
        </div>

        <div className={styles.text3}>
          <h3>Detect</h3>
          <p>
            Firetrace detects fires at the source using proprietary heat and
            flame detection tubing.
          </p>
          <h3>Activate</h3>
          <p>
            The Firetrace system activates automatically, providing protection
            even when no one is around.
          </p>
          <h3>Suppress</h3>
          <p>
            Firetrace systems suppress fires in seconds using clean agents that
            are safe for people, equipment, and the environment.
          </p>
        </div>

        <div className={classNames(styles.section, styles.section1)}>
          <FireExtinguisherScene wrapperRef={wrapper1Ref} />
        </div>
      </div>

      <div className={styles.wrapper2}>
        <div className={classNames(styles.section, styles.section2)}>
          <h1>Second page</h1>
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
