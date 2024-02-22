import Login from "./pages/Author/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/user/Home";
import UserLayout from "./components/layout/UserLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
