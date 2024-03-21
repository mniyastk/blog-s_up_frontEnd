import React, { useState, useEffect } from "react";
const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className="w-8 h-8 border-2 border-black rounded-full absolute flex items-center justify-center  pointer-events-none z-50 transform transition duration-500"
      style={{ top: position.y, left: position.x }}
    >
      {" "}
      <div className=" w-1 h-1 bg-black rounded-full "></div>
    </div>
  );
};

export default Cursor;
