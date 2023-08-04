"use client";

import { IconX } from "@tabler/icons-react";
import { createPortal } from "react-dom";
import { default as ReactModal } from "react-modal";

import styles from "./index.module.css";

export interface ModalProps {
  isOpen: boolean;
  close: Function;
  children: React.ReactNode;
}

const customStyles = {
  overlay: {
    zIndex: 1000,
    backdropFilter: "blur(0.05rem)",
    background: "rgba(0, 0, 0, 0.15)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 0,
    boxShadow: "0 0.5rem 5rem rgba(var(--secondary), 0.15)",
    width: "36rem",
    maxWidth: "100%",
    borderRadius: "var(--border-radius)",
    maxHeight: "90vh",
  },
};

export default function Modal({ isOpen, close, children }: ModalProps) {
  return (
    <>
      {createPortal(
        <ReactModal
          isOpen={isOpen}
          onRequestClose={() => close()}
          style={customStyles}
        >
          <button className={styles.closeButton} onClick={() => close()}>
            <IconX />
          </button>
          {isOpen && <>{children}</>}
        </ReactModal>,
        document.body,
      )}
    </>
  );
}
