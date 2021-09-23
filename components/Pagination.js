import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
export default function Pagination({ page, setPage, maxPage }) {
  return (
    <div className="flex items-center pt-2">
      <button
        disabled={page === 0}
        type="button"
        className="pagination-button"
        onClick={() => setPage(page - 1)}
      >
        <HiOutlineChevronLeft />
      </button>
      <button
        type="button"
        className="pagination-button"
        onClick={() => setPage(page + 1)}
        disabled={page === maxPage - 1}
      >
        <HiOutlineChevronRight />
      </button>
    </div>
  );
}
