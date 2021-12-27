import IconInputField from "@/components/Input/IconInputField";
import TableDataDialog from "@/components/Popup/TableDataDialog";
import { usersTableContents, usersTableHeaders } from "@/lib/constants";
import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import StatusFilter from "../Filter/StatusFilter";

export default function UsersTable({ articles }) {
  const [searchFilter, setSearchFilter] = useState("");
  const [selectFilter, setSelectFilter] = useState("All");

  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [isOpen, setIsOpen] = useState(false);

  const [pageNumber, setPageNumber] = useState(0);

  // TODO: change kung ilan gusto XD
  const articlePerPage = 5;
  const pagesVisited = pageNumber * articlePerPage;

  const pageCount = Math.ceil(filteredArticles?.length / articlePerPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setPageNumber(selectedPage);
  };

  useEffect(() => {
    // TODO: filter articles here
    // filter with status then search
  }, [searchFilter, selectFilter]);

  return (
    <div>
      <div className="h-16 py-8 my-6 rounded-md flex items-center space-x-4">
        <StatusFilter filter={selectFilter} setFilter={setSelectFilter} />
        <IconInputField
          icon={SearchIcon}
          value={searchFilter}
          onChange={setSearchFilter}
          name="search"
          placeholder="Search article"
        />
      </div>
      <table className="w-full bg-white p-4 table-auto">
        <thead className="border-2 border-gray-200 bg-slate-200">
          <tr>
            {usersTableHeaders.map((th, idx) => (
              <td
                key={idx}
                className="font-bold text-lg py-4 px-3 uppercase text-slate-700 tracking-wide"
              >
                {th}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className="border-x-2 border-gray-200">
          {/* TODO: change to filtered articles */}
          {[...Array(10)]
            .slice(pagesVisited, pagesVisited + articlePerPage)
            .map((_, idx) => (
              <tr
                onClick={() => setIsOpen(true)}
                key={idx}
                className="border-b border-gray-100 even:bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                {/* TODO: change to table row data */}
                {usersTableContents.map((td, idx) => (
                  <td
                    key={idx}
                    className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate"
                  >
                    {td}
                  </td>
                ))}
              </tr>
            ))}
          {/* Filler Row */}
          <tr className="bg-slate-200 border-2 border-gray-200 py-4 h-12">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
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
      {/* TODO: pass data to modal */}
      <TableDataDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
