import Link from "next/link";

import styles from "./Logo.module.css";

export interface ILogoProps {
  noText?: boolean;
  small?: boolean;
  white?: boolean;
  noLink?: boolean;
}

function actualLogo({
  noText,
  small,
  white,
}: Omit<ILogoProps, "noLink">): React.ReactNode {
  return (
    <>
      <svg
        className={`${styles.logo} ${small ? styles.logoSmall : ""}`}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 200 200"
      >
        <rect className={styles.logoSquareOne} width="100" height="100" />
        <rect
          className={styles.logoSquareTwo}
          width="100"
          height="100"
          x="100"
        />
        <rect
          className={styles.logoSquareThree}
          width="100"
          height="100"
          y="100"
        />
        <rect
          className={styles.logoSquareFour}
          width="100"
          height="100"
          x="100"
          y="100"
        />
        <polygon fill="#fff" points="70,60 70,140 140,100"></polygon>
      </svg>
      {!noText && (
        <div
          className={`${styles.tracky} ${small ? styles.trackySmall : ""} ${
            white ? styles.trackyWhite : ""
          }`}
        >
          Tracky
        </div>
      )}
    </>
  );
}

export default function Logo({ noLink, small, ...props }: ILogoProps) {
  return noLink ? (
    <div className={`${styles.root} ${small ? styles.rootSmall : ""}`}>
      {actualLogo({ small, ...props })}
    </div>
  ) : (
    <Link
      href="/"
      className={`${styles.root} ${small ? styles.rootSmall : ""}`}
    >
      {actualLogo({ small, ...props })}
    </Link>
  );
}
