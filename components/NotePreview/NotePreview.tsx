"use client";

import { useRouter } from "next/navigation";
import type { ReactNode, MouseEvent } from "react";
import css from "./NotePreview.module.css";

type Props = {
  children: ReactNode;
};

export default function NotePreview({ children }: Props) {
  const router = useRouter();

  const closeModal = () => {
    router.back();
  };

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={css.backdrop} onClick={closeModal}>
      <div className={css.modal} onClick={stopPropagation}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={closeModal}
          aria-label="Close modal"
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
}