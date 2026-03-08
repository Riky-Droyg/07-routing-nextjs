"use client";

import { deleteNoteService } from "@/lib/api";
import css from "./NoteList.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "@/types/note";
import Link from "next/link";

type NoteListProps = {
  notes: Note[];
  onOpen?: (note: Note) => void;
};

function NoteList({ notes, onOpen }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteNote = useMutation({
    mutationFn: async (id: string) => deleteNoteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map((el) => (
        <li key={el.id} className={css.listItem}>
          <h2 className={css.title}>{el.title}</h2>
          <p className={css.content}>{el.content}</p>

          <div className={css.footer}>
            <span className={css.tag}>{el.tag}</span>

            {onOpen ? (
              <button
                type="button"
                className={css.button}
                onClick={() => onOpen(el)}
              >
                View details
              </button>
            ) : (
              <Link href={`/notes/${el.id}`} aria-label="View details">
                View details
              </Link>
            )}

            <button
              className={css.button}
              type="button"
              onClick={() => deleteNote.mutateAsync(el.id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;