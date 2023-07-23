import { IconDotsVertical } from "@tabler/icons-react";
import { useState } from "react";
import { Popover } from "react-tiny-popover";

import styles from "./Popover.module.css";

export interface IPopoverProps {
  content: React.ReactNode;
}

export default function ({ content }: IPopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Popover
      isOpen={isOpen}
      positions={["bottom"]}
      onClickOutside={() => setIsOpen(false)}
      content={
        <div className={styles.menu} onClick={() => setIsOpen(false)}>
          {content}
        </div>
      }
    >
      <button className={styles.menuButton} onClick={() => setIsOpen(!isOpen)}>
        <IconDotsVertical size="1rem" />
      </button>
    </Popover>
  );
}
