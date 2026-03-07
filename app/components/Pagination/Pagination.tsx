// import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
	page: number; // 1-based (як у твоєму API)
	totalPages: number; // з бекенду
	onChange: (page: number) => void;
};

function Pagination({ page, totalPages, onChange }: PaginationProps) {
	return (
		<ReactPaginate
			pageCount={totalPages}
			onPageChange={(e) => onChange(e.selected + 1)} // 0-based -> 1-based
			forcePage={page - 1} // щоб UI збігався зі state
			previousLabel="<"
			nextLabel=">"
			breakLabel="..."
			marginPagesDisplayed={1}
			pageRangeDisplayed={3}
		/>
	);
}
export default Pagination;
