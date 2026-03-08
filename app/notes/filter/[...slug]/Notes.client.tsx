"use client";

import NoteList from "@/components/NoteList/NoteList";
import type { Note } from "@/types/note";

type Props = {
  notes: Note[];
  category?: string;
};

export default function NotesByCategoryClient({
  notes,
  category,
}: Props) {
  return (
    <div>
      <h1>Notes List</h1>
      {category && <p>Category: {category}</p>}
      {notes.length > 0 ? (
        <NoteList notes={notes} />
      ) : (
        <p>No notes found.</p>
      )}
    </div>
  );
}