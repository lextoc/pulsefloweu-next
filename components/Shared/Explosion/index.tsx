import styles from "./index.module.css";

export interface ExplosionProps {
  isExploding?: boolean;
}

export default function Explosion(props: ExplosionProps) {
  const { isExploding } = props;
  return (
    <svg
      className={`${isExploding ? styles.exploding : ""} ${styles.explosion}`}
      viewBox="467 392 58 57"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd" transform="translate(467 392)">
        <g className={styles.grp7} opacity="0" transform="translate(7 6)">
          <circle className={styles.oval1} fill="#FF7C00" cx="2" cy="6" r="2" />
          <circle className={styles.oval2} fill="#FFD500" cx="5" cy="2" r="2" />
        </g>

        <g className={styles.grp6} opacity="0" transform="translate(0 28)">
          <circle className={styles.oval1} fill="#FF7C00" cx="2" cy="7" r="2" />
          <circle className={styles.oval2} fill="#FFD500" cx="3" cy="2" r="2" />
        </g>

        <g className={styles.grp3} opacity="0" transform="translate(52 28)">
          <circle className={styles.oval2} fill="#FF7C00" cx="2" cy="7" r="2" />
          <circle className={styles.oval1} fill="#FFD500" cx="4" cy="2" r="2" />
        </g>

        <g className={styles.grp2} opacity="0" transform="translate(44 6)">
          <circle className={styles.oval2} fill="#FF7C00" cx="5" cy="6" r="2" />
          <circle className={styles.oval1} fill="#FFD500" cx="2" cy="2" r="2" />
        </g>

        <g className={styles.grp5} opacity="0" transform="translate(14 50)">
          <circle className={styles.oval1} fill="#FF7C00" cx="6" cy="5" r="2" />
          <circle className={styles.oval2} fill="#FFD500" cx="2" cy="2" r="2" />
        </g>

        <g className={styles.grp4} opacity="0" transform="translate(35 50)">
          <circle className={styles.oval1} fill="#FF7C00" cx="6" cy="5" r="2" />
          <circle className={styles.oval2} fill="#FFD500" cx="2" cy="2" r="2" />
        </g>

        <g className={styles.grp1} opacity="0" transform="translate(24)">
          <circle
            className={styles.oval1}
            fill="#FF7C00"
            cx="2.5"
            cy="3"
            r="2"
          />
          <circle
            className={styles.oval2}
            fill="#FFD500"
            cx="7.5"
            cy="2"
            r="2"
          />
        </g>
      </g>
    </svg>
  );
}
