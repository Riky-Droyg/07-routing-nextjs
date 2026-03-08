"use client";

import { useQuery } from "@tanstack/react-query";
import { noteService } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

type Props = {
  category?: string;
};

export default function Notes({ category }: Props) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => noteService("", 1, category),
    staleTime: 60_000,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <p>Could not fetch notes. {(error as Error).message}</p>;
  }

  if (!data?.notes?.length) {
    return <p>No notes found.</p>;
  }

  return <NoteList notes={data.notes} />;
}