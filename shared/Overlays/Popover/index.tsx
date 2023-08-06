import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { Popover } from "react-tiny-popover";

import styles from "./index.module.css";

export interface PopoverProps {
  content: React.ReactNode;
  white?: boolean;
  button?: React.ReactNode;
  id?: string;
}

export default function ({ content, white, button, id }: PopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Popover
      isOpen={isOpen}
      positions={["bottom"]}
      onClickOutside={() => setIsOpen(false)}
      containerStyle={{ zIndex: "2000" }}
      content={
        <div className={styles.menu} onClick={() => setIsOpen(false)}>
          {content}
        </div>
      }
    >
      {button ? (
        <button
          id={id}
          className={styles.blankButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {button}
        </button>
      ) : (
        <button
          id={id}
          className={`${styles.menuButton} ${
            white ? styles.menuButtonWhite : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <IconDotsVertical
            className={styles.dots}
            color={white ? "white" : "rgb(6, 31, 54)"}
            size="1rem"
          />
        </button>
      )}
    </Popover>
  );
}
