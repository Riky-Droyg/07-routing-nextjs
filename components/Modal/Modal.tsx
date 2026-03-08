"use client";

import type { MouseEvent, ReactNode } from "react";
import css from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export default function Modal({ children, onClose }: ModalProps) {
  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={stopPropagation}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}