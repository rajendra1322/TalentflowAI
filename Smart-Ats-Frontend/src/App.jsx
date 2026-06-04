import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Candidates from "./pages/Candidates";
import Applications from "./pages/Applications";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/layout/DashboardLayout";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <>
    <Routes>

      {/* LANDING (HOME) */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/dashboard" />
          ) : (
            <Landing />
          )
        }
      />

      {/* PUBLIC ROUTES */}
      <Route
        path="/login"
        element={
          token ? <Navigate to="/dashboard" /> : <Login />
        }
      />

      <Route
        path="/register"
        element={
          token ? <Navigate to="/dashboard" /> : <Register />
        }
      />

      {/* PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Jobs />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/candidates"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Candidates />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Applications />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
    <Toaster />
    </>
  );
}