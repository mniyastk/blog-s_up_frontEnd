import Login from "./pages/Author/Login";
import { Route, Routes, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/user/Home";
import UserLayout from "./components/layout/UserLayout";
import Register from "./pages/Author/Register";
import AuthorLayout from "./pages/Author/AuthorLayout";
import Blogs from "./pages/Author/Account/Blogs";
import Dashboard from "./pages/Author/Account/Dashboard";
import Followers from "./pages/Author/Account/Followers";
import Messages from "./pages/Author/Account/Messages";
import NewBlog from "./pages/Author/Account/NewBlog";
import Blog from "./pages/user/Blog";
import LandingPage from "./pages/user/LandingPage";
import "./App.css";
import Account from "./pages/user/Account";
import axios from "axios";
import CreateBlog from "./pages/Blogs/CreateBlog";
import BlogCatogories from "./pages/Blogs/BlogCatogories";
import ProtectedRoute from "./components/ProtectedRoute";
import { addUser } from "./redux/user/userSlice";
import { addauthor } from "./redux/author/authorSlice";
import AccountInfo from "./pages/Author/Account/AccountInfo";
import About from "./pages/Blogs/About";
import Contact from "./pages/Blogs/Contact";
import { AnimatePresence } from "framer-motion";

// axios.defaults.baseURL = "https://server.blogsup.shop/api/";
axios.defaults.baseURL = "http://localhost:3005/";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const isAuthor = localStorage.getItem("isAuthor");

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthor) {
        axios
          .get("/user/getuser", { withCredentials: true })
          .then((res) => {
            console.log("from user");
            dispatch(addUser(res.data));
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      } else {
        axios
          .get("/author/getauthor", { withCredentials: true })
          .then((res) => {
            console.log("from author");
            dispatch(addauthor(res.data));
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    };
    fetchData();
  }, [dispatch, isAuthor]);

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
            <Route
              path="/home"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="/home/blog/:blogId"
              element={<ProtectedRoute element={<Blog />} />}
            />
            <Route
              path="/home/account"
              element={<ProtectedRoute element={<Account />} />}
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/author" element={<AuthorLayout />}>
            <Route path="/author/blogs" element={<Blogs />} />
            <Route index path="/author" element={<Dashboard />} />
            <Route path="/author/followers" element={<Followers />} />

            <Route path="/author/reports" element={<AccountInfo />} />
            <Route path="/author/messages" element={<Messages />} />
            <Route path="/author/newblog" element={<NewBlog />} />
            <Route path="/author/accountinfo" element={<AccountInfo />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/create-blog" element={<CreateBlog />} />
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
