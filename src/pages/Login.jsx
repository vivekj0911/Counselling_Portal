import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../index.css'
import { jwtDecode } from "jwt-decode"; // To decode token

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
        try {
            const response = await axios.post("http://localhost:3000/api/auth/gate/login", formData, {
                withCredentials: true,  // Allow cookies to be sent
            });

            const { token } = response.data;
            localStorage.setItem("token", token);  // Store token
            // Decode the token to get role
            const decoded = jwtDecode(token);
            const userRole = decoded.role;
            navigate(`/${userRole}`);

            
           
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
                <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
