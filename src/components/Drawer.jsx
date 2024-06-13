import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Drawer = ({ fetchBlog, blog }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState("");
    const [comment, setComment] = useState("");

    const editInputRef = useRef(null);
    const commentSectionRef = useRef(null);

    const user = useSelector((state) => state.user.user);
    const handleEditClick = (content, id) => {
        setEditingCommentId(id);
        setEditedContent(content);
        setIsEditing(true);
    };

    useEffect(() => {
        if (editingCommentId && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingCommentId]);

    const handleSaveClick = (commentId) => {
        setIsEditing(false);
        console.log(editedContent);
        if (editedContent) {
            axios
                .put(`user/editcomment/${blog._id}/${user._id}/${commentId}`, {
                    editedContent,
                })
                .then((res) => {
                    fetchBlog();
                })
                .catch((err) => {
                    console.log(err);
                    toast.error("error");
                });
        }
    };

    const handleRemoveComment = (commentId) => {
        axios
            .delete(`/user/removecomment/${blog._id}/${commentId}`)
            .then((res) => {
                fetchBlog();
            })
            .catch((err) => {
                toast.error("error");
            });
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handlePostComment = (e) => {
        e.preventDefault();
        if (comment) {
            axios
                .post(`user/comment/${blog._id}/${user._id}`, { comment })
                .then((res) => {
                    if (commentSectionRef.current) {
                        commentSectionRef.current.scrollTop = 0;
                    }
                    setComment(" ");
                    fetchBlog();
                })
                .catch((err) => toast.error("error"));
        }
    };

    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
    };

    return (
        <div className="  w-full   absolute z-30  ">
            <div className="drawer drawer-end ">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-side mt-16   mb-16">
                    <label
                        htmlFor="my-drawer-4"
                        aria-label="close sidebar"
                        className="drawer-overlay bg-red-500"
                    ></label>
                    <ul className="menu w-full sm:w-1/3    absolute z-50 p-0 border border-gray-500 text-base-content">
                        <div className="drawer-content bg-white  flex justify-end p-1 items-center uppercase text-xl ">
                            <label htmlFor="my-drawer-4" className=" border sm:hidden  p-2 rounded-md">
                                <MdClose color="red" size={20} />
                            </label>
                        </div>
                        <section className="bg-white min-h-screen dark:bg-gray-900 py-8 mb-16   lg:py-5 antialiased">
                            <div className="max-w-2xl mx-auto px-4 h-full">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                        Comments ({blog?.comments?.length})
                                    </h2>
                                </div>
                                <form className="mb-6" onSubmit={handlePostComment}>
                                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                        <label htmlFor="comment" className="sr-only">
                                            Your comment
                                        </label>
                                        <textarea
                                            id="comment"
                                            rows="6"
                                            name="comment"
                                            onChange={(e) => {
                                                handleCommentChange(e);
                                            }}
                                            value={comment}
                                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                            placeholder="Write a comment..."
                                            required
                                        />
                                    </div>

                                    <div className=" flex  items-center ">
                                        <button
                                            type="submit"
                                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                        >
                                            Post
                                        </button>
                                    </div>
                                </form>
                                {blog?.comments
                                    ?.sort((a, b) => new Date(b.created) - new Date(a.created))
                                    .map((item) => {
                                        return (
                                            <article
                                                ref={commentSectionRef}
                                                key={item._id}
                                                className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
                                            >
                                                <footer className="flex justify-between items-center mb-2">
                                                    <div className="flex items-center">
                                                        <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                            <img
                                                                className="mr-2 w-6 h-6 rounded-full"
                                                                src={item?.postedby?.avatar}
                                                                alt="postBy"
                                                            />
                                                            {item?.postedby?.username}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {new Date(item?.created).toDateString().slice(4)}
                                                        </p>
                                                    </div>
                                                    {item?.postedby?.username === user.username && (
                                                        <div className="dropdown">
                                                            <div
                                                                tabIndex={0}
                                                                role="button"
                                                                className="m-1 btn btn-primary"
                                                            >
                                                                <svg
                                                                    className="w-4 h-4"
                                                                    aria-hidden="true"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 16 3"
                                                                >
                                                                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                                                </svg>
                                                            </div>
                                                            <ul
                                                                tabIndex={0}
                                                                className="dropdown-content -left-5  menu p-2 shadow bg-base-100  rounded-box "
                                                            >
                                                                <li>
                                                                    <a
                                                                        onClick={() =>
                                                                            handleEditClick(item?.content, item._id)
                                                                        }
                                                                    >
                                                                        Edit
                                                                    </a>
                                                                </li>
                                                                <li>
                                                                    <a onClick={() => handleRemoveComment(item._id)}>
                                                                        Remove
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    )}
                                                </footer>
                                                {isEditing && item._id === editingCommentId ? (
                                                    <div>
                                                        <textarea
                                                            ref={editInputRef}
                                                            className="w-full p-2 border rounded"
                                                            value={editedContent}
                                                            onChange={handleContentChange}
                                                        />
                                                        <div className=" flex items-center">
                                                            <button
                                                                className="mt-2 btn  btn-primary"
                                                                onClick={() => handleSaveClick(item._id)}
                                                            >
                                                                Save
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <p className="text-gray-500 dark:text-gray-400">{item?.content}</p>
                                                )}

                                                {/* <div className="flex items-center mt-4 space-x-4">
                                                <button
                                                    type="button"
                                                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                                >
                                                    <svg
                                                        className="mr-1.5 w-3.5 h-3.5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 18"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                                        />
                                                    </svg>
                                                    Reply
                                                </button>
                                            </div> */}
                                            </article>
                                        );
                                    })}
                            </div>
                        </section>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
