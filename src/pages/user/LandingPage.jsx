import React, { useState } from "react";
import { Link } from "react-router-dom";
import pic from "../../Assets/Images/Ellipse 2trending-img.png";
import pic2 from "../../Assets/Images/0_FEP16gXObxcHgiVz.jpg";
import pic3 from "../../Assets/Icons/save-instagram.png";

function LandingPage() {
  const [toggle, setToggle] = useState(false);
  const handleMenu = () => {
    setToggle(!toggle);
  };
  return (
    <div className=" ">
      <div className=" bg-[#FFC017] sm:bg-[#FF00A8] border-b-[2px]  border-b-[#000]">
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
              <Link className=" text-[20px] font-medium  ">Write</Link>
              <Link className=" text-[20px] ml-5">Sign in</Link>
              <Link className=" text-[20px] ml-5 px-5 py-3 bg-black rounded-3xl text-white ">
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
          <div className="   w-full sm:block   sm:mt-[100px] flex flex-col justify-center items-center content-center  mt-[30px]">
            <h3 className=" text-[50px] font-bold sm:text-8xl  ">
              Stay Curious.
            </h3>
            <div className=" sm:text-left sm:max-w-[450px]  text-center">
              <span className="  text-2xl font-semibold ">
                Discover stories, thinking, and expertise from writers on any
                topic
              </span>
            </div>

            <div className="   ">
              <button className=" text-[20px] flex justify-center   px-7 py-3 bg-black hover:bg-[#413535] rounded-3xl mt-6 text-white ">
                Start reading
              </button>
            </div>
          </div>
        </section>
      </div>
      <div className=" border-b-[1px] border-b-[#000]">
        <div className=" sm:px-[80px] px-[40px] my-12 h-auto  font-serif">
          <h4 className=" text-[30px] font-medium">Trending</h4>
          <div className=" mt-10 sm:flex  justify-between flex-wrap w-full ">
            <div className=" sm:w-[30%] mr-5 mb-8 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className="  font-semibold ">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="sm:w-[30%] mr-5 mb-8 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="sm:w-[30%] mr-5 mb-8 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="sm:w-[30%] mr-5 mb-8 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="sm:w-[30%] mr-5 mb-8 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="sm:w-[30%] mr-5 mb-8 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[40px]   mb-5 sm:px-[80px] w-full  ">
        <div className="   ">
          <div className=" mt-5 mb-5    ">
            <div className="   font-semibold">Discover More...</div>
            <div className=" md:hidden    mt-4 ">
              <div className=" flex justify-around flex-wrap cursor-pointer">
                <div className=" px-4 py-1 mb-2  mr-2  bg-[#F2F2F2] rounded-2xl">
                  Programming
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Maths
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Self Improvment
                </div>
                <div className=" px-4 py-1   mb-2  mr-2  bg-[#F2F2F2] rounded-2xl">
                  Politics
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Science
                </div>
                <div className=" px-4 py-1 mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Programming
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Maths
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Self Improvment
                </div>
                <div className=" px-4 py-1 mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Programming
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Maths
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Self Improvment
                </div>
              </div>
              <div className=" text-green-400 cursor-pointer inline-block">
                See more topics
              </div>
            </div>
          </div>
          <div className=" ">
            <div className="flex  justify-between mb-5">
              <div className="  ">
                <div className="flex items-center   ">
                  <img src={pic} alt="pic" />
                  <div className=" ml-3">Dware Obassajo</div>
                </div>
                <p className="  font-semibold truncate max-w-[180px] mt-2 mb-2 ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                </p>
                <div className=" flex justify-between ">
                  <span>Feb 28, 2021</span>
                  <img src={pic3} alt="pic3" />
                </div>
              </div>
              <div className=" ml-3 ">
                <img src={pic2} alt="pic2" />
              </div>
            </div>
            <div className="flex  justify-between mb-5">
              <div className="  ">
                <div className="flex items-center   ">
                  <img src={pic} alt="pic" />
                  <div className=" ml-3">Dware Obassajo</div>
                </div>
                <p className="  font-semibold truncate max-w-[180px] mt-2 mb-2 ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.{" "}
                </p>
                <div className=" flex justify-between ">
                  <span>Feb 28, 2021</span>
                  <img src={pic3} alt="pic3" />
                </div>
              </div>
              <div className=" ml-3 ">
                <img src={pic2} alt="pic2" />
              </div>
            </div>
            <div className="hidden md:block    mt-4 ">
              <div className=" flex justify-around flex-wrap cursor-pointer">
                <div className=" px-4 py-1 mb-2  mr-2  bg-[#F2F2F2] rounded-2xl">
                  Programming
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Maths
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Self Improvment
                </div>
                <div className=" px-4 py-1   mb-2  mr-2  bg-[#F2F2F2] rounded-2xl">
                  Politics
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Science
                </div>
                <div className=" px-4 py-1 mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Programming
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Maths
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Self Improvment
                </div>
                <div className=" px-4 py-1 mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Programming
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Maths
                </div>
                <div className=" px-4 py-1  mb-2  mr-2   bg-[#F2F2F2] rounded-2xl">
                  Self Improvment
                </div>
              </div>
              <div className=" text-green-400 cursor-pointer inline-block">
                See more topics
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
