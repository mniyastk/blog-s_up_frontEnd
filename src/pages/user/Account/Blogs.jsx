import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import EditBlog from "../../Blogs/EditBlog";

function Blogs() {
    const [blogData, setBlogData] = useState([]);
    const user = useSelector((state) => state.user.user);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [isDelete, setisDelete] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editBlogData, setEditBlogData] = useState({});

    // const user?._id = user?._id;
    // console.log(typeof user?._id);

    useEffect(() => {
        axios
            .get(`/user/allblogs/${user?._id}`)
            .then((res) => {
                setBlogData(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [user?._id, isDelete]);

    const toggleMenu = (blogId) => {
        setOpenMenuId(openMenuId === blogId ? null : blogId);
    };

    const handleEdit = (id) => {
        const blog = blogData.find((item) => item._id === id);
        setEditBlogData(blog);
        setIsEdit(true);
    };

    const handleDelete = (id) => {
        axios
            .delete(`user/delete/${id}/${user?._id}`)
            .then((res) => {
                console.log(res.data);
                setisDelete(true);
                toast.success(res.data);
            })
            .catch((err) => {
                console.log(err);
                setisDelete(true);
                toast.error(err);
            });
    };

    const handleModel = () => {
        document.getElementById("my_modal_2").showModal();
    };

    return (
        <div className="relative flex min-h-screen flex-col justify-center  bg-slate-100 py-6 sm:py-12 w-full">
            <div className="min-h-28 ">
                <div className=" z-50 absolute w-full">
                    {isEdit ? (
                        <div>
                            <EditBlog blog={editBlogData} />
                        </div>
                    ) : null}
                </div>
                <div className="max-w-screen-lg mx-autoa">
                    {blogData.length > 0 ? (
                        <h2 className="font-bold text-center text-6xl text-slate-700 font-display">Blog Post</h2>
                    ) : (
                        <h2 className="font-bold text-center text-6xl text-slate-700 font-display">
                            <Link className=" underline text-blue-900 hover:text-blue-gray-400" to={"/account/newblog"}>
                                Create Your First Blog
                            </Link>
                        </h2>
                    )}

                    <div className=" grid grid-cols-2 md:grid-cols-3 gap-3 mt-10 content-center  w-full ">
                        {blogData?.map((data) => {
                            return (
                                <div key={data._id} className="bg-white  shadow rounded-lg overflow-hidden">
                                    <img
                                        src={data?.image}
                                        className="object-cover  h-52 w-full"
                                        alt={data?.title.slice(0, 20)}
                                    />
                                    <div className="p-6">
                                        <span className="block text-slate-400 font-semibold text-sm">
                                            {new Date(data?.createdAt).toDateString().slice(4)}
                                        </span>
                                        <h3 className="mt-3 line-clamp-2 truncate font-bold text-lg pb-4 border-b border-slate-300">
                                            <Link to={`/home/blog/${data._id}`}>{data.title}</Link>
                                        </h3>
                                        <div className="flex justify-around mt-4 gap-4 items-center">
                                            <span className="flex gap-1 items-center text-sm">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="text-sky-400 w-4 h-4"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                                    />
                                                </svg>
                                                {data.likes.length}
                                            </span>
                                            <span className="flex gap-1 items-center text-sm">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="1.5"
                                                    stroke="currentColor"
                                                    className="w-4 h-4 text-lime-500"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                                                    />
                                                </svg>
                                                {data.comments.length}
                                            </span>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                onClick={() => toggleMenu(data._id)}
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                className="w-4 h-4 text-gray-600 ml-2 cursor-pointer"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                        </div>
                                        {openMenuId === data._id && (
                                            <div className="mt-4 flex justify-around ">
                                                <button className="btn btn-error" onClick={handleModel}>
                                                    Delete
                                                </button>
                                                <dialog id="my_modal_2" className="modal">
                                                    <div className="modal-box flex flex-col items-center justify-center gap-2">
                                                        <h3 className="font-bold text-lg">
                                                            Are you sure to delete this post!
                                                        </h3>
                                                        <div className=" w-full flex px-10 justify-center  gap-5 ">
                                                            <button
                                                                className="btn"
                                                                onClick={() => handleDelete(data._id)}
                                                            >
                                                                Yes
                                                            </button>
                                                            <form method="dialog">
                                                                <button className="btn">No</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    <form method="dialog" className="modal-backdrop">
                                                        <button>close</button>
                                                    </form>
                                                </dialog>
                                                <button
                                                    onClick={() => handleEdit(data._id)}
                                                    className=" btn btn-success"
                                                >
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs;
