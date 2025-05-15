// src/pages/ForgotPassword.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await axios.post("http://localhost:3000/api/auth/forgot-password", { email });
            setMessage(res.data.message);
            setTimeout(() => navigate("/set-password", { state: { email } }), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold text-center mb-4 text-red-700">Forgot Password</h2>

                {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
                {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter registered email"
                        required
                        className="w-full px-4 py-2 border rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-600 transition"
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
