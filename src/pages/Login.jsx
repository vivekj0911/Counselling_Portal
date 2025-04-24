import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import logo from "../assets/logo.png";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.post("http://localhost:3000/api/auth/login", formData, {
                withCredentials: true, // Ensures cookies are sent
            });

            // Fetch user role after successful login
            const { data } = await axios.get("http://localhost:3000/api/auth/me", {
                withCredentials: true,
            });
            console.log(data);
            
            navigate(`/${data.role}`);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }

        setLoading(false);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #75141b, #af1734, #6b1218)" }}
        >
            <div
                className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
                style={{ boxShadow: "10px 10px 1px rgba(255, 255, 255, 0.45)" }}
            >
                <div className="text-center mb-8">
                    <img src={logo} alt="Institute Logo" className="h-20 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        Dr. D. Y. Patil Dnyan Prasad University
                    </h2>
                </div>

                {error && <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mb-4 mt-2 w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
