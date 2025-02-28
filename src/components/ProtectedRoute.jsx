import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ allowedRoles }) => {
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/api/auth/me", {
                    withCredentials: true, // Ensure cookies are sent
                });
                setRole(data.role);
            } catch (error) {
                setRole(null); // If unauthorized, reset role
            }
            setLoading(false);
        };

        fetchRole();
    }, []);

    if (loading) return null; // Prevents flickering while fetching role

    if (!role) return <Navigate to="/" replace />; // Redirect if not logged in

    if (!allowedRoles.includes(role)) return <Navigate to="/" replace />; // Redirect if role mismatch

    return <Outlet />;
};

export default ProtectedRoute;
