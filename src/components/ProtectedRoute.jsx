
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  isAuthenticated,
  redirectTo = "/login",
}) {
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} replace />;
}
