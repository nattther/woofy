import React from "react";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onPageChange }) => (
  <div className="flex items-center justify-center gap-3">
    <button
      onClick={() => onPageChange(page - 1)}
      disabled={page === 1}
      className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
      aria-label="Précédent"
    >
      <img src="/icons/arrow-left.png" alt="Précédent" className="h-6 w-6" />
    </button>
    <span className="font-medium text-lg">
      Page {page} sur {pageCount}
    </span>
    <button
      onClick={() => onPageChange(page + 1)}
      disabled={page === pageCount}
      className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50"
      aria-label="Suivant"
    >
      <img src="/icons/arrow-right.png" alt="Suivant" className="h-6 w-6" />
    </button>
  </div>
);

export default Pagination;
