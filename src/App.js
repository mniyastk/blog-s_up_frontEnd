import Login from "./pages/Author/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import UserLayout from "./components/layout/UserLayout";
import Register from "./pages/Author/Register";
import Dashboard from "./pages/Author/Dashboard";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/author/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
