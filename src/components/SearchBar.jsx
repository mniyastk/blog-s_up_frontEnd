import axios from "axios";
import { React, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useClickAway } from "react-use";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [filterData, setFilterDate] = useState([]);

  const searchRef = useRef();

  useClickAway(searchRef, () => {
    setSearchQuery("");
  });

  useEffect(() => {
    axios
      .get("user/blogs")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        toast.error("error");
      });
  }, []);

  useEffect(() => {
    const filterData = () => {
      let filteredData = blogs.filter((item) => {
        if (
          searchQuery &&
          !item.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        return true;
      });
      return filteredData;
    };
    const filteredData = filterData();
    setFilterDate(filteredData);
  }, [searchQuery]);

  return (
    <div>
      <form className="w-full">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className=" relative w-full justify-end ">
          <div className=" absolute w-full  inset-y-0 start-0 flex items-center  md:justify-normal ps-3 pointer-events-none">
            <svg
              className=" w-4 h-4  text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            // type="Search"
            id="default-search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-2.5 ps-10 text-sm rounded-full border-none outline-none bg-gray-100"
            placeholder="Search"
            required
          />
        </div>
      </form>
      {searchQuery && (
        <div
          ref={searchRef}
          id="searchdiv"
          className=" rounded-sm absolute z-50 sm:z-40   bg-white h-[300px] shadow-md overflow-y-auto py-5 px-6 space-y-4"
        >
          {filterData.map((item) => {
            return (
              <div
                onClick={() => setSearchQuery("")}
                className=" font-semibold "
                key={item._id}
              >
                <Link to={`/home/blog/${item._id}`}>{item.title}</Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
