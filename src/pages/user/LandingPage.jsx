import React from "react";
import { Link } from "react-router-dom";
import pic from "../../Assets/Images/Ellipse 2trending-img.png";
import pic2 from "../../Assets/Images/Screenshot 2024-02-29 162345 1.png";
import pic3 from "../../Assets/Icons/save-instagram.png";

function LandingPage() {
  return (
    <div className=" ">
      <div className="bg-[#FF00A8] border-b-[2px] border-b-[#000]">
        <header className=" h-[110px] flex items-center  border-b-[2px] border-b-[#000]  ">
          <div className=" flex w-full justify-between  px-[80px] items-center content-center">
            <div>
              <span className=" text-[40px] font-bold cursor-pointer">
                Blog'sUp
              </span>
            </div>
            <div>
              <Link className=" text-[20px] font-medium  ">Write</Link>
              <Link className=" text-[20px] ml-5">Sign in</Link>
              <Link className=" text-[20px] ml-5 px-5 py-3 bg-black rounded-3xl text-white ">
                Get started
              </Link>
            </div>
          </div>
        </header>
        <section className=" h-[550px] px-[80px] ">
          <div className="mt-[100px]">
            <h3 className=" font-bold text-8xl">Stay Curious.</h3>
            <span className=" text-2xl font-semibold ">
              Discover stories, thinking, and expertise <br /> from writers on
              any topic
            </span>
            <br />
            <button className="  text-[20px]   px-7 py-3 bg-black hover:bg-[#413535] rounded-3xl mt-6 text-white ">
              Start reading
            </button>
          </div>
        </section>
      </div>
      <div className=" border-b-[1px] border-b-[#000]">
        <div className=" px-[80px] my-12 h-auto  font-serif">
          <h4 className=" text-[30px] font-medium">Trending</h4>
          <div className=" mt-10 flex justify-between flex-wrap w-full ">
            <div className=" w-[30%] mr-5 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold ">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="w-[30%] mr-5 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="w-[30%] mr-5 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="w-[30%] mr-5 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="w-[30%] mr-5 ">
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span className=" text-gray-700">Feb 28, 2024</span>
            </div>
            <div className="w-[30%] mr-5 ">
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
      <div className=" px-[80px] ">
        <div className=" flex justify-between mt-11">
          <div className="  mr-5 flex justify-between    ">
            <div>
              <div className="flex items-center">
                <img src={pic} alt="trending images" />
                <span className=" ml-4">Admiral Cloudberg</span>
              </div>
              <p className=" font-semibold">
                Querying a network of knowledge with llama-index-networks
              </p>
              <span>A fringe-dweller's story about making </span> <br />
              <div className=" flex justify-between">
                <span className=" text-gray-700">Feb 28, 2024</span>
                <img src={pic3} alt="pic3" />
              </div>
            </div>
            <div className=" ml-4">
              <img className=" w-[150px] h-[100px]" src={pic2} alt="pic2" />
            </div>
          </div>

          <div>
            <div>
              Discover More
            </div>
            <div className=" bg-[#F3F4F6] px-5 py-2 rounded-3xl ">Programming</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
