import { fetchNoteByTag } from "@/lib/api";
import Notes from "./Notes.client";
import type { Note } from "@/types/note";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;

  const category = slug[0] === "all" ? undefined : slug[0];
  const response = await fetchNoteByTag(category);

  return (
    <Notes
      notes={(response?.notes ?? []) as Note[]}
      category={category}
    />
  );
}