import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { Popover } from "react-tiny-popover";

import styles from "./Popover.module.css";

export interface IPopoverProps {
  content: React.ReactNode;
  white?: boolean;
}

export default function ({ content, white }: IPopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Popover
      isOpen={isOpen}
      positions={["bottom"]}
      onClickOutside={() => setIsOpen(false)}
      containerStyle={{ zIndex: "250" }}
      content={
        <div className={styles.menu} onClick={() => setIsOpen(false)}>
          {content}
        </div>
      }
    >
      <button
        className={`${styles.menuButton} ${
          white ? styles.menuButtonWhite : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <IconDotsVertical
          size="1rem"
          color={white ? "white" : "rgb(6, 31, 54)"}
        />
      </button>
    </Popover>
  );
}
