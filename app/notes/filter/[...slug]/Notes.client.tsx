"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { noteService } from "@/lib/api";
import type { Note } from "@/types/note";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";

type Props = {
  tag?: string;
};

export default function Notes({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedQuery, page, tag],
    queryFn: () => noteService(debouncedQuery, page, tag),
    staleTime: 60_000,
  });

  const handleSearch = (value: string) => {
    setInputValue(value);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const openModal = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <p>Could not fetch notes. {(error as Error).message}</p>;
  }

  return (
    <>
      <SearchBox value={inputValue} onChange={handleSearch} />

      {!data?.notes?.length ? (
        <p>No notes found.</p>
      ) : (
        <NoteList notes={data.notes} onOpen={openModal} />
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          page={page}
          onChange={handlePageChange}
        />
      )}

      {isModalOpen && selectedNote && (
        <Modal closeModal={closeModal}>
          <h2>{selectedNote.title}</h2>
          <p>{selectedNote.content}</p>
          <p>{selectedNote.tag}</p>
        </Modal>
      )}
    </>
  );
} 