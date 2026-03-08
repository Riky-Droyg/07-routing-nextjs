"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { noteService } from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

type Props = {
  tag?: string;
};

export default function Notes({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(inputValue);
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
    setPage(1);
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <p>Could not fetch notes. {(error as Error).message}</p>;
  }

  return (
    <>
      <SearchBox value={inputValue} onChange={handleSearch} />

      <button type="button" onClick={openModal}>
        Create note +
      </button>

      {!data?.notes?.length ? (
        <p>No notes found.</p>
      ) : (
        <NoteList notes={data.notes} />
      )}

      {data && data.totalPages > 1 && (
        <Pagination
          totalPages={data.totalPages}
          page={page}
          onChange={handlePageChange}
        />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
}