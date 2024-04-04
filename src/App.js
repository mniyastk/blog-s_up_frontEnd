import Login from "./pages/Author/Login";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/user/Home";
import UserLayout from "./components/layout/UserLayout";
import Register from "./pages/Author/Register";
import AuthorLayout from "./pages/Author/AuthorLayout";
import Blogs from "./pages/Author/Account/Blogs";
import Dashboard from "./pages/Author/Account/Dashboard";
import Followers from "./pages/Author/Account/Followers";
import Reports from "./pages/Author/Account/Reports";
import Messages from "./pages/Author/Account/Messages";
import NewBlog from "./pages/Author/Account/NewBlog";
import Blog from "./pages/user/Blog";
import LandingPage from "./pages/user/LandingPage";
import "./App.css";
import Account from "./pages/user/Account";
import axios from "axios";
import CreateBlog from "./pages/Blogs/CreateBlog";
import BlogCatogories from "./pages/Blogs/BlogCatogories";
// import Cursor from "./components/Cursor";
import ProtectedRoute from "./components/ProtectedRoute";
import { addUser } from "./redux/user/userSlice";
import { addauthor } from "./redux/author/authorSlice";
import About from "./pages/Blogs/About";
import Contact from "./pages/Blogs/Contact";

axios.defaults.baseURL = "http://localhost:3005/";
axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  const isAuthor = localStorage.getItem("isAuthor");

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const userInfo = localStorage.getItem("user");
      //   const authorInfo = localStorage.getItem("author");
      //   if (userInfo) {
      //     const user = JSON.parse(userInfo);
      //     dispatch(addUser(user));
      //   } else if (authorInfo) {
      //     const author = JSON.parse(authorInfo);
      //     dispatch(addauthor(author));
      //   }
      // } catch (error) {
      //   toast.error("error");
      // } finally {
      //   setLoading(false);
      // }

      if (!isAuthor) {
        axios
          .get("/user/getuser", { withCredentials: true })
          .then((res) => {
            dispatch(addUser(res.data));
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            toast.error("error");
          });
      } else {
        const authorInfo = localStorage.getItem("author");
        const author = JSON.parse(authorInfo);
        dispatch(addauthor(author));
        setLoading(false)
      }
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return (
      <div className=" w-screen h-screen flex justify-center items-center"></div>
    );
  }

  return (
    <div>
      {/* <Cursor /> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/category" element={<BlogCatogories />} />
        <Route path="/home" element={<UserLayout />}>
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
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
          <Route path="/author/reports" element={<Reports />} />
          <Route path="/author/messages" element={<Messages />} />
          <Route path="/author/newblog" element={<NewBlog />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Routes>
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
