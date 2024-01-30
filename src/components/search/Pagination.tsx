import React from "react";
import { useProducts } from "./ProductsProvider";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useOramaHits } from "../../lib/orama"

function calculateTotalPages(totalItems: number, limit: number): number {
  // Ensure both totalItems and limit are positive integers
  totalItems = Math.max(0, Math.floor(totalItems));
  limit = Math.max(1, Math.floor(limit));

  // Calculate the total number of pages using the formula
  return Math.ceil(totalItems / limit);
}

export const Pagination = (): JSX.Element => {
  const { page } = useProducts()
  const oramaHits = useOramaHits()
  const pathname = usePathname();

  if (!oramaHits) {
    return <></>;
  }

  const totalPages = calculateTotalPages(oramaHits.count, page.meta.page.limit);

  return (
    <div className={clsx("block")}>
      <div className="flex justify-center gap-2 flex-wrap">
        {[...Array(totalPages).keys()].map((currentPage) => (
          <Link
            href={`${pathname}?limit=${page.meta.page.limit}&offset=${
              currentPage * page.meta.page.limit
            }`}
            className={clsx(
              currentPage + 1 === page.meta.page.current
                ? "bg-brand-primary"
                : "bg-gray-100",
              currentPage + 1 === page.meta.page.current
                ? "text-white"
                : "text-black",
              "primary-btn w-fit cursor-pointer",
            )}
            key={currentPage + 1}
          >
            {currentPage + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
