"use client"

import { useState } from "react";
import css from "./NotesPage.module.css";
import ReactPaginate from "react-paginate";
import Modal from "../../components/Modal/Modal";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteForm from "../../components/NoteForm/NoteForm";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import NoteList from "../../components/NoteList/NoteList";
import { noteService } from "../../lib/api";

function App() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [openModalState, setOpenModalState] = useState(false);

    // ✅ це значення використовуємо для запитів
    const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

    const { data } = useQuery({
        queryKey: ["myQueryKey", debouncedSearchQuery, page],
        queryFn: () => noteService(debouncedSearchQuery, page),
        placeholderData: keepPreviousData,
    });

    const toggleModal = () => setOpenModalState((p) => !p);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value); // оновлюємо одразу (щоб інпут був responsive)
        setPage(1);            // скидаємо сторінку одразу
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

            <NoteList notes={data?.notes ?? []} />

            {openModalState && (
                <Modal closeModal={toggleModal}>
                    <NoteForm closeModal={toggleModal} />
                </Modal>
            )}
        </div>
    );
}

export default App;