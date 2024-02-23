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
import Blog from "./pages/user/Blog";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Blog" element={<Blog/>} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/author" element={<AuthorLayout />}>
          <Route   path="/author/blogs" element={<Blogs />} />
          <Route index path="/author" element={<Dashboard />} />
          <Route path="/author/followers" element={<Followers />} />
          <Route path="/author/reports" element={<Reports />} />
          <Route path="/author/messages" element={<Messages />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
