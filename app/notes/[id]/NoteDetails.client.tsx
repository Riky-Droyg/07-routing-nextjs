"use client";

import type { Note } from "@/types/note";
import css from "./NoteDetails.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

export default function NoteDetailsClient({ id }: { id: string }) {

  const { data: note, isLoading } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,

  });

  if (isLoading) return <p>Loading...</p>;
  if (!note) return null;

  return (
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
  );
}