import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";


const ProtectedRoute = ({ children }) => {
  const token =
    localStorage.getItem("token");

  if (!token) {
    return <h2>Please Login First</h2>;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <nav>

          {" | "}

          <Link to="/projects">
            Projects
          </Link>

          <Link to="/">
            Dashboard
          </Link>

          {" | "}

          <Link to="/login">
            Login
          </Link>

          {" | "}

          <Link to="/register">
            Register
          </Link>
        </nav>

        <hr />

        <Routes>
          <Route
            path="/"
            element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/projects"
            element={<ProtectedRoute> <Projects /> </ProtectedRoute>}
          />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;