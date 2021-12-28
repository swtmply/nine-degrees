import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import ArticlesSpread from "../Articles/Spread/ArticlesSpread";
import ArticlesStack from "../Articles/Stack/ArticlesStack";

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
    <div className="flex flex-col">
      <div className={`${type === "stack" && "flex flex-wrap"}`}>
        {items
          ?.filter((t) => t.status === "Published")
          .slice(pagesVisited, pagesVisited + itemsPerPage)
          .map((article, idx) => {
            if (type === "spread")
              return <ArticlesSpread article={article} key={idx} />;

            return <ArticlesStack article={article} key={idx} />;
          })}
      </div>
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
    </div>
  );
}
