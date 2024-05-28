import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation"
interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages, }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-2 py-1 mr-2 rounded-md bg-gray-200"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <span className="px-2 py-1 font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-2 py-1 ml-2 rounded-md bg-gray-200"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}