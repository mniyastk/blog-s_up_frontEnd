import React from "react";
import { Link } from "react-router-dom";

function BlogCatogories() {
  return (
    <div className=" px-[60px]">
      <div className="  flex justify-between items-center mt-1 pb-3 border-b-2  border-b-gray-300">
        <div className=" flex justify-between items-center">
          <img
            className=" w-[100px] h-[50px]"
            src="https://res.cloudinary.com/dunf6rko6/image/upload/v1708602018/b_zdbtfu.svg"
            alt="Logo"
          />
          <span>Blog'sUp</span>
        </div>
        <div>
          <ul className=" flex justify-between ">
            <li>
              <Link to={"/login"} className=" mr-5">
                Write
              </Link>
            </li>
            <li>
              <Link
                to={"/register"}
                className=" mr-5 bg-[#1A8917] px-5 py-2 rounded-2xl text-white"
              >
                Sign up
              </Link>
            </li>
            <li>
              <Link to={"/login"} className=" mr-5">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=" text-center mt-6">
        <h2 className=" text-[30px] font-semibold">Explore Topics</h2>
      </div>
    </div>
  );
}

export default BlogCatogories;
