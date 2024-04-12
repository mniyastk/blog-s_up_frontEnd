import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import pic3 from "../../Assets/Icons/save-instagram.png";
import axios from "axios";
import { toast } from "react-toastify";

function LandingPage() {
  const [blogData, setBlogData] = useState([]);
  const [category, setCategory] = useState([]);
  const [toggle, setToggle] = useState(false);
  const handleMenu = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    axios
      .get("user/blogs")
      .then((data) => setBlogData(data.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("user/blogs")
      .then((res) => {
        const category = res.data.map((item) => item.category);
        setCategory(category);
      })
      .catch((err) => {
        toast.error("error");
      });
  }, []);

  return (
    <div className=" ">
      <div className=" bg-[#ffc017] bg-gradient-to-br from-pink-300 via-transparent to-transparent border-b-[2px]  border-b-[#000]">
        <header className="   h-[110px] flex items-center  border-b-[2px] border-b-[#000]  ">
          <div className=" flex w-full justify-between px-[40px]  sm:px-[80px] items-center content-center">
            <div>
              <span className="hidden sm:block text-[40px] font-bold cursor-pointer">
                Blog'sUp
              </span>
              <img
                className="sm:hidden cursor-pointer  w-[50px] h-[50px]"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1708602018/b_zdbtfu.svg"
                alt="Logo"
              />
            </div>
            <div className="  sm:hidden">
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                onClick={handleMenu}
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
            </div>

            <div className={`hidden sm:block  `}>
              <Link to={"/login"} className=" text-[20px] font-medium  ">
                Write
              </Link>
              <Link to={"/login"} className=" text-[20px] ml-5">
                Sign in
              </Link>
              <Link
                to={"/login"}
                className=" text-[20px] ml-5 px-5 py-3 bg-black rounded-3xl text-white "
              >
                Get started
              </Link>
            </div>
          </div>
        </header>
        <div
          className={`${
            toggle ? "block text-center mt-3 " : "hidden"
          }  sm:hidden `}
        >
          <Link className=" text-[20px] font-medium  ">Write</Link>
          <Link className=" text-[20px] ml-5">Sign in</Link>
          <Link className=" text-[20px] ml-5     px-5 py-1 bg-black rounded-2xl text-white ">
            Get started
          </Link>
        </div>
        <section className=" sm:h-[550px] h-[400px] sm:px-[80px] px-[40px]">
          <div className="   w-full sm:block   sm:mt-[100px] flex flex-col    mt-[30px]">
            <h3 className=" text-[50px] font-bold sm:text-8xl  ">
              Stay Curious.
            </h3>
            <div className=" sm:text-left sm:max-w-[450px] sm:mt-3">
              <span className="  text-2xl font-semibold ">
                Discover stories, thinking, and expertise from writers on any
                topic
              </span>
            </div>

            <div className="   ">
              <button className=" text-[20px] flex justify-center   px-7 py-3 bg-black hover:bg-[#413535] rounded-3xl mt-6 text-white ">
                <Link to={"/login"}>Start reading</Link>
              </button>
            </div>
          </div>
        </section>
      </div>
      <div className=" border-b-[1px] border-b-[#000]">
        <div className=" sm:px-[80px] px-[40px] my-12 h-auto   ">
          <h4 className=" text-[30px] font-medium">Trending</h4>
          <div className=" mt-10 sm:flex  justify-between flex-wrap w-full ">
            {blogData?.slice(0, 6).map((data) => {
              return (
                <div key={data._id} className=" sm:w-[30%] mr-5 mb-8 ">
                  <div className="flex items-center">
                    <img
                      className=" h-[35px] w-[35px] rounded-full"
                      src={data.image}
                      alt="trending images"
                    />
                    <span className=" ml-4">{data.title}</span>
                  </div>
                  <p className="   font-semibold line-clamp-3   ">
                    <Link to={`/home/blog/${data?._id}`}> {data.content}</Link>
                  </p>
                  <span className=" text-gray-700">
                    {new Date(data?.createdAt).toDateString().slice(4)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="px-[40px]   mb-5 sm:px-[80px] w-full  ">
        <div className="    ">
          <div className=" mt-5 mb-5    ">
            <div className="   font-semibold">Discover More...</div>
            <div className=" md:hidden     mt-4 ">
              <div className=" flex justify-around flex-wrap cursor-pointer">
                {category?.slice(0, 8).map((item, index) => {
                  return (
                    <div key={index}>
                    <div className=" px-4 py-1 mb-2  mr-2  bg-[#F2F2F2] rounded-2xl">
                      {item}
                    </div>
                    </div>
                  );
                })}
              </div>
              <div className=" text-green-400 cursor-pointer inline-block">
                <Link >See more topics</Link>
              </div>
            </div>
          </div>
          <div className="sm:flex  sm:justify-between ">
            <div className="sm:flex sm:justify-between sm:flex-wrap sm:w-full">
              {blogData.slice(0, 5).map((data) => {
                return (
                  <div
                    key={data._id}
                    className="flex sm:w-full   sm:mr-5  justify-between mb-5"
                  >
                    <div className="sm:w-full  ">
                      <Link to={`/home/blog/${data?._id}`}>
                        <div className="flex items-center   ">
                          <img
                            className=" h-[35px] w-[35px] rounded-full"
                            src={data.image}
                            alt="trending images"
                          />
                          <div className=" ml-3">{data.category}</div>
                        </div>
                        <p className=" w-full    font-semibold line-clamp-2 sm:line-clamp-3 sm:max-w-[380px]   max-w-[180px]  mt-2 mb-2 ">
                          {data.content}
                        </p>
                        <div className=" flex justify-between ">
                          <span>
                            {new Date(data?.createdAt).toDateString().slice(4)}
                          </span>
                          <img src={pic3} alt="pic3" />
                        </div>
                      </Link>
                    </div>
                    <div className=" w-[200px] ml-3 ">
                      <img src={data.image} alt="pic2" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="hidden md:block sm:pl-6    mt-4 ">
              <div className=" flex justify-around flex-wrap cursor-pointer">
                {category?.slice(0, 8).map((item, index) => {
                  return (
                    <div key={index}>
                      <div className=" px-4 py-1 mb-2  mr-2  bg-[#F2F2F2] rounded-2xl">
                        {item}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className=" text-green-400 cursor-pointer inline-block">
                <Link to={"/category"}>See more topics</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
