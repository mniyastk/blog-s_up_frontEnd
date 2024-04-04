import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Account = () => {
  const user = useSelector((state) => state.user.user);
  const [savedList, setSavedList] = useState([]);

  useEffect(() => {
    axios
      .get(`user/savedlist/${user._id}`)
      .then((res) => {
        setSavedList(res.data);
      })
      .catch((err) => toast.error("Error"));
  }, []);

  console.log(savedList);

  return (
    <div className=" flex  h-screen">
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
          <div className=" border-gray-400  my-3 border-b ">
            <div className=" border-b pb-1 border-black w-fit">Saved</div>
          </div>
          {savedList?.map((item, index) => {
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
                          {new Date(item?.createdAt).toDateString().slice(4)}
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
      </div>
      <div className=" border-l ">
        <div className=" p-10 ">
          <div
            className=" h-[100px] w-[100px] rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dunf6rko6/image/upload/v1709975816/944271_qdk7dw.png)",
            }}
          ></div>
          <p className="  text-center my-4">{user.username}</p>
        </div>
      </div>
    </div>
  );
};

export default Account;
