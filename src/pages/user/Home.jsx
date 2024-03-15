import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [topic, setTopic] = useState({});
  const [selectedDiv, setSelectedDiv] = useState("For you");
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [blogs, setBlogs] = useState([]);

  const location = useLocation();

  useEffect(() => {
    axios
      .get("user/blogs")
      .then((res) => {
        setBlogs(res.data);
        
      })
      .catch((err) => {
         
      });
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.hash]);
  const handleClickDiv = (index) => {
    setSelectedDiv(index);
  };

  const handleClickTopic = (title, index) => {
    setSelectedTopic(index);
    blogs.forEach((element) => {
      if (element.title === title) {
        setTopic(element);
      }
    });
  };

  useEffect(() => {
    setTopic(blogs[0]);
  }, [blogs]);

  return (
    <div className=" flex flex-col items-center justify-center px-[10px] sm:px-[10px] font-Sohnia">
      <div className=" md:mt-10 w-[88%]   ">
        <div className="  shadow-md  sm:w-full sm:h-[70vh] 2xl:h-[80vh] hidden md:flex">
          <div className=" w-4/6   hidden md:block">
            <div
              style={{
                backgroundImage: `url(${topic?.image})`,
              }}
              className="h-full hidden  md:block  bg-cover  p-4 relative"
            >
              <div className="absolute  inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <Link to={`/home/blog/${topic?._id}`}>
                <p className=" sm:text-4xl hover:text-red-100 flex flex-col h-full justify-end w-5/6 text-white relative z-10">
                  {topic?.title}
                </p>
              </Link>
            </div>
          </div>
          <div className="relative sm:static flex-1 ">
            {blogs?.slice(0, 4).map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => handleClickTopic(item.title, index)}
                  className={`shadow-lg h-1/4 text-xl w-full overflow-hidden py-5 cursor-pointer flex  items-center    ${
                    selectedTopic === index
                      ? "border-l-4 sm:border-l-8 border-[#0F94F5] bg-white"
                      : "bg-gray-200  "
                  } `}
                >
                  <div className=" md:hidden max-w-20">
                    <img className=" h-full" src={item.image} alt="" />
                  </div>
                  <p className=" text-xs md:text-xl mx-3 hover:text-blue-gray-500   font-bold  ">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="  mt-10  flex space-x-4 " id="scrollElement">
          <div className="md:w-2/3 relative">
            <div className="flex space-x-10 overflow-hidden border-b pt-2  mb-8 border-gray-200 ">
              {["For you", "Technology", "Software", "Travel"].map((index) => (
                <div
                  key={index}
                  className={` cursor-pointer min-w-fit ${
                    selectedDiv === index ? "border-b border-black pb-4" : ""
                  }`}
                  onClick={() => handleClickDiv(index)}
                >
                  <p className=" font-bold text-sm sm:text-[14px] ">{index}</p>
                </div>
              ))}
            </div>
            {blogs.map((item, index) => {
              return (
                <div key={index} className="  mt-5  relative z-40 mb-8">
                  <div className=" flex space-x-3 md:mb-1">
                    <div
                      className=" rounded-full w-6 h-6  bg-cover "
                      style={{
                        backgroundImage:
                          "url(https://res.cloudinary.com/dunf6rko6/image/upload/v1708688153/dho7c8iv0o4ns4jza1yp.webp)",
                      }}
                    ></div>
                    <p className=" text-sm sm:text-l font-Sohnia ">Bijeesh M</p>
                    <p className=" text-gray-500 text-sm md:text-l font-Sohnia">
                      Mar 7, 2024
                    </p>
                  </div>
                  <div className="flex overflow-hidden justify-between">
                    <div className=" w-3/4    flex flex-col justify-evenly">
                      <p className="  text-md sm:text-[20px] mb-2 font-Sohnia font-bold">
                        {item.title}
                      </p>
                      <p className=" w-full hidden md:block text-[16px] font-Georgia max-h-12  overflow-hidden">
                        {item.content}
                      </p>
                    </div>
                    <div className=" w-1/4 ml-1 h-full sm:h-32 bg-red-300">
                      <img
                        className=" h-full w-full "
                        src={item.image}
                        alt="topic"
                      />
                    </div>
                  </div>
                  <hr className=" mt-5" />
                </div>
              );
            })}
          </div>
          <div className=" hidden md:block w-1/3 ">
            <div className="flex items-center font-bold text-sm sm:text-lg  ">
              <div>
                <p className="mr-2">RECENT POSTS </p>
              </div>
              <div className="flex-1">
                <hr className="border-gray-400" />
              </div>
            </div>
            <div className=" mt-5 w-full">
              {[1, 2, 3, 4, 5, 6].map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" mb-5  pl-3 flex w-full h-full font-Sohnia"
                  >
                    <div className=" w-2/3">
                      <div className=" flex space-x-3">
                        <div
                          className=" rounded-full w-6 h-6  bg-cover "
                          style={{
                            backgroundImage:
                              "url(https://res.cloudinary.com/dunf6rko6/image/upload/v1708688153/dho7c8iv0o4ns4jza1yp.webp)",
                          }}
                        ></div>
                        <p className=" text-sm">Bijeesh M</p>
                      </div>
                      <p className=" text-md font-bold ">
                        Querying a network of knowledge
                      </p>
                    </div>
                    <div className=" w-1/3 ">
                      <img
                        className=" "
                        src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719787/1_E3kONRxJ8hFC3qowDOWUXg_cgstjz.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className=" mt-10 pl-3">
              <div>
                <p className=" font-bold">RECOMMENDED TOPIC</p>
              </div>
              <div className=" flex flex-wrap mt-3  justify-start gap-2">
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Technology
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Web development
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Sports
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Travel
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Technology
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Gaming
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Sports
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Web development
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Travel
                </div>
                <div className="bg-gray-200 rounded-full px-3 py-2  ">
                  Gaming
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
