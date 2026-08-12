// src/App.jsx

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

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["voter"]}
          >
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vote"
        element={
          <ProtectedRoute
            allowedRoles={["voter"]}
          >
            <Vote />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/register"
        element={
          <ProtectedRoute
            allowedRoles={["voter"]}
          >
            <CandidateRegister />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate-dashboard"
        element={
          <ProtectedRoute
            allowedRoles={["candidate"]}
          >
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

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