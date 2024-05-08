import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useClickAway } from "react-use";
import Animation from "../../components/Animation";

const Blog = () => {
  const [isFollow, setIsFollow] = useState("Follow");
  const [isFollowClicked, setIsFollowClicked] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [blog, setBlog] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [commentBox, setCommentBox] = useState(false);
  const [showCommentOptions, setShowCommentOptions] = useState(null);
  const [comment, setComment] = useState("");
  const [isEmoji, setIsEmoji] = useState(false);
  const [isPosted, setIsPosted] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [comments, setComments] = useState([]);

  const [editedComment, setEditedComment] = useState("");
  const [commentVisibility, setCommentVisibility] = useState({});
  const commentRef = useRef();
  const commentOptionRef = useRef();
  const emojiRef = useRef();
  const commentSectionRef = useRef(null);

  const { blogId } = useParams();

  const toggleCommentVisibility = (index) => {
    setCommentVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index],
    }));
  };

  const user = useSelector((state) => state.user.user);
  const author = useSelector((state) => state.author.author);

  const handleFollow = (authorId) => {
    console.log(authorId);
    axios
      .post(`/user/follow/${authorId}/${user._id}`)
      .then((res) => {})
      .catch((err) => {
        toast.error("Error");
      });
    setIsFollowClicked(!isFollowClicked);
  };

  useClickAway(emojiRef, () => {
    setIsEmoji(false);
  });

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
    } else {
      // axios
      //   .get(`user/savedlist/${author._id}`)
      //   .then((res) => {
      //     const savedList = res.data;
      //     const isSaved = savedList.find((item) => item._id == blogId);
      //     if (isSaved) {
      //       setIsSave(true);
      //     }
      //   })
      //   .catch((err) => toast.error("Error"));
    }
  }, [blogId, user.isAuthenticated, user._id]);

  const handlePostComment = (e) => {
    setIsPosting(true);
    e.preventDefault();
    if (comment !== "" && user) {
      axios
        .post(`user/comment/${blog._id}/${user._id}`, { comment })
        .then((res) => {
          setIsPosted(!isPosted);
          setIsPosting(false);
          if (commentSectionRef.current) {
            commentSectionRef.current.scrollTop = 0;
          }
          setComment("");
        })
        .catch((err) => toast.error("error"));
    } else if (comment !== "") {
      axios
        .post(`author/comment/${blog._id}/${author._id}`, { comment })
        .then((res) => {
          setIsPosted(!isPosted);
          setComment("");
        })
        .catch((err) => toast.error("error"));
    }
  };

  useEffect(() => {
    axios
      .get(`user/blog/${blogId}`)
      .then((res) => {
        setBlog(res.data);
        setComments(res.data?.comments);
      })
      .catch((err) => {
        toast.error("Error ");
      });
  }, [blogId, commentVisibility, showCommentOptions, isPosted]);

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

  useEffect(() => {
    if (isFollowClicked) {
      setIsFollow("Following");
    } else {
      setIsFollow("Follow");
    }
  }, [isFollowClicked]);

  const handleCommentOption = (index) => {
    setShowCommentOptions(showCommentOptions === index ? null : index);
  };

  const toggelCommentBox = () => {
    setCommentBox(true);
  };
  const handleCloseCommentBox = () => {
    setCommentBox(false);
  };

  const handleEdit = (id) => {
    setShowCommentOptions(false);
    const comment = document.getElementById(id);
    comment.style.display = "block";
    toggleCommentVisibility(id);
  };

  const handleRemoveComment = (commentId) => {
    axios
      .delete(`/user/removecomment/${blogId}/${commentId}`)
      .then((res) => {
        setShowCommentOptions(false);
      })
      .catch((err) => {
        toast.error("error");
      });
  };

  const handleSaveList = () => {
    setIsSave(!isSave);
    axios.post(`user/blog/save/${blogId}/${user?._id}`).then((res) => {});
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

  const handleSaveComment = (commentId, id) => {
    if (editedComment) {
      axios
        .put(`user/editcomment/${blog._id}/${user._id}/${commentId}`, {
          editedComment,
        })
        .then((res) => {
          setCommentVisibility(true);
          const comment = document.getElementById(id);
          comment.style.display = "none";
        })
        .catch((err) => {
          toast.error("error");
        });
    } else {
      const comment = document.getElementById(id);
      comment.style.display = "none";
      setCommentVisibility(true);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (!commentRef.current.contains(e.target)) {
        setCommentBox(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <Animation>
      <div
        className={` mx-[10px] mt-10 md:mx-[300px] ${
          commentBox ? " h-screen overflow-hidden" : "min-h-[2600px]"
        } mb-5`}
      >
        <section
          ref={commentRef}
          className={` ${
            commentBox ? "block" : "hidden"
          } bg-white  z-40 dark:bg-gray-900  w-full md:w-[50%]   antialiased absolute border rounded-md`}
        >
          <div
            onClick={handleCloseCommentBox}
            className=" cursor-pointer w-full text-end p-4"
          >
            ❌
          </div>
          <div className="max-w-2xl mx-auto px-4 ">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Comments ({blog?.comments?.length})
              </h2>
            </div>

            <div
              ref={commentSectionRef}
              className=" h-[250px] overflow-y-scroll "
              id="Comments"
            >
              {comments
                ?.sort((a, b) => new Date(b.created) - new Date(a.created))
                .map((comment, index) => {
                  return (
                    <article
                      key={index}
                      className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
                    >
                      <footer className="flex justify-between items-center mb-1">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                              alt="Michael Gough"
                            />
                            {comment?.postedby?.username}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(comment?.created).toDateString().slice(4)}
                          </p>
                        </div>
                        <div className="">
                          <button
                            onClick={() => handleCommentOption(index)}
                            className={`${
                              comment?.postedby?.username === user?.username
                                ? "block"
                                : "hidden"
                            }  items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600`}
                            type="button"
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
                            <span className="sr-only">Comment settings</span>
                          </button>
                          <div
                            ref={commentOptionRef}
                            className={`${
                              showCommentOptions === index ? "block" : "hidden"
                            } absolute -ml-16 z-50 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                          >
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                              <li onClick={() => handleEdit(index)}>
                                <p className=" cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                  Edit
                                </p>
                              </li>
                              <li
                                onClick={() => handleRemoveComment(comment._id)}
                              >
                                <p className="cursor-pointer block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                  Remove
                                </p>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </footer>
                      <div
                        id={index}
                        className=" hidden space-x-2 w-full justify-center items-center h-full"
                      >
                        <input
                          type="text"
                          defaultValue={comment.content}
                          onChange={(e) => setEditedComment(e.target.value)}
                        />
                        <button
                          onClick={() => handleSaveComment(comment._id, index)}
                          className="  h-full bg-blue-700 text-white text-sm py-[10px] focus:outline-none px-3"
                        >
                          Save
                        </button>
                      </div>
                      <div
                        id={index}
                        className={
                          commentVisibility[index] ? "hidden" : "block"
                        }
                      >
                        <p className="text-gray-500  dark:text-gray-400 w-full h-full">
                          {comment.content}
                        </p>
                      </div>
                    </article>
                  );
                })}
            </div>
            <form className="  flex w-full justify-around  space-x-2 items-center">
              <div className=" cursor-pointer flex items-center">
                <img
                  onClick={() => setIsEmoji(!isEmoji)}
                  width={40}
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1711968271/emoji_hpqwgc.svg"
                  alt="emoji"
                />
              </div>

              {isEmoji && (
                <div ref={emojiRef} className="absolute z-40 bottom-24 left-10">
                  <EmojiPicker
                    searchDisabled="true"
                    previewConfig={{ showPreview: false }}
                    height={300}
                    width={300}
                    emojiStyle="google"
                    onEmojiClick={(emoji) =>
                      setComment((pre) => pre + emoji.emoji)
                    }
                  />
                </div>
              )}
              <div className=" w-full">
                <textarea
                  id="comment"
                  rows={1}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className=" rounded-lg border p-2  w-full h-auto resize-none  text-sm "
                  placeholder="Write a comment..."
                  required
                ></textarea>
              </div>

              <button
                disabled={comment ? false : true}
                className={`focus:outline-none `}
              >
                <img
                  width={30}
                  onClick={handlePostComment}
                  src={
                    !isPosting
                      ? "https://res.cloudinary.com/dunf6rko6/image/upload/v1711968585/send_odk5qu.svg"
                      : "https://res.cloudinary.com/dunf6rko6/image/upload/v1714731877/Spinner_1x-1.0s-200px-200px_eizpjp.gif"
                  }
                  alt="send"
                />
              </button>
            </form>
          </div>
        </section>
        <div className={`${commentBox ? "blur-md" : "blur-none"}`}>
          <div className="  mt-5 flex ">
            <div
              className=" w-20 h-20  rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${blog.image})`,
              }}
            ></div>
            <div className="  ml-5 my-1 ">
              <div className=" flex gap-5">
                <p className=" text-lg">{blog?.author?.username}</p>
                <p
                  onClick={() => handleFollow(blog.author)}
                  className={` cursor-pointer ${
                    isFollow === "Follow" ? "text-green-500" : "text-gray-500"
                  }  text-lg`}
                >
                  {isFollow}
                </p>
              </div>
              <p className=" text-[#616161] text-sm">
                Graphic Designer, educator
              </p>
              <p className=" text-[#616161] text-sm">Feb 20, 2024</p>
            </div>
          </div>
          <p className=" my-5 text-[30px] md:text-[42px] leading-tight font-Sohnia font-semibold">
            {blog.title}
          </p>
          <div className=" flex h-10 border-y border-gray-400">
            <div className=" flex-1  flex space-x-3 pl-3 items-center">
              <img
                onClick={toggelCommentBox}
                className="  h-5 cursor-pointer"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719787/1564513_comment_message_voice_icon_arai4d.svg"
                alt="Comment"
              />

              <span>{blog?.comments?.length}</span>
            </div>

            <div className=" flex-1 flex justify-evenly items-center">
              {!isSave ? (
                <img
                  onClick={handleSaveList}
                  className=" h-5 cursor-pointer"
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719788/3994430_bookmark_label_ribbon_save_web_icon_lrv92h.svg"
                  alt="save"
                />
              ) : (
                <img
                  onClick={handleUnSaveList}
                  className=" h-7 cursor-pointer"
                  src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719786/save_opmlal.svg"
                  alt="save"
                />
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
            <p>
              I immediately asked myself, why hasn’t it been done before? And
              the answer is simple — Android didn’t allow to implement this,
              because Google was struggling with fragmentation and working on
              the possibility of an independent update of Android, it became a
              reality.
            </p>
          </div>
          <div>
            <img src={blog?.image} alt="android" />
            <p className="text-center">Image generated by Kandinsky 2.2</p>
          </div>
          <div className="my-8 space-y-4 font-Georgia text-xl leading-relaxed text-[#39393a]">
            <p>{blog.content}</p>
            <p>
              I immediately asked myself, why hasn’t it been done before? And
              the answer is simple — Android didn’t allow to implement this,
              because Google was struggling with fragmentation and working on
              the possibility of an independent update of Android, it became a
              reality.
            </p>
          </div>
          <div className=" my-10">
            <p className=" text-2xl font-bold font-Sohnia">
              Recommended from Blog’s Up
            </p>
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {blogs.map((item, i) => {
              return (
                <div key={i} className=" ">
                  <img className=" h-1/2 w-full" src={item.image} alt="lsfj" />
                  <div className=" flex my-3 items-center gap-2">
                    <div
                      className=" h-6 w-6 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url(https://res.cloudinary.com/dunf6rko6/image/upload/v1709975821/937908_zuwv1p.jpg)",
                      }}
                    ></div>
                    <p className=" text-sm">Francesco Franco</p>
                  </div>
                  <Link to={`/home/blog/${item._id}`}>
                    <p className=" my-2 text-lg font-extrabold">{item.title}</p>
                    <p className=" text-[#616161] line-clamp-2">
                      {item.content}
                    </p>
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
