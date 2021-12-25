import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ArticlesSpread from "../Articles/Spread/ArticlesSpread";

export default function PaginatedArticles({ items, itemsPerPage = 10, type }) {
  const [pageNumber, setPageNumber] = useState(0);
  const articlePerPage = itemsPerPage;
  const pagesVisited = pageNumber * articlePerPage;

  const pageCount = Math.ceil(items.length / articlePerPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setPageNumber(selectedPage);
  };

  return (
    <React.Fragment>
      {items.slice(pagesVisited, pagesVisited + itemsPerPage).map((_, idx) => {
        if (type === "spread") return <ArticlesSpread key={idx} />;

        // TODO: stack articles
      })}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={
          "pagination flex justify-between space-x-2 font-bold max-w-min mt-16"
        }
        activeClassName={"active text-white"}
        breakClassName={"font-bold"}
        disabledClassName={"disabled"}
      />
    </React.Fragment>
  );
}
