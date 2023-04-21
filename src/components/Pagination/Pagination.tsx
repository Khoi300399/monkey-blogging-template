import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/config";
type Props = {
  handleNextPage?: () => void;
  handlePrevPage?: () => void;
  handlePageClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const Pagination = ({
  handleNextPage = () => {},
  handlePrevPage = () => {},
  handlePageClick = () => {},
}: Props) => {
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.postReducer
  );

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  if (totalPages === 1) return null;
  return (
    <div className="pagination">
      <button
        className="pagination-prev"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <ul className="pagination-list">
        {pageNumbers.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`pagination-item ${
              currentPage === pageNumber ? "is-current" : ""
            }`}
            onClick={handlePageClick}
          >
            {pageNumber}
          </li>
        ))}
      </ul>
      <button
        className="pagination-next"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
