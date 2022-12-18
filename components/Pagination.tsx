import React from "react";

type Paginationprops = {
  page: number;
  pageSize: number;
  count: number;
  onPrev: () => void;
  onNext: () => void;
};
export function Pagination({
  page,
  pageSize,
  count,
  onPrev,
  onNext,
}: Paginationprops) {
  const from = pageSize * page - pageSize + 1;
  const amount = pageSize * page;
  const calc = count - amount;
  const to = calc < 0 ? amount / page + calc + pageSize : pageSize;

  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{from}</span> a{" "}
          <span className="font-medium">{to}</span> de{" "}
          <span className="font-medium">{count}</span> productos
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          onClick={onPrev}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Anterior
        </button>
        <button
          onClick={onNext}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Siguente
        </button>
      </div>
    </nav>
  );
}
