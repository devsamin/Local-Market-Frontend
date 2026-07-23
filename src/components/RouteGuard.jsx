import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext/AuthContext";


export const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (role && user.role !== role) return <Navigate to="/" replace />;
  return children;
};

export const GuestRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to={user.role === "seller" ? "/seller-dashboard" : "/"} replace /> : children;
};
