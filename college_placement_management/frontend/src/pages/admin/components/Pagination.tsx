type PaginationProps = {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const startItem =
    totalItems === 0
      ? 0
      : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(
    currentPage * pageSize,
    totalItems,
  );

  return (
    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Showing Information */}
      <div className="text-sm text-slate-500">
        Showing {startItem} - {endItem} of{" "}
        {totalItems} students
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Page Size */}
        <select
          value={pageSize}
          onChange={(e) =>
            onPageSizeChange(
              Number(e.target.value),
            )
          }
          className="rounded-lg border bg-white px-3 py-2 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>

        {/* Previous Button */}
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(
              Math.max(1, currentPage - 1),
            )
          }
          className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
        >
          Previous
        </button>

        {/* Current Page */}
        <span className="px-2 text-sm">
          {currentPage} / {totalPages}
        </span>

        {/* Next Button */}
        <button
          type="button"
          disabled={
            currentPage === totalPages
          }
          onClick={() =>
            onPageChange(
              Math.min(
                totalPages,
                currentPage + 1,
              ),
            )
          }
          className="rounded-lg border px-3 py-2 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}