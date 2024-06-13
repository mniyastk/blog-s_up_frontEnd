import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Animation from "../../components/Animation";
import LazyLoadedImage from "../../components/LazyLoadedImage";
import Drawer from "../../components/Drawer";
import { MdComment } from "react-icons/md";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const Blog = () => {
    const [isFollow, setIsFollow] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [blog, setBlog] = useState({});
    const [blogs, setBlogs] = useState([]);

    const { blogId } = useParams();

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        axios
            .get(`user/getfollowing/${user._id}`)
            .then((res) => {
                const following = res.data;
                const isFollowed = following.find((item) => item._id === blog?.author?._id);
                if (isFollowed) {
                    setIsFollow(true);
                }
            })
            .catch((err) => toast.error("Error"));
    }, [blogId, user.isAuthenticated, user._id, blog]);

    useEffect(() => {
        if (user.isAuthenticated) {
            axios
                .get(`user/savedlist/${user._id}`)
                .then((res) => {
                    const savedList = res.data;
                    const isSaved = savedList.find((item) => item._id === blogId);
                    if (isSaved) {
                        setIsSave(true);
                    }
                })
                .catch((err) => toast.error("Error"));
        }
    }, [blogId, user.isAuthenticated, user._id]);

    const handleFollow = (author) => {
        setIsFollow(!isFollow);
        axios
            .post(`/user/follow/${author._id}/${user._id}`)
            .then((res) => {})
            .catch((err) => {
                toast.error("Error");
            });
    };
    const handleUnfollow = (author) => {
        setIsFollow(false);
        axios
            .delete(`/user/unfollow/${author._id}/${user._id}`)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                toast.error("Error");
            });
    };

    const fetchBlog = () => {
        axios
            .get(`user/blog/${blogId}`)
            .then((res) => {
                setBlog(res.data);
            })
            .catch((err) => {
                toast.error("Error ");
            });
    };

    useEffect(() => {
        fetchBlog();
    }, [blogId]);

    useEffect(() => {
        axios
            .get(`user/blogs`)
            .then((res) => {
                setBlogs(res.data);
                window.scrollTo(0, 0);
            })
            .catch((err) => {
                toast.error("Error ");
            });
    }, [blogId]);

    const handleSaveList = () => {
        setIsSave(!isSave);
        axios
            .post(`user/blog/save/${blogId}/${user?._id}`)
            .then((res) => {})
            .catch((err) => {
                toast.error("error");
            });
    };
    const handleUnSaveList = () => {
        setIsSave(false);
        axios
            .delete(`user/blog/unsave/${blogId}/${user?._id}`)
            .then((res) => {})
            .catch((err) => {
                toast.error("Unsave failed");
            });
    };

    return (
        <Animation>
            <Drawer blog={blog} fetchBlog={fetchBlog} />
            <div className={` mx-[10px] mt-10 md:mx-[300px] min-h-[2600px] mb-5`}>
                <div>
                    <div className="  mt-5 flex ">
                        <div className=" w-20 h-20  rounded-full object-cover overflow-hidden">
                            <img className=" h-fit w-fit" src={blog?.author?.avatar} alt="" />
                        </div>
                        <div className="  ml-5 my-1 ">
                            <div className=" flex gap-5 items-center">
                                <p className=" text-lg">{blog?.author?.username}</p>

                                {isFollow ? (
                                    <p
                                        className=" text-gray-500 cursor-pointer"
                                        onClick={() => handleUnfollow(blog?.author)}
                                    >
                                        Following
                                    </p>
                                ) : (
                                    <p
                                        className=" text-green-500 cursor-pointer"
                                        onClick={() => handleFollow(blog?.author)}
                                    >
                                        Follow
                                    </p>
                                )}
                            </div>
                            <p className=" text-[#616161] text-sm">Graphic Designer, educator</p>
                            <p className=" text-[#616161] text-sm">Feb 20, 2024</p>
                        </div>
                    </div>
                    <p className=" my-5 text-[30px] md:text-[42px] leading-tight font-Sohnia font-semibold">
                        {blog.title}
                    </p>
                    <div className=" flex h-10 border-y border-gray-400   items-center">
                        <div className=" flex-1  flex gap-1  pl-3 items-center absolute z-20  ">
                            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
                                    <MdComment size={22} />
                                </label>
                            </div>
                            <span>{blog?.comments?.length}</span>
                        </div>

                        <div className=" flex-1 flex justify-end gap-14 pr-4 items-center">
                            {!isSave ? (
                                <BookmarkBorderIcon onClick={handleSaveList} className=" cursor-pointer" />
                            ) : (
                                <BookmarkIcon onClick={handleUnSaveList} className=" cursor-pointer" />
                            )}
                            <img
                                className=" h-5"
                                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719788/8666719_share_icon_fzsucc.svg"
                                alt="share"
                            />
                            <img
                                className=" h-5"
                                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719788/3844444_dot_menu_more_option_icon_wzhypk.svg"
                                alt="options"
                            />
                        </div>
                    </div>
                    <div className="my-8 space-y-4 font-Georgia text-xl leading-relaxed  text-[#39393a]">
                        <p>{blog?.content}</p>
                    </div>
                    <div>
                        <img src={blog?.image} alt="android" />
                        <p className="text-center">Image generated by Kandinsky 2.2</p>
                    </div>
                    <div className="my-8 space-y-4 font-Georgia text-xl leading-relaxed text-[#39393a]">
                        <p>{blog.content}</p>
                    </div>
                    <div className=" my-10">
                        <p className=" text-2xl font-bold font-Sohnia">Recommended from Blog’s Up</p>
                    </div>
                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 ">
                        {blogs.map((item, i) => {
                            return (
                                <div key={i} className=" ">
                                    <LazyLoadedImage h={"h-1/2"} w={"w-full"} src={item.image} alt={"recommended"} />
                                    <div className=" flex my-3 items-center gap-2">
                                        <div className=" h-6 w-6 rounded-full bg-cover bg-center overflow-hidden">
                                            <img src={item?.author?.avatar} alt="blog" />
                                        </div>
                                        <p className=" text-sm">{item?.author?.username}</p>
                                    </div>
                                    <Link to={`/home/blog/${item._id}`}>
                                        <p className=" my-2 text-lg font-extrabold">{item.title}</p>
                                        <p className=" text-[#616161] line-clamp-2">{item.content}</p>
                                    </Link>
                                    <p className=" text-[#616161] text-sm my-2">Feb 12, 2024</p>
                                    <div className=" flex my-8 ">
                                        <div className=" flex-1 flex items-center space-x-2">
                                            <img
                                                className=" h-5 pl-1"
                                                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719787/1564513_comment_message_voice_icon_arai4d.svg"
                                                alt=""
                                            />
                                            <p>100</p>
                                        </div>
                                        <div className=" flex-1 flex justify-end  space-x-5 items-center">
                                            <img
                                                className=" h-5 "
                                                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719788/3994430_bookmark_label_ribbon_save_web_icon_lrv92h.svg"
                                                alt=""
                                            />
                                            <img
                                                className=" h-5 pr-3"
                                                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719788/3844444_dot_menu_more_option_icon_wzhypk.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <hr className=" border-gray-300 my-6" />
                    <Link to={"/home#scrollElement"}>
                        <button className=" text-sm border border-black rounded-full focus:outline-none py-2 px-4 mb-1 mt-10">
                            See more recommendation
                        </button>
                    </Link>
                </div>
            </div>
        </Animation>
    );
};

export default Blog;
