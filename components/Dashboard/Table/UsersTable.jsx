import IconInputField from "@/components/Input/IconInputField";
import { usersTableHeaders } from "@/lib/constants";
import { SearchIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import StatusFilter from "../Filter/StatusFilter";
import LoadingBox from "components/Loaders/LoadingBox";
import useUsers from "@/hooks/useUsers";
import { PencilAltIcon, TrashIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import UsersTableDialog from "@/components/Popup/UsersTableDialog";

export default function UsersTable({ category, user }) {
  const [searchFilter, setSearchFilter] = useState("");
  const [selectFilter, setSelectFilter] = useState("All");
  const { data, isLoading } = useUsers("head", category);
  const [filteredArticles, setFilteredArticles] = useState(data?.users);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userState, setUserState] = useState();

  const [pageNumber, setPageNumber] = useState(0);
  const articlePerPage = 20;
  const pagesVisited = pageNumber * articlePerPage;
  const pageCount = Math.ceil(data?.users?.length / articlePerPage);
  const handlePageClick = (e) => {
    const selectedPage = e.selected;

    setPageNumber(selectedPage);
  };

  useEffect(() => {
    if (data) setFilteredArticles(data?.users);
  }, [data]);

  useEffect(() => {
    const filterWithSelect = data?.users?.filter((f) => {
      if (selectFilter !== "All") {
        return f.role === selectFilter;
      } else {
        return f;
      }
    });

    // search filter
    const filterWithSearch = filterWithSelect?.filter((f) => {
      if (searchFilter === "") {
        return f;
      } else {
        return f.name.toLowerCase().includes(searchFilter);
      }
    });

    setFilteredArticles(filterWithSearch);
  }, [searchFilter, selectFilter]);

  if (isLoading) return <LoadingBox />;

  return (
    <div>
      <div className="h-16 py-8 my-6 rounded-md flex justify-between items-center space-x-4">
        <div className="flex gap-2">
          <StatusFilter
            filter={selectFilter}
            setFilter={setSelectFilter}
            type="users"
          />
          <IconInputField
            icon={SearchIcon}
            value={searchFilter}
            onChange={setSearchFilter}
            name="search"
            placeholder="Search name"
          />
        </div>
        <button
          onClick={() => router.push("/auth/register")}
          className="px-8 py-3 bg-red-500 font-bold text-lg text-white rounded-md hover:bg-red-600 "
        >
          Create User +
        </button>
      </div>
      <table className="w-full table-auto">
        <thead className="border-2 border-gray-200 bg-slate-200 sticky -top-8">
          <tr>
            {usersTableHeaders.map((th, idx) => (
              <td
                key={idx}
                className="font-bold text-lg py-4 px-3 uppercase text-slate-700 tracking-wide"
              >
                {th}
              </td>
            ))}
            <td className="font-bold text-lg py-4 px-3 uppercase text-slate-700 tracking-wide"></td>
          </tr>
        </thead>
        <tbody className="border-x-2 border-gray-200">
          {filteredArticles
            ?.slice(pagesVisited, pagesVisited + articlePerPage)
            .map((user, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 even:bg-gray-100 hover:bg-gray-200"
              >
                <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                  {user.name}
                </td>
                <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                  {user.email}
                </td>
                <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                  {user.role}
                </td>
                <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate">
                  <div className="truncate w-40">
                    {user.categories.map((t, i) => (
                      <span key={i}>
                        {t}
                        {i !== user.categories.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="text-lg text-slate-700 max-w-[300px] py-3 px-3 truncate space-x-4">
                  <button onClick={() => router.push(`/user/${user?._id}`)}>
                    <PencilAltIcon className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setUserState(user);
                    }}
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </td>
              </tr>
            ))}
          {/* Filler Row */}
          <tr className="bg-slate-200 border-2 border-gray-200 py-4 h-12">
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
      <UsersTableDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={userState}
      />
    </div>
  );
}
