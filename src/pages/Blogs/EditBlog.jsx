import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function EditBlog({ blog }) {
  const [formValues, setformValues] = useState({
    title: blog?.title,
    category: blog?.category,
    tags: blog?.tags.map((i) => i),
    image: blog?.image,
    content: blog?.content,
  });

  const id = blog._id;
  const [setSelectedFile] = useState(null);
  const changeFile = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    formValues.image = file.name;
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };
  const validate = (values) => {
    const error = {};
    if (!values.title || !values.tags || !values.category) {
      toast.error("Please enter empty fields");
      error.one = "Please enter empty fields";
    } else if (!values.image) {
      toast.error("Please add image");
      error.two = '"Please enter empty fields"';
    }
    return error;
  };

  const handlePost = () => {
    const check = validate(formValues);

    if (Object.keys(check).length === 0) {
      const loading = toast.loading("Posting...");
      axios
        .put(`author/update/${id}`, formValues)
        .then((res) => {
          console.log(res.data);

          toast.dismiss(loading);
          toast.success("updated Successfully...😍");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          toast.dismiss(loading);
          toast.error("Something went wrong...😥");
        });
    }
  };

  return (
    <>
      <div className="bg-white w-[100%] shadow p-4 py-8">
        <div className="heading text-center font-bold text-2xl m-5 text-gray-800 bg-white">
          Update Post
        </div>
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            onChange={(e) => handleOnchange(e)}
            placeholder="Title"
            name="title"
            value={formValues.title}
            type="text"
          />
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            onChange={(e) => handleOnchange(e)}
            name="category"
            value={formValues.category}
            placeholder="Category"
            type="text"
          />
          <input
            className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            spellCheck="false"
            onChange={(e) => handleOnchange(e)}
            placeholder="Tags"
            name="tags"
            value={formValues.tags}
            type="text"
          />

          <div className=" mb-2 ">
            <label className=" flex flex-col items-center px-2 py-1 bg-gray-100 text-blue rounded-lg  tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-green-500">
              <svg
                className="w-8 h-8"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span className="mt-2 text-base leading-normal">
                {formValues.image}
              </span>
              <input type="file" className="hidden" onChange={changeFile} />
            </label>
          </div>
          <textarea
            value={formValues.content}
            name="content"
            onChange={(e) => handleOnchange(e)}
            id="content"
            placeholder="Describe your content"
            cols="20"
            rows="5"
          ></textarea>

          <div className="buttons pt-3 flex justify-between">
            <div
              onClick={handlePost}
              className="btn   rounded-md border  p-1 px-4 font-semibold cursor-pointer hover:bg-gray-500 text-gray-200 ml-2 bg-green-500"
            >
              Post
            </div>
            <div onClick={()=>window.location.reload()} className="btn border rounded-md  p-1 px-4 font-semibold cursor-pointer hover:bg-gray-500 text-gray-200 ml-2 bg-red-500">
              Cancel
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBlog;
