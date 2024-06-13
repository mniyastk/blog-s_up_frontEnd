import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@react-hook/media-query";

function AuthorLayout() {
    const user = useSelector((state) => state.user.user);
    const sidebarRef = useRef(null);
    const isSmallScreen = useMediaQuery("(max-width: 767px)");

    const [flag, setFlag] = useState(true);
    const history = useNavigate();
    const handleLogout = () => {
        const response = window.confirm("Are you Want to Logout...?");
        if (response) {
            localStorage.clear();
            history("/");
        }
    };
    useEffect(() => {
        function handleClickOutside(event) {
            if (flag && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setFlag(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [flag]);
    return (
        <>
            <div className=" flex h-full">
                <div className="font-poppins  antialiased  sm:static">
                    {flag ? (
                        <button
                            onClick={() => setFlag(false)}
                            className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
                        >
                            <svg
                                className="w-5 h-5 mr-3  fill-current"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.707 4.293a1 1 0 011.414 0L10 8.586l4.879-4.879a1 1 0 111.414 1.414L11.414 10l4.879 4.879a1 1 0 01-1.414 1.414L10 11.414l-4.879 4.879a1 1 0 01-1.414-1.414L8.586 10 3.707 5.121a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    ) : (
                        <button
                            onClick={() => setFlag(true)}
                            className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500   focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
                        >
                            <svg
                                className="w-5 h-5 mr-3  fill-current"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    )}

                    {flag ? (
                        <div
                            ref={isSmallScreen ? sidebarRef : null}
                            id="sidebar"
                            className={`bg-white  h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out ${
                                isSmallScreen ? "" : "hidden"
                            }`}
                            x-show="sidenav"
                        >
                            <div className="space-y-6 md:space-y-10 mt-10">
                                <h1 className="font-bold text-4xl text-center md:hidden">
                                    {user?.username?.toUpperCase()}
                                    <span className="text-teal-600">.</span>
                                </h1>
                                <h1 className="hidden capitalize md:block font-bold text-sm md:text-xl text-center">
                                    {user?.username}
                                </h1>
                                <div id="profile" className="space-y-3">
                                    <img src={user?.avatar} className="w-10 md:w-16 rounded-full mx-auto" />
                                    <div>
                                        <h2 className="font-medium capitalize text-xs md:text-sm text-center text-teal-500">
                                            {user?.username}
                                        </h2>
                                    </div>
                                </div>

                                <div id="menu" className="flex flex-col space-y-2 ">
                                    <Link
                                        to={"/account"}
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            className="w-6 h-6 mr-3  fill-current inline-block"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                        </svg>
                                        <span className="">Dashboard</span>
                                    </Link>
                                    <Link
                                        to={"/account/blogs"}
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            className="w-6 h-6 mr-3  fill-current inline-block"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path>
                                        </svg>
                                        <span className="">Blogs</span>
                                    </Link>
                                    <Link
                                        to={"/account/accountInfo"}
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            className="w-6 h-6 mr-3  fill-current inline-block"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                            <path
                                                fillRule="evenodd"
                                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="">Account Info</span>
                                    </Link>
                                    <Link
                                        to={"/account/messages"}
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            className="w-6 h-6 mr-3  fill-current inline-block"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                                            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                                        </svg>
                                        <span className="">Messages</span>
                                    </Link>

                                    <Link
                                        to={"/account/newblog"}
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            className="w-6 h-6 mr-3  fill-current inline-block"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <span className="">New Blog</span>
                                    </Link>
                                    <Link
                                        to={"/account/followers"}
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            className="w-6 h-6 mr-3  fill-current inline-block"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                        </svg>
                                        <span className="">Followers</span>
                                    </Link>
                                    <Link
                                        onClick={handleLogout}
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            className=" mr-3 w-6 h-6   fill-current inline-block"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                        >
                                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                                        </svg>
                                        <span className="">Logout</span>
                                    </Link>
                                    <Link
                                        to={"/home"}
                                        className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className=" mr-3 w-6 h-6   fill-current inline-block"
                                            viewBox="0 0 576 512"
                                        >
                                            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                                        </svg>
                                        <span className="">Home</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div className=" w-full h-full    overflow-y-auto">
                    <div className=" px-2 h-screen ">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AuthorLayout;
