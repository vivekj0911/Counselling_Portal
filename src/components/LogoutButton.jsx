import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;

        setLoading(true);

        setTimeout(() => {
            localStorage.removeItem("token"); // Remove token
            setLoading(false);
            navigate("/"); // Redirect to login page
        }, 1000); // Simulate processing delay
    };

    return (
        <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
        >
            {loading ? "Logging out..." : "Logout"}
        </button>
    );
};

export default LogoutButton;
