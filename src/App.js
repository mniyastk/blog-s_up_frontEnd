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
import './App.css'
import Account from "./pages/user/Account";

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
      </Routes>
    </div>
  );
}

export default App;
