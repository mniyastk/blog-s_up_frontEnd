import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Animation from "../../components/Animation";

const Account = () => {
    const user = useSelector((state) => state.user.user);
    const [savedList, setSavedList] = useState([]);
    const [followingList, setFollowingList] = useState([]);
    const [isSave, setIsSave] = useState(true);
    const [selectDiv, setSelectDiv] = useState("saved");

    useEffect(() => {
        axios
            .get(`user/savedlist/${user._id}`)
            .then((res) => {
                setSavedList(res.data);
            })
            .catch((err) => toast.error("Error"));
    }, [isSave, user._id]);

    useEffect(() => {
        axios
            .get(`user/getfollowing/${user._id}`)
            .then((res) => {
                setFollowingList(res.data);
            })
            .catch((err) => toast.error("Error"));
    });

    const handleUnfollow = (authorId) => {
        axios
            .delete(`/user/unfollow/${authorId}/${user?._id}`)
            .then((res) => {})
            .catch((err) => toast.error);
    };

    const handleUnSaveList = (blogId) => {
        setIsSave(false);
        axios
            .delete(`user/blog/unsave/${blogId}/${user?._id}`)
            .then((res) => {
                setIsSave(!isSave);
            })
            .catch((err) => {
                toast.error(err.response.data);
            });
    };

    return (
        <Animation>
            {/* <div className=" flex  h-screen">
        <div className=" w-2/3 py-10  h-screen overflow-y-scroll" id="account">
          <div className=" mx-32 ">
            <div className=" py-5  mb-20 flex justify-between items-center">
              <p className=" text-4xl ">{user.username}</p>
              <img
                className=" h-5 pr-10 cursor-pointer"
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719786/1976055_edit_edit_document_edit_file_edited_editing_icon_a9sji7.svg"
                alt="edit"
              />
            </div>
            <div className=" border-gray-400  my-3 border-b flex gap-5">
              <div
                onClick={() => setSelectDiv("saved")}
                className={` ${
                  selectDiv === "saved" && "border-b"
                } pb-1 border-black w-fit cursor-pointer`}
              >
                Saved
              </div>
              <div
                onClick={() => setSelectDiv("following")}
                className={` ${
                  selectDiv === "following" && "border-b"
                } pb-1 border-black w-fit cursor-pointer`}
              >
                Following
              </div>
            </div>
            <div className={`${selectDiv === "saved" ? "block" : "hidden"}`}>
              {selectDiv === "saved" &&
                savedList?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="  mt-10">
                        <div className="  w-full flex">
                          <div className=" w-2/3 mb-2">
                            <div className=" flex items-center py-2 text-sm space-x-2">
                              <div
                                className=" h-6 w-6 rounded-full bg-cover bg-center"
                                style={{
                                  backgroundImage:
                                    "url(https://res.cloudinary.com/dunf6rko6/image/upload/v1709975816/944271_qdk7dw.png)",
                                }}
                              ></div>
                              <p>{item.authorId}</p>
                              <p className=" text-gray-400">
                                {new Date(item?.createdAt)
                                  .toDateString()
                                  .slice(4)}
                              </p>
                            </div>
                            <p className=" font-bold">{item.title}</p>
                            <Link to={`/home/blog/${item._id}`}>
                              <p className=" font-Georgia text-gray-400 line-clamp-2 my-1 ">
                                {item.content}
                              </p>
                            </Link>
                            <div className="flex justify-end space-x-6 pr-5 items-center my-3">
                              <img
                                onClick={() => handleUnSaveList(item._id)}
                                className=" h-6"
                                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719786/save_opmlal.svg"
                                alt=""
                              />
                              <img
                                className=" h-5"
                                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1709719788/3844444_dot_menu_more_option_icon_wzhypk.svg"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className=" w-1/3 h-fit">
                            <Link to={`/home/blog/${item._id}`}>
                              <img src={item.image} alt="item" />
                            </Link>
                          </div>
                        </div>
                      </div>{" "}
                      <hr />
                    </div>
                  );
                })}
            </div>
            {followingList.map((item) => {
              return (
                <div
                  className={`${
                    selectDiv === "following" ? "block" : "hidden"
                  }`}
                >
                  <ul class="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    <li class="pb-3 pt-2 sm:pb-4">
                      <div class="flex items-center space-x-4 rtl:space-x-reverse">
                        <div class="flex-shrink-0">
                          <img
                            class="w-8 h-8 rounded-full"
                            src="/docs/images/people/profile-picture-1.jpg"
                            alt="Neil"
                          />
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {item.username}
                          </p>
                          <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                            {item.email}
                          </p>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          <p
                            onClick={() => handleUnfollow(item._id)}
                            className=" text-green-600 cursor-pointer"
                          >
                            Unfollow
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <div className=" border-l ">
          <div className=" p-10 ">
            <div
              className=" h-[100px] w-[100px] rounded-full bg-cover bg-center"
              style={{
                backgroundImage:
                `url(${user.avatar})`,
              }}
            ></div>
            <p className="  text-center my-4">{user.username}</p>
          </div>
        </div>
      </div> */}

            <div className=" h-screen">
                <div class="mb-4 border-b border-gray-200 dark:border-gray-700">
                    <ul
                        class="flex flex-wrap -mb-px text-sm font-medium text-center"
                        id="default-tab"
                        data-tabs-toggle="#default-tab-content"
                        role="tablist"
                    >
                        <li class="me-2" role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg"
                                id="profile-tab"
                                data-tabs-target="#profile"
                                type="button"
                                role="tab"
                                aria-controls="profile"
                                aria-selected="false"
                            >
                                Profile
                            </button>
                        </li>
                        <li class="me-2" role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                id="dashboard-tab"
                                data-tabs-target="#dashboard"
                                type="button"
                                role="tab"
                                aria-controls="dashboard"
                                aria-selected="false"
                            >
                                Dashboard
                            </button>
                        </li>
                        <li class="me-2" role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                id="settings-tab"
                                data-tabs-target="#settings"
                                type="button"
                                role="tab"
                                aria-controls="settings"
                                aria-selected="false"
                            >
                                Settings
                            </button>
                        </li>
                        <li role="presentation">
                            <button
                                class="inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                                id="contacts-tab"
                                data-tabs-target="#contacts"
                                type="button"
                                role="tab"
                                aria-controls="contacts"
                                aria-selected="false"
                            >
                                Contacts
                            </button>
                        </li>
                    </ul>
                </div>
                <div id="default-tab-content">
                    <div
                        class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            This is some placeholder content the{" "}
                            <strong class="font-medium text-gray-800 dark:text-white">
                                Profile tab's associated content
                            </strong>
                            . Clicking another tab will toggle the visibility of this one for the next. The tab
                            JavaScript swaps classes to control the content visibility and styling.
                        </p>
                    </div>
                    <div
                        class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        id="dashboard"
                        role="tabpanel"
                        aria-labelledby="dashboard-tab"
                    >
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            This is some placeholder content the{" "}
                            <strong class="font-medium text-gray-800 dark:text-white">
                                Dashboard tab's associated content
                            </strong>
                            . Clicking another tab will toggle the visibility of this one for the next. The tab
                            JavaScript swaps classes to control the content visibility and styling.
                        </p>
                    </div>
                    <div
                        class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        id="settings"
                        role="tabpanel"
                        aria-labelledby="settings-tab"
                    >
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            This is some placeholder content the{" "}
                            <strong class="font-medium text-gray-800 dark:text-white">
                                Settings tab's associated content
                            </strong>
                            . Clicking another tab will toggle the visibility of this one for the next. The tab
                            JavaScript swaps classes to control the content visibility and styling.
                        </p>
                    </div>
                    <div
                        class="hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                        id="contacts"
                        role="tabpanel"
                        aria-labelledby="contacts-tab"
                    >
                        <p class="text-sm text-gray-500 dark:text-gray-400">
                            This is some placeholder content the{" "}
                            <strong class="font-medium text-gray-800 dark:text-white">
                                Contacts tab's associated content
                            </strong>
                            . Clicking another tab will toggle the visibility of this one for the next. The tab
                            JavaScript swaps classes to control the content visibility and styling.
                        </p>
                    </div>
                </div>
            </div>
        </Animation>
    );
};

export default Account;
