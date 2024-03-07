import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className="bg-[#FF00A8]">
        <header className=" h-[100px] flex items-center  border-b-[2px] border-b-[#000]  ">
          <div className=" flex w-full justify-between  px-[80px] items-center content-center">
            <div>
              <span className=" text-[40px] font-bold">Blog'sUp</span>
            </div>
            <div>
              <Link className=" text-[20px] font-medium hover:text-red-500">
                Write
              </Link>
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
    </div>
  );
}

export default LandingPage;
