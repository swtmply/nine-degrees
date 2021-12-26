import IconInputField from "@/components/Input/IconInputField";
import { tableContents, tableHeaders } from "@/lib/constants";
import { SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import StatusFilter from "../Filter/StatusFilter";

export default function Table({ articles }) {
  const [searchFilter, setSearchFilter] = useState("");
  const [selectFilter, setSelectFilter] = useState("All");

  const [pageNumber, setPageNumber] = useState(0);
  const articlePerPage = 5;
  const pagesVisited = pageNumber * articlePerPage;

  const pageCount = Math.ceil(10 / articlePerPage);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setPageNumber(selectedPage);
  };

  return (
    <div>
      <div className="h-16 py-8 mt-5 rounded-md flex items-center space-x-4">
        {/* Filter with search or status */}
        <StatusFilter filter={selectFilter} setFilter={setSelectFilter} />
        <IconInputField
          icon={SearchIcon}
          value={searchFilter}
          onChange={setSearchFilter}
          name="search"
          placeholder="Search article"
        />
      </div>
      <div className="w-full bg-white p-4 pb-8 mt-5 rounded-md">
        <table className="w-full bg-white p-4 table-auto">
          <thead className="border-2 border-gray-200 bg-slate-100">
            <tr>
              {tableHeaders.map((th, idx) => (
                <td
                  key={idx}
                  className="font-bold text-lg py-4 px-3 uppercase text-slate-600 tracking-wide"
                >
                  {th}
                </td>
              ))}
            </tr>
          </thead>
          <tbody className="border-x-2 border-gray-200">
            {[...Array(10)]
              .slice(pagesVisited, pagesVisited + 5)
              .map((_, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-100 even:bg-gray-100 hover:bg-gray-200 cursor-pointer"
                >
                  {tableContents.map((td, idx) => (
                    <td
                      key={idx}
                      className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate"
                    >
                      {td}
                    </td>
                  ))}
                </tr>
              ))}
            <tr className="bg-slate-100 border-2 border-gray-200 py-4 h-12">
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
      </div>
    </div>
  );
}
