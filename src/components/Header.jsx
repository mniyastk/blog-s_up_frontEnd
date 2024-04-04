import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useClickAway } from "react-use";
import axios from "axios";
import { toast } from "react-toastify";
import SearchBar from "./SearchBar";
import { removeUser } from "../redux/user/userSlice";
import { removeAuthor } from "../redux/author/authorSlice";

const Header = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [showMainBar, setShowMainBar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const componentRef = useRef();
  const componentRef2 = useRef();
  const searchBarRef = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const author = useSelector((state) => state.author.author);

  const isAuthor = localStorage.getItem("isAuthor");
  console.log(isAuthor);

  console.log(user, author);

  useClickAway(componentRef2, () => {
    setShowDiv(false);
  });

  useClickAway(componentRef, () => {
    setShowMainBar(false);
  });

  useClickAway(searchBarRef, () => {
    setShowSearch(false);
  });

  const handleSignOut = () => {
    axios
      .delete("user/signout")
      .then((res) => {
        toast.success("Sign Out success");
        localStorage.clear();
        dispatch(removeUser());
        dispatch(removeAuthor());
        navigate("/");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  return (
    <div>
      <nav className="bg-white border-b dark:bg-gray-900  text-l">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className=" flex space-x-3 w-2/3 md:w-1/3">
            <p className="flex items-center    w-3/4 md:w-fit">
              <Link to={"/home"}>
                <img
                  width={40}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1708602018/b_zdbtfu.svg"
                  alt=""
                />
              </Link>
            </p>
            <div className="hidden md:block ">
              <SearchBar />
            </div>
            <div
              onClick={() => setShowSearch(!showSearch)}
              className=" cursor-pointer md:hidden w-full flex justify-end items-center "
            >
              <img
                width={25}
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1711450904/search_1_lfy0py.svg"
                alt="search"
              />
            </div>
          </div>

          <div className="  flex items-center md:order-2  space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className=" flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              onClick={() => setShowDiv(true)}
            >
              <span className="sr-only">Open user menu</span>
              <img
                alt="pic"
                className="w-8 h-8 rounded-full flex"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709975823/1228259_bjsgom.png"
              />
            </button>
            <div
              ref={componentRef2}
              className={` z-50 ${
                showDiv ? " block" : "hidden"
              }   text-base list-none absolute bg-white right-5 top-16 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            >
              <div className="px-4 py-3 ">
                <div className=" flex justify-between">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user?.username || author?.username}
                  </span>
                  <div
                    className={`${
                      isAuthor ? "block" : "hidden"
                    } bg-green-400 rounded-sm flex justify-center items-center px-2 text-xs`}
                  >
                    Admin
                  </div>
                </div>

                <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                  {user?.email || author?.email}
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <Link
                    to={`${user?.userId ? "/home/account" : "/author"}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Account
                  </Link>
                </li>
                <li>
                  <Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                    Settings
                  </Link>
                </li>
                <li>
                  <div
                    onClick={handleSignOut}
                    className=" cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </div>
                </li>
              </ul>
            </div>
            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-user"
              onClick={() => setShowMainBar(!showMainBar)}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            ref={componentRef}
            className={`  items-center  justify-between ${
              showMainBar ? " block" : "hidden"
            } w- md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to={"/home"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={"/about"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </Link>
              </li>
              <li>
                <Link className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Write
                </Link>
              </li>
              <li>
                <Link className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showSearch && (
        <div ref={searchBarRef}>
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default Header;
