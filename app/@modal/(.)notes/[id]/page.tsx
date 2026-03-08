import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NoteDetailsClient from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";


export default async function Page({ params }: { params: Promise<{ id: string }> }) {

  const qc = new QueryClient();
  const { id } = await params;

  await qc.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  console.log("sersvers")
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}