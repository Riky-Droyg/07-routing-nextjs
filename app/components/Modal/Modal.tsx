"use client"

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

type ModalProps = {
  closeModal: () => void;
  children: React.ReactNode;
};

function Modal({ closeModal, children }: ModalProps) {
  // Закриття по Escape + блок скролу
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [closeModal]);

  // Закриття по кліку на бекдроп (але не всередині модалки)
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onMouseDown={onBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}

export default Modal;