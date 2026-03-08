"use client";

import { useEffect } from "react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error("Notes by category error:", error);
  }, [error]);

  return (
    <section>
      <h1>Notes List</h1>
      <p>Failed to load notes. {error.message}</p>
      <button type="button" onClick={reset}>
        Reload
      </button>
    </section>
  );
}