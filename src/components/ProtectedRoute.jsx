import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" replace />;  // Redirect to login if not logged in
    }

    try {
        const decoded = jwtDecode(token);
        if (!allowedRoles.includes(decoded.role)) {
            return <Navigate to="/" replace />;  // Redirect if role doesn't match
        }
        return <Outlet />;  // Allow access
    } catch (error) {
        localStorage.removeItem("token");  // Remove invalid token
        return <Navigate to="/" replace />;
    }
};

export default ProtectedRoute;
