"use client";

import { useState } from "react";
import css from "./NotesPage.module.css";
import ReactPaginate from "react-paginate";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import { noteService } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesPageClient() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModalState, setOpenModalState] = useState(false);

  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearchQuery, page],
    queryFn: () => noteService(debouncedSearchQuery, page),
    placeholderData: keepPreviousData,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  const toggleModal = () => setOpenModalState((p) => !p);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const totalPages = data?.totalPages ?? 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
          />
        )}

        <button onClick={toggleModal} className={css.button}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>{(error as Error).message}</p>}

      <NoteList notes={data?.notes ?? []} />

      {openModalState && (
        <Modal closeModal={toggleModal}>
          <NoteForm closeModal={toggleModal} />
        </Modal>
      )}
    </div>
  );
}