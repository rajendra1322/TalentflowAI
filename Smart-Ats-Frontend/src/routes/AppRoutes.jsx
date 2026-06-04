import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Candidates from "../pages/Candidates";
import Applications from "../pages/Applications";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Protected / App routes (wrapped with layout + guard) */}
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
    </Routes>
  );
}