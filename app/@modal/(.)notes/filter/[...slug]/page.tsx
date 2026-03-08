import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { noteService } from "@/lib/api";
import Notes from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesByCategory({ params }: Props) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, category],
    queryFn: () => noteService("", 1, category),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes category={category} />
    </HydrationBoundary>
  );
}