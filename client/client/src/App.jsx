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

import PrivateElections from "./pages/private-election/PrivateElections";
import CreateElection from "./pages/private-election/CreateElection";
import JoinElection from "./pages/private-election/JoinElection";
import ElectionDetails from "./pages/private-election/ElectionDetails";
import VoterDashboard from "./pages/private-election/VoterDashboard";
import PrivateCandidateDashboard from "./pages/private-election/CandidateDashboard";
import ElectionAdminDashboard from "./pages/private-election/ElectionAdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/results" element={<Results />} />


      {/* EXISTING PUBLIC ELECTION */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["voter"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/vote"
        element={
          <ProtectedRoute allowedRoles={["voter"]}>
            <Vote />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate/register"
        element={
          <ProtectedRoute allowedRoles={["voter"]}>
            <CandidateRegister />
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidate-dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
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


      {/* PRIVATE / CLASS ELECTION */}

      <Route
        path="/private-elections"
        element={
          <ProtectedRoute>
            <PrivateElections />
          </ProtectedRoute>
        }
      />

      <Route
        path="/private-election/create"
        element={
          <ProtectedRoute>
            <CreateElection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/private-election/join"
        element={
          <ProtectedRoute>
            <JoinElection />
          </ProtectedRoute>
        }
      />

      <Route
        path="/private-election/:id"
        element={
          <ProtectedRoute>
            <ElectionDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/private-election/:id/voter"
        element={
          <ProtectedRoute>
            <VoterDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/private-election/:id/candidate"
        element={
          <ProtectedRoute>
            <PrivateCandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/private-election/:id/admin"
        element={
          <ProtectedRoute>
            <ElectionAdminDashboard />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;