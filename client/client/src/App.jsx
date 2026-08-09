import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Results from "./pages/Results";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* User / Voter Dashboard */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>

        {/* Admin Dashboard */}
        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
          />
        </Route>

      </Routes>
    </>
  );
}

export default App;