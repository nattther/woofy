import React from "react";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onPageChange }) => (
  <div className="flex items-center justify-center gap-5 mt-4">
    <button
      onClick={() => onPageChange(page - 1)}
      disabled={page === 1}
      className="p-3 rounded-full bg-white border border-[#89CFF0] shadow hover:bg-[#E3F4FD] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#89CFF0] transition"
      aria-label="Précédent"
    >
      {/* Flèche gauche */}
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#89CFF0"
        strokeWidth={3}
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
    <span className="font-semibold text-lg tracking-wide">
      Page {page} <span className="opacity-60 font-normal">/ {pageCount}</span>
    </span>
    <button
      onClick={() => onPageChange(page + 1)}
      disabled={page === pageCount}
      className="p-3 rounded-full bg-white border border-[#89CFF0] shadow hover:bg-[#E3F4FD] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#89CFF0] transition"
      aria-label="Suivant"
    >
      {/* Flèche droite */}
      <svg
        width="24"
        height="24"
        fill="none"
        stroke="#89CFF0"
        strokeWidth={3}
        viewBox="0 0 24 24"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  </div>
);

export default Pagination;
