import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateRegister from "./pages/CandidateRegister";
import Results from "./pages/Results";
import Vote from "./pages/Vote";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      <Route
        path="/results"
        element={<Results />}
      />

      {/* VOTER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* VOTING */}
      <Route
        path="/vote"
        element={
          <ProtectedRoute>
            <Vote />
          </ProtectedRoute>
        }
      />

      {/* CANDIDATE DASHBOARD */}
      <Route
        path="/candidate-dashboard"
        element={
          <ProtectedRoute>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      {/* VOTER → CANDIDATE REGISTRATION */}
      <Route
        path="/candidate/register"
        element={
          <ProtectedRoute>
            <CandidateRegister />
          </ProtectedRoute>
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

    </Routes>
  );
}

export default App;