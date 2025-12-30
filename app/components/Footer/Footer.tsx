import styles from "./Footer.module.scss";

interface FooterProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export default function Footer({ wrapperRef }: FooterProps) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>
        <h3 className={styles.title}>Contact Us</h3>

        <p>
          Call us at <a href="tel:+1 480-535-4189">+1 480-535-4189</a>
        </p>
        <p>
          Email us at: <a href="some@email.com">some@email.com</a>
        </p>
        <p>Additiona information goes here</p>
      </div>
    </div>
  );
}
