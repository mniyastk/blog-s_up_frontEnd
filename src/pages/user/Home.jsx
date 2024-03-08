import React, { useEffect, useState } from "react";

const Home = () => {
  const [topic, setTopic] = useState({});
  const handleClick = (title) => {
    setTopic(title);
    content.forEach((element) => {
      if (element.title === title) {
        setTopic(element);
      }
    });
  };

  useEffect(() => {
    setTopic(content[0]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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
      title: "Android Fragmentation state",
      img: "https://res.cloudinary.com/dunf6rko6/image/upload/v1709719787/1_PAvNFdbeSoWluxfc8CNCDQ_y6oy4m.jpg",
    },
    {
      title: "Android Fragmentation state. Did fix it?",
      img: "https://res.cloudinary.com/dunf6rko6/image/upload/v1708688153/dho7c8iv0o4ns4jza1yp.webp",
    },
  ];
  console.log(topic);
  return (
    <div className=" flex justify-center">
      <div className=" mt-10 bg w-[88%] min-h-screen ">
        <div className=" flex shadow-md w-full h-[75%]">
          <div className=" w-4/6">
            <div
              style={{
                backgroundImage: `url(${topic.img})`,
              }}
              className="h-full bg-cover flex flex-col justify-end p-4 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
              <p className="text-4xl w-5/6 text-white relative z-10">
                {topic.title}
              </p>
            </div>
          </div>
          <div className="  bg-red-400 flex-1">
            {content.map((item,index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleClick(item.title)}
                  className="shadow-lg h-1/4  focus:bg-white focus:shadow-lg focus:border-l-8 focus:border-l-[#0F94F5] bg-gray-100  w-full px-10 text-start"
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
