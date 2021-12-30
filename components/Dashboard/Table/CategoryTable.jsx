import IconInputField from "@/components/Input/IconInputField";
import TableDataDialog from "@/components/Popup/TableDataDialog";
import { tableHeaders } from "@/lib/constants";
import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import StatusFilter from "../Filter/StatusFilter";
import LoadingBox from "components/Loaders/LoadingBox";
import moment from "moment";
import useArticles from "@/hooks/useArticles";

export default function CategoryTable({ category, trash = false }) {
  const [searchFilter, setSearchFilter] = useState("");
  const [selectFilter, setSelectFilter] = useState("All");
  const { data, isLoading } = useArticles("head", category);
  const [filteredArticles, setFilteredArticles] = useState(data?.articles);
  const [article, setArticle] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const articlePerPage = 20;
  const pagesVisited = pageNumber * articlePerPage;
  const pageCount = Math.ceil(data?.articles?.length / articlePerPage);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setPageNumber(selectedPage);
  };

  useEffect(() => {
    if (data) setFilteredArticles(data?.articles);
  }, [data]);

  useEffect(() => {
    const filterWithSelect = data?.articles?.filter((f) => {
      if (selectFilter !== "All") {
        return f.status === selectFilter;
      } else {
        return f;
      }
    });

    // search filter
    const filterWithSearch = filterWithSelect?.filter((f) => {
      if (searchFilter === "") {
        return f;
      } else {
        return f.title.toLowerCase().includes(searchFilter);
      }
    });

    setFilteredArticles(filterWithSearch);
  }, [searchFilter, selectFilter]);

  if (isLoading) return <LoadingBox />;

  return (
    <div className="col-span-full grid grid-cols-2">
      <div className="h-16 py-8 my-6 rounded-md flex items-center space-x-4 col-span-full">
        <StatusFilter
          filter={selectFilter}
          setFilter={setSelectFilter}
          type="articles"
        />
        <IconInputField
          icon={SearchIcon}
          value={searchFilter}
          onChange={setSearchFilter}
          name="search"
          placeholder="Search article"
        />
      </div>
      <div className="bg-white p-4 w-full col-span-full">
        <div className="grid grid-cols-7 border-2 border-gray-200 bg-slate-200 sticky -top-8">
          {tableHeaders.map((th, idx) => (
            <td
              key={idx}
              className="font-bold text-lg py-4 px-3 uppercase text-slate-700 tracking-wide"
            >
              {th}
            </td>
          ))}
        </div>
        {filteredArticles
          ?.filter((t) => {
            if (trash) return t.status === "Trash";

            return t.status !== "Trash";
          })
          .slice(pagesVisited, pagesVisited + articlePerPage)
          .map((article, idx) => (
            <tr
              onClick={() => {
                setIsOpen(true);
                setArticle(article);
              }}
              key={idx}
              className="grid grid-cols-7 border-b border-gray-100 even:bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                {article.title}
              </td>
              <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                {article.writer}
              </td>
              <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                {article.category}
              </td>
              <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                <div className="truncate w-40">
                  {article.tags.map((t, i) => (
                    <span key={i}>
                      {t}
                      {i !== article.tags.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </td>
              <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                {article.comments}
              </td>
              <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                {moment(article.createdAt).startOf("hour").fromNow()}
              </td>
              <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                <span
                  className={`${
                    article.status.toLowerCase() === "draft" &&
                    "bg-yellow-100 rounded-full text-yellow-700"
                  } ${
                    article.status.toLowerCase() === "pending" &&
                    "bg-orange-100 rounded-full text-yellow-600"
                  } ${
                    article.status.toLowerCase() === "trash" &&
                    "bg-red-200 rounded-full text-red-600"
                  } ${
                    article.status.toLowerCase() === "approved" &&
                    "bg-green-200 rounded-full text-green-600"
                  } ${
                    article.status.toLowerCase() === "published" &&
                    "bg-green-200 rounded-full text-green-600"
                  } py-1 px-2`}
                >
                  {article.status}
                </span>
              </td>
            </tr>
          ))}
        <div className="bg-slate-200 border-2 border-gray-200 py-4 h-12"></div>
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
      <TableDataDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        article={article}
      />
    </div>
  );
}
