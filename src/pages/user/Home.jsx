import React, { useEffect, useState } from "react";

const Home = () => {
  const [topic, setTopic] = useState({});
  const [selectedDiv, setSelectedDiv] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState(0);

  const handleClickDiv = (index) => {
    setSelectedDiv(index);
  };

  const handleClickTopic = (title, index) => {
    setSelectedTopic(index);
    content.forEach((element) => {
      if (element.title === title) {
        setTopic(element);
      }
    });
  };

  useEffect(() => {
    setTopic(content[0]);
  }, []);

  const content = [
    {
      title: "Android Fragmentation state.  Google fix it?",
      img: "https://res.cloudinary.com/dunf6rko6/image/upload/v1709719787/1_fsDA8PjcIgubaadRbg0gLQ_empomv.png",
    },
    {
      title: "Querying a network of knowledge knowledge",
      img: "https://res.cloudinary.com/dunf6rko6/image/upload/v1709719787/1_laK-KCPGdxkkypNWjgUHrw_cufk96.jpg",
    },
    {
      title: "Android Fragmentation state sfjlsjfls",
      img: "https://res.cloudinary.com/dunf6rko6/image/upload/v1709719787/1_PAvNFdbeSoWluxfc8CNCDQ_y6oy4m.jpg",
    },
    {
      title: "Android Fragmentation state. Did fix it?",
      img: "https://res.cloudinary.com/dunf6rko6/image/upload/v1708688153/dho7c8iv0o4ns4jza1yp.webp",
    },
  ];
  console.log(topic);
  return (
    <div className=" flex flex-col items-center justify-center px-[10px] sm:px-[80px]">
      <div className=" mt-10 w-[88%] min-h-[3000px]  ">
        <div className=" flex shadow-md h-48  sm:w-full sm:h-[75%]">
          <div className=" w-4/6 bg-green-300 hidden md:block">
            <div
              style={{
                backgroundImage: `url(${topic.img})`,
              }}
              className="h-full hidden bg-green-300  md:block  sm:bg-cover  p-4 relative"
            >
              <div className="absolute  inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <p className=" sm:text-4xl flex flex-col h-full justify-end w-5/6 text-white relative z-10">
                {topic.title}
              </p>
            </div>
          </div>
          <div className="relative sm:static flex-1">
            {content.map((item, index) => {
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
                    <img className=" h-full" src={item.img} alt="" />
                  </div>
                  <p className=" text-xs md:text-xl ml-2  font-extrabold  ">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="  mt-10  flex space-x-4 ">
          <div className="sm:w-2/3 relative">
            <div className="flex space-x-4 text-center border-b border-gray-400">
              {[0, 1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className={`w-1/3 cursor-pointer ${
                    selectedDiv === index ? "border-b-2 border-black " : ""
                  }`}
                  onClick={() => handleClickDiv(index)}
                >
                  <p className=" font-bold text-[5px] sm:text-lg ">For you</p>
                </div>
              ))}
            </div>
            <div className="  mt-4 flex relative z-40 bg-red-400">
              <div className=" w-1/3 h-full sm:h-32 bg-red-300">
                <img
                  className=" h-full "
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1708688153/dho7c8iv0o4ns4jza1yp.webp"
                  alt=""
                />
              </div>
              <div className=" w-2/3  px-3  flex flex-col justify-evenly">
                
                <p className=" text-md sm:text-2xl">
                  Querying a network of knowledge knowledge
                </p>
              </div>
            </div>
            <div className="  mt-4 flex relative z-40 bg-red-400">
              <div className=" w-1/3 h-full sm:h-32 bg-red-300">
                <img
                  className=" h-full "
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1708688153/dho7c8iv0o4ns4jza1yp.webp"
                  alt=""
                />
              </div>
              <div className=" w-2/3  px-3  flex flex-col justify-evenly">
                <p className=" text-[5px] sm:text-2xl">Devon Price</p>
                <p className=" text-[5px] sm:text-2xl">
                  Querying a network of knowledge knowledge
                </p>

                <p className=" text-[12px] sm:text-sm text-gray-400 font-bold">
                  March 11, 2024
                </p>
              </div>
            </div>
            <div className="  mt-4 flex relative z-40 bg-red-400">
              <div className=" w-1/3 h-full sm:h-32 bg-red-300">
                <img
                  className=" h-full "
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1708688153/dho7c8iv0o4ns4jza1yp.webp"
                  alt=""
                />
              </div>
              <div className=" w-2/3  px-3  flex flex-col justify-evenly">
                <p className="   text-[5px] sm:text-2xl">
                  Querying a network of knowledge knowledge
                </p>

                <p className=" text-[12px] sm:text-sm text-gray-400 font-bold">
                  March 11, 2024
                </p>
              </div>
            </div>
          </div>
          {/* <div className=" hidden md:block w-1/3 bg-yellow-300">fsjklkjs</div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
