type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-5 mt-10 text-gray-500 text-sm">
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              transition hover:text-black
              ${currentPage === page ? "text-[#6B6B6B] font-semibold" : ""}
            `}
          >
            {page}
          </button>
        );
      })}

      <span>...</span>
    </div>
  );
}

export default Pagination;
