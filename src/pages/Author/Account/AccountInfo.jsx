import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
import { updateAuthor } from "../../../redux/author/authorSlice";

function AccountInfo() {
  const author = useSelector((state) => state.author.author);

  const dispatch = useDispatch();
  const id = author._id;
  const [formValues, setFromValues] = useState({
    username: "",
    email: "",
    phone: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit(!isEdit);
    toast.info("Edit your details");
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFromValues({ ...formValues, [name]: value });
  };
  const handleUpdate = () => {
    const loading = toast.loading("Updating");
    axios
      .put(`/author/updateaccount/${id}`, formValues)
      .then((res) => {
        console.log(res.data);
        dispatch(updateAuthor(formValues.username));
        toast.dismiss(loading);
        toast.success(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loading);
        toast.success(err);
      });
  };

  return (
    <>
      <section className="py-10 bg-gray-100  bg-opacity-50 h-screen">
        <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md">
          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-indigo-400 rounded-t">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src="https://avatars3.githubusercontent.com/u/72724639?s=400&u=964a4803693899ad66a9229db55953a3dbaad5c6&v=4"
                />

                <h1 className="text-gray-600">{author.username}</h1>
              </div>
            </div>
          </div>
          <div className="bg-white space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Account</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm text-gray-400">Email</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    placeholder={author.email}
                  />
                </div>
              </div>
            </div>

            <hr />
            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <label className="text-sm text-gray-400">Full name</label>
                  <div className="w-full inline-flex border">
                    <div className="w-1/12 pt-2 bg-gray-100">
                      <svg
                        fill="none"
                        className="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      onChange={(e) => handleOnchange(e)}
                      type="text"
                      name="username"
                      value={formValues.username}
                      disabled={!isEdit}
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder={author.username}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Phone number</label>
                  <div className="w-full inline-flex border">
                    <div className="pt-2 w-1/12 bg-gray-100">
                      <svg
                        fill="none"
                        className="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      onChange={(e) => handleOnchange(e)}
                      type="text"
                      name="phone"
                      value={formValues.phone}
                      disabled={!isEdit}
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder={author.phone ? author?.phone : "Not Given"}
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className=" flex justify-around pb-4">
              {isEdit ? (
                <>
                  <button
                    onClick={handleUpdate}
                    className=" px-4 py-1 bg-green-700 rounded-md hover:bg-green-100"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setIsEdit(false)}
                    className=" px-4 py-1 bg-red-700 rounded-md hover:bg-green-100"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleEdit}
                    className=" px-4 py-1 bg-green-700 rounded-md hover:bg-green-100"
                  >
                    Edit
                  </button>
                  <button className=" px-4 py-1 bg-red-500 rounded-md hover:bg-red-100">
                    Signout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AccountInfo;
