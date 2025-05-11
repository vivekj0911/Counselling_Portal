// src/pages/SetPassword.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const SetPassword = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const email = state?.email || "";

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!email) {
            navigate("/forgot-password");
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!otp || !newPassword) {
            setError("Both OTP and New Password are required.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password should be at least 6 characters long.");
            return;
        }

        setLoading(true);

        try {
            const res = await axios.post("http://localhost:3000/api/auth/change-password", {
                email,
                otp,
                newPassword,
            });
            setMessage(res.data.message);
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to set password.";
            setError(msg);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-center mb-4 text-red-700">Set New Password</h2>

                {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                    <input
                        type="password"
                        placeholder="Enter New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded text-white transition ${
                            loading ? "bg-gray-400" : "bg-red-700 hover:bg-red-600"
                        }`}
                    >
                        {loading ? "Updating..." : "Set Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetPassword;
