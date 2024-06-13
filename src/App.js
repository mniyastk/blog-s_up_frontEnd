import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/user/Home";
import UserLayout from "./components/layout/UserLayout";
import Blogs from "./pages/user/Account/Blogs";
import Dashboard from "./pages/user/Account/Dashboard";
import Followers from "./pages/user/Account/Followers";
import Messages from "./pages/user/Account/Messages";
import NewBlog from "./pages/user/Account/NewBlog";
import Blog from "./pages/user/Blog";
import LandingPage from "./pages/user/LandingPage";
import "./App.css";
import Account from "./pages/user/Account";
import axios from "axios";
import BlogCatogories from "./pages/Blogs/BlogCatogories";
import ProtectedRoute from "./components/ProtectedRoute";
import { addUser } from "./redux/user/userSlice";
import AccountInfo from "./pages/user/Account/AccountInfo";
import About from "./pages/Blogs/About";
import Contact from "./pages/Blogs/Contact";
import { AnimatePresence } from "framer-motion";
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import AuthorLayout from "./pages/user/AuthorLayout";

axios.defaults.baseURL = "https://server.blogsup.shop/";
axios.defaults.withCredentials = true;

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const isUser = localStorage.getItem("isUser");

    useEffect(() => {
        const fetchData = async () => {
            if (isUser) {
                axios
                    .get("/user/getuser", {
                        withCredentials: true,
                    })
                    .then((res) => {
                        dispatch(addUser(res.data));
                        setLoading(false);
                    })
                    .catch((err) => {
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, isUser]);

    if (loading) {
        return (
            <div>
                <LandingPage />
            </div>
        );
    }

    return (
        <div>
            <ToastContainer autoClose={2000} />
            <AnimatePresence mode="wait">
                <Routes key={location.pathname} location={location}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<UserLayout />}>
                        <Route path="/home/category" element={<BlogCatogories />} />
                        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                        <Route path="/home/blog/:blogId" element={<ProtectedRoute element={<Blog />} />} />
                        <Route path="/home/account" element={<ProtectedRoute element={<Account />} />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/account" element={<AuthorLayout />}>
                        <Route path="/account/blogs" element={<Blogs />} />
                        <Route index path="/account" element={<Dashboard />} />
                        <Route path="/account/followers" element={<Followers />} />
                        <Route path="/account/reports" element={<AccountInfo />} />
                        <Route path="/account/messages" element={<Messages />} />
                        <Route path="/account/newblog" element={<NewBlog />} />
                        <Route path="/account/accountinfo" element={<AccountInfo />} />
                    </Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </AnimatePresence>
        </div>
    );
}

const PageNotFound = () => {
    return (
        <div className=" w-screen h-screen flex flex-col justify-center items-center text-5xl font-bold space-y-5">
            <img
                src="https://res.cloudinary.com/dunf6rko6/image/upload/v1710239599/icons8-page-not-found-66_ej06uy.png"
                alt="not fond"
            />
            <p> 404 Page not found!</p>
        </div>
    );
};

export default App;
