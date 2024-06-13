import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addUser } from "../../redux/user/userSlice";
import GoogleAuth from "../../components/GoogleAuth";

function Login() {
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const history = useNavigate();

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const dispatch = useDispatch();

    const validate = (values) => {
        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!regex.test(values.email)) {
            errors.email = " Invalid Email ";
        }
        if (!values.password) {
            errors.password = "Password is Required";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validate(formValues);
        setFormErrors(validate(formValues));
        if (Object.keys(errors).length === 0) {
            const loadingToastId = toast.loading("Loading");
            axios
                .post("user/login", formValues)
                .then((res) => {
                    dispatch(addUser(res?.data?.user));
                    localStorage.setItem("isUser", true);
                    toast.dismiss(loadingToastId);
                    toast.success(res.data.Messg);
                    history("/home");
                })
                .catch((err) => {
                    toast.dismiss(loadingToastId);
                    toast.error(err.response.data ? err.response.data : "something went worng...");
                });
        }
    };

    return (
        // <>
        //     <div className="bg-gray-100 flex justify-center sm:flex   items-center h-screen">
        //         <div className="w-1/ 4h-screen hidden sm:block lg:block">
        //             <img
        //                 src="https://res.cloudinary.com/dunf6rko6/image/upload/v1708602018/b_zdbtfu.svg"
        //                 alt="Placeholder  "
        //                 className="object-cover w-full h-full  "
        //             />
        //         </div>

        //         <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        //             <h1 className="text-2xl font-semibold mb-4">Login</h1>
        //             <form
        //                 action="#"
        //                 method="POST"
        //                 className="   px-[30px] py-[20px] border-[2px] rounded-md border-blue-500"
        //             >
        //                 <div className="mb-4">
        //                     <label htmlFor="username" className="block text-gray-600">
        //                         Email
        //                         <span className=" ml-2 text-red-600"> {formErrors.email}</span>
        //                     </label>
        //                     <input
        //                         type="email"
        //                         onChange={handleOnChange}
        //                         id="email"
        //                         name="email"
        //                         className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        //                         autoComplete="off"
        //                     />
        //                 </div>

        //                 <div className="mb-4">
        //                     <label htmlFor="password" className="block text-gray-600">
        //                         Password
        //                         <span className=" ml-2 text-red-600">{formErrors.password}</span>
        //                     </label>
        //                     <input
        //                         type="password"
        //                         onChange={handleOnChange}
        //                         id="password"
        //                         name="password"
        //                         className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        //                         autoComplete="off"
        //                     />
        //                 </div>

        //                 <div className="mb-4 flex items-center">
        //                     <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
        //                     <label htmlFor="remember" className="text-gray-600 ml-2">
        //                         Remember Me
        //                     </label>
        //                 </div>

        //                 <div onClick={() => toast.info("available Soon...!")} className="mb-6 text-blue-500">
        //                     <Link to={""} className="hover:underline">
        //                         Forgot Password?
        //                     </Link>
        //                 </div>

        //                 <button
        //                     type="submit"
        //                     onClick={handleSubmit}
        //                     className="bg-blue-500 mt-9 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
        //                 >
        //                     Login
        //                 </button>
        //             </form>

        //             <div className="mt-6 text-blue-500 text-center">
        //                 <Link to={"/register"} className="hover:underline">
        //                     Sign up Here
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        // </>
        <div className="py-16">
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
                    }}
                ></div>
                <div className="w-full flex flex-col p-8 lg:w-1/2 ">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Blog's Up</h2>
                    <p className="text-xl text-gray-600 text-center">Welcome back!</p>
                    <div className=" mt-8">
                        <GoogleAuth width={383} />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase">
                            or login with email
                        </a>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                            <input
                                onChange={handleOnChange}
                                id="email"
                                name="email"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="text"
                            />
                            <span className=" absolute text-sm  text-red-600">{formErrors.email}</span>
                        </div>
                        <div className="mt-5">
                            <div className="flex justify-between">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                                <a
                                    href="#"
                                    onClick={() => toast.info("available soon..")}
                                    className="text-xs text-gray-500"
                                >
                                    Forget Password?
                                </a>
                            </div>
                            <input
                                onChange={handleOnChange}
                                id="password"
                                name="password"
                                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                                type="password"
                            />
                            <span className=" absolute text-sm text-red-600">{formErrors.password}</span>
                        </div>
                        <div className="mt-8">
                            <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <Link to={"/register"} className="text-xs text-gray-500 uppercase">
                            or sign up
                        </Link>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
