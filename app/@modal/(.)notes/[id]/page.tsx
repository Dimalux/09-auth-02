// app/@modal/(.)notes/[id]/page.tsx
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { HydrationBoundary } from "@tanstack/react-query";
import NotePreview from "@/app/@modal/(.)notes/[id]/NotePreview.client";
import { notesApi } from "@/lib/api/clientApi";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteModal({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => notesApi.getNote(id), // Виправити тут - викликати метод getNote
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  );
}