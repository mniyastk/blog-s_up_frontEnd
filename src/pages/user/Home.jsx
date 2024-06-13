import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Animation from "../../components/Animation";
import { Set } from "immutable";
import LazyLoadedImage from "../../components/LazyLoadedImage";

const Home = () => {
    const [topic, setTopic] = useState({});
    const [category, setCategory] = useState(["For you"]);
    const [selectedTopic, setSelectedTopic] = useState(0);
    const [blogs, setBlogs] = useState([]);
    const [blogCategory, setBlogCategory] = useState("For you");
    const [blogByCategory, setBlogByCategory] = useState([]);
    const location = useLocation();

    useEffect(() => {
        axios
            .get("user/blogs")
            .then((res) => {
                setBlogs(res.data);
                const category = res.data.map((item) => item.category);
                const uniqueArray = Array.from(new Set(category));
                setCategory(uniqueArray);
                uniqueArray.unshift("For you");
            })
            .catch((err) => {
                toast.error("error");
            });
    }, []);

    useEffect(() => {
        axios
            .get(`user/blogs/${blogCategory}`)
            .then((res) => {
                setBlogByCategory(res.data);
            })
            .catch((err) => {
                toast.error("error");
            });
    }, [blogCategory]);

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location.hash]);

    const handleClickDiv = (category) => {
        setBlogCategory(category);
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

    const iconVisibility = () => {
        const tabMenu = document.getElementById("scrollTab");
        const leftBtn = document.getElementById("btnLeft");
        const rightBtn = document.getElementById("btnRight");
        const scrollLeftValue = Math.ceil(tabMenu.scrollLeft);
        const scrollableWidth = tabMenu.scrollWidth - tabMenu.clientWidth;

        leftBtn.style.visibility = scrollLeftValue > 0 ? "visible" : "hidden";
        rightBtn.style.visibility = scrollableWidth === scrollLeftValue ? "hidden" : "visible";
    };

    const handleLeft = () => {
        const tabMenu = document.getElementById("scrollTab");
        // tabMenu.scrollLeft -= 150;
        tabMenu.scroll({
            left: tabMenu.scrollLeft - 150,
            behavior: "smooth",
        });
        iconVisibility();
    };
    const handleRight = () => {
        const tabMenu = document.getElementById("scrollTab");
        // tabMenu.scrollLeft += 150;
        tabMenu.scroll({
            left: tabMenu.scrollLeft + 150,
            behavior: "smooth",
        });
        iconVisibility();
    };

    return (
        <Animation>
            <div className=" flex  flex-col items-center justify-center px-[10px] sm:px-[10px] font-Sohnia">
                <div className=" md:mt-10 w-[88%]  ">
                    <div className="   border-none  sm:w-full sm:h-[70vh] 2xl:h-[80vh] hidden md:flex rounded-2xl">
                        <div className=" w-4/6 shadow-lg   hidden md:block  rounded-2xl ">
                            <div
                                style={{
                                    backgroundImage: `url(${topic?.image})`,
                                }}
                                className="h-full hidden  md:block  bg-cover  p-4 relative rounded-tl-2xl rounded-bl-2xl "
                            >
                                <div className="absolute shadow-lg  inset-0 bg-gradient-to-t from-black to-transparent rounded-bl-2xl"></div>

                                <div className=" flex flex-col justify-end h-full cursor-pointer">
                                    <Link to={`/home/blog/${topic?._id}`}>
                                        <p className=" sm:text-4xl hover:text-red-100    text-white relative z-10">
                                            {topic?.title}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="relative sm:static flex-1 ">
                            {blogs?.slice(0, 4).map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        onClick={() => handleClickTopic(item.title, index)}
                                        className={`shadow-lg h-1/4 text-xl w-full overflow-hidden rounded-2xl py-5 cursor-pointer flex  items-center    ${
                                            selectedTopic === index
                                                ? "border-l-4 sm:border-l-8 border-[#0F94F5] bg-white"
                                                : "bg-gray-200  "
                                        } `}
                                    >
                                        <div className=" md:hidden max-w-20">
                                            <img className=" h-full" src={item.image} alt="" />
                                        </div>
                                        <div className=" mx-3">
                                            <p className=" text-xs md:text-xl  hover:text-blue-gray-500   font-bold  ">
                                                {item.title}
                                            </p>
                                            <p className=" line-clamp-2 text-sm">{item.content}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="  mt-10    flex space-x-4 " id="scrollElement">
                        <div className="  sm:w-2/3 w-full  relative ">
                            <div className=" absolute w-full  flex justify-between ">
                                <div
                                    id="btnLeft"
                                    className={` border invisible select-none rounded-full hover:cursor-pointer bg-white w-[35px] h-[35px] p-[10px] backdrop-blur-2xl  z-10  max-sm:left-0 `}
                                    onClick={handleLeft}
                                >
                                    <img
                                        className=" "
                                        src="https://res.cloudinary.com/dunf6rko6/image/upload/v1710829474/left-arrow_1_oqixxp.svg"
                                        alt="leftArrow"
                                    />
                                </div>{" "}
                                <div
                                    id="btnRight"
                                    className=" select-none  border bg-white  rounded-full hover:cursor-pointer  bg-transparent w-[35px] h-[35px] p-[10px] backdrop-blur-3xl z-10 max-sm:right-0 "
                                    onClick={handleRight}
                                >
                                    <img
                                        src="https://res.cloudinary.com/dunf6rko6/image/upload/v1710829474/right-arrow_3_xb7i1y.svg"
                                        alt="rightArrow"
                                    />
                                </div>
                            </div>
                            <div
                                id="scrollTab"
                                className="flex select-none     space-x-10 pt-2 sm:w-full  border-gray-200 overflow-x-auto "
                                style={{
                                    transform: `translate(0)`,
                                }}
                            >
                                {category.map((category, index) => (
                                    <div
                                        key={index}
                                        className={`  min-w-fit cursor-pointer  ${
                                            blogCategory === category ? "border-b border-black pb-4" : "none"
                                        }`}
                                        onClick={() => handleClickDiv(category)}
                                    >
                                        <p className=" capitalize font-bold text-sm sm:text-[14px] ">{category}</p>
                                    </div>
                                ))}
                            </div>
                            <div className=" lazy-container max-h-[1550px] overflow-y-auto" id="categoryDiv">
                                {blogByCategory && blogCategory !== "For you"
                                    ? blogByCategory.map((item, index) => {
                                          return (
                                              <div key={index} className="  mt-5  relative z-40 mb-8">
                                                  <div className=" flex space-x-3 md:mb-1 items-center">
                                                      <div className=" rounded-full w-6 h-6  bg-cover overflow-hidden">
                                                          <img src={item?.author?.avatar} alt="blog" />
                                                      </div>
                                                      <p className=" text-sm sm:text-l font-Sohnia ">
                                                          {item?.author?.username}
                                                      </p>
                                                      <p className=" text-gray-500 text-sm md:text-l font-Sohnia">
                                                          {new Date(item.createdAt).toDateString().slice(4)}
                                                      </p>
                                                  </div>
                                                  <Link to={`/home/blog/${item._id}`}>
                                                      <div className="flex overflow-hidden justify-between">
                                                          <div className=" w-3/4    flex flex-col justify-evenly">
                                                              <p className="  text-md sm:text-[20px] mb-2 font-Sohnia font-bold">
                                                                  {item.title}
                                                              </p>
                                                              <p className=" w-full hidden md:block text-[16px] font-Georgia max-h-12  overflow-hidden">
                                                                  {item.content}
                                                              </p>
                                                          </div>
                                                          <div className=" w-1/4 ml-1 h-full sm:h-32 ">
                                                              <LazyLoadedImage
                                                                  h={"h-full"}
                                                                  w={"w-full"}
                                                                  src={item.image}
                                                                  alt={"blog"}
                                                              />
                                                          </div>
                                                      </div>
                                                  </Link>
                                                  <hr className=" mt-5" />
                                              </div>
                                          );
                                      })
                                    : blogs.map((item, index) => {
                                          return (
                                              <div key={index} className="  mt-5  relative z-40 mb-8">
                                                  <div className=" flex space-x-3 md:mb-1 items-center">
                                                      <div className=" rounded-full w-6 h-6  bg-cover overflow-hidden">
                                                          <img src={item?.author?.avatar} alt="avatar" />
                                                      </div>
                                                      <p className=" text-sm sm:text-l font-Sohnia ">
                                                          {item?.author?.username}
                                                      </p>
                                                      <p className=" text-gray-500 text-sm md:text-l font-Sohnia">
                                                          {new Date(item.createdAt).toDateString().slice(4)}
                                                      </p>
                                                  </div>
                                                  <Link to={`/home/blog/${item._id}`}>
                                                      <div className="flex overflow-hidden justify-between">
                                                          <div className=" w-3/4    flex flex-col justify-evenly">
                                                              <p className="  text-md sm:text-[20px] mb-2 font-Sohnia font-bold">
                                                                  {item.title}
                                                              </p>
                                                              <p className=" w-full hidden md:block text-[16px] font-Georgia max-h-12  overflow-hidden">
                                                                  {item.content}
                                                              </p>
                                                          </div>
                                                          <div className=" w-1/4 ml-1 h-full sm:h-32 ">
                                                              <LazyLoadedImage
                                                                  h={"h-full"}
                                                                  w={"w-full"}
                                                                  src={item.image}
                                                                  alt={"blog"}
                                                              />
                                                          </div>
                                                      </div>
                                                  </Link>
                                                  <hr className=" mt-5" />
                                              </div>
                                          );
                                      })}
                            </div>
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
                                {blogs
                                    .sort((a, b) => new Date(b.created) - new Date(a.created))
                                    .map((item, index) => {
                                        return (
                                            <div key={index} className=" mb-5  pl-3 flex w-full h-full font-Sohnia">
                                                <div className=" w-2/3">
                                                    <div className=" flex space-x-3">
                                                        <div className=" rounded-full w-6 h-6  bg-cover  overflow-hidden">
                                                            <img src={item?.author?.avatar} alt="" />
                                                        </div>
                                                        <p className=" text-sm">{item?.author?.username}</p>
                                                    </div>
                                                    <Link to={`/home/blog/${item._id}`}>
                                                        <p className=" text-md font-bold ">{item.title}</p>
                                                    </Link>
                                                </div>

                                                <div className=" w-1/3 h-full sm:h-20 ">
                                                    <Link to={`/home/blog/${item._id}`}>
                                                        <LazyLoadedImage
                                                            h={"h-full"}
                                                            w={"w-full"}
                                                            src={item.image}
                                                            alt={"recent"}
                                                        />
                                                    </Link>
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
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Technology</div>
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Web development</div>
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Sports</div>
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Travel</div>
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Technology</div>
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Gaming</div>
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Sports</div>
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Web development</div>
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Travel</div>
                                    <div className="bg-gray-200 rounded-full px-3 py-2  ">Gaming</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Animation>
    );
};

export default Home;
