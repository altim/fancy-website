import { LogoIcon } from "@/app/components/icons/LogoIcon";
import styles from "./Navigation.module.scss";

export default function Navigation() {
  return (
    <div className={styles.root}>
      <div>
        <a href="#firetrace">
          <LogoIcon width="140" />
        </a>
      </div>
      <div className={styles.menu}>
        <a href="#how-it-works">How It Works</a>
        <a href="#applications">Applications</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  );
}
