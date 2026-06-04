import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  // 1. If no login → redirect
  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // 2. If role restriction exists
  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}