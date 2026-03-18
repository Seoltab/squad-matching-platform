"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const start = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1 || totalItems === 0) return null;

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
      <p className="text-seoltab-dark/70 text-sm order-2 sm:order-1">
        {totalItems}명 중 {start}–{end}번 표시
      </p>
      <nav
        className="flex items-center gap-1 order-1 sm:order-2"
        aria-label="페이지 네비게이션"
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="h-9 px-3 rounded-lg text-seoltab-dark font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-seoltab-sub transition-colors"
        >
          이전
        </button>
        <div className="flex items-center gap-1 mx-1">
          {getPageNumbers().map((p, i) =>
            p === "ellipsis" ? (
              <span key={`ellipsis-${i}`} className="px-2 text-seoltab-dark/50">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`
                  min-w-[2.25rem] h-9 rounded-lg font-medium text-sm transition-colors
                  ${currentPage === p
                    ? "bg-seoltab-blue text-white"
                    : "text-seoltab-dark hover:bg-seoltab-sub"
                  }
                `}
              >
                {p}
              </button>
            )
          )}
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="h-9 px-3 rounded-lg text-seoltab-dark font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-seoltab-sub transition-colors"
        >
          다음
        </button>
      </nav>
    </div>
  );
}
