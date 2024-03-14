import Login from "./pages/Author/Login";
import { Route, Routes } from "react-router-dom";
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

axios.defaults.baseURL = "http://localhost:3005/";
axios.defaults.withCredentials = true

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<UserLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/blog" element={<Blog />} />
          <Route path="/home/account" element={<Account />} />
        </Route>
        <Route path="/login" element={<Login />} />
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
