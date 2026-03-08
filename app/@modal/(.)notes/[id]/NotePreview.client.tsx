"use client";

import { useRouter } from "next/navigation";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

export default function NoteDetailsClient({ id }: { id: string }) {
  const router = useRouter();

  const { data: note, isLoading, isError, error } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return (
      <p className={css.error}>
        Could not fetch the note. {(error as Error).message}
      </p>
    );
  }

  if (!note) return <p>Note not found.</p>;

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
          </div>
          <p className={css.tag}>{note.tag}</p>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
}