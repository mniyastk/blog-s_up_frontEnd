import React from "react";
import { Typography, Card, CardBody } from "@material-tailwind/react";

const BlogCard = ({ img, title, desc }) => {
  return (
    <Card
      className="relative mb-10 grid min-h-[30rem] items-center justify-center overflow-hidden rounded-xl"
      color="transparent"
    >
      <img
        src={img}
        alt="bg"
        className=" min-h-[40vh] h-full w-full object-cover object-center "
      />
      <CardBody className="relative flex  flex-col justify-">
        <Typography variant="h5" className=" text-lg">
          {title}
        </Typography>
        <Typography className="my-2 text-sm text-gray-500">
          {desc}
        </Typography>
        <button className=" bg-gray-500 rounded-md hover:bg-gray-400 h-9 text-sm">READ MORE</button>
      </CardBody>
    </Card>
  );
};

export default BlogCard;
