// app/notes/page.tsx
import { noteService } from "@/lib/api";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotesPageClient from "./Notes.client";

export default async function Page() {
  const qc = new QueryClient();

  const search = ""; // стартово
  const page = 1;

  await qc.prefetchQuery({
    queryKey: ["notes", search, page],
    queryFn: () => noteService(search, page),
    staleTime: 60_000,
  });

  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NotesPageClient />
    </HydrationBoundary>
  );
}