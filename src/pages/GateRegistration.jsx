import { useState } from "react";
import axios from "axios";
import Header from "../components/Header"; // ✅ Import Header

const GateRegistration = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        phone: "",
        email: "",
        purpose: "",
        stream: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formattedData = {
            firstname: formData.firstName,
            middlename: formData.middleName,
            lastname: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            purpose: formData.purpose,
            stream: formData.stream
        };
        try {
            const response = await axios.post("http://localhost:3000/api/gate/form", formattedData, {
                withCredentials: true
            });

            if (response.status === 201) {
                setMessage("✅ Student Registration Completed!");
                setTimeout(() => setMessage(""), 3000);

                // Clear form fields after successful registration
                setFormData({
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    phone: "",
                    email: "",
                    purpose: "",
                    stream: ""
                });
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Registration failed");
            setTimeout(() => setMessage(""), 3000);
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* ✅ Add Header */}
            <Header />

            {/* Form Section */}
            <div className="flex flex-col items-center justify-center flex-grow bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h2 className="text-xl font-semibold mb-4">Gate Registration</h2>

                    {message && (
                        <div
                            className={`text-sm px-4 py-2 rounded mb-4 ${
                                message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                            />
                            <input
                                type="text"
                                name="middleName"
                                placeholder="Middle Name"
                                value={formData.middleName}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                            />
                        </div>

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                        />

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                        />

                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                        />

                        <select
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                        >
                            <option value="">Select Purpose</option>
                            <option value="admission">Admission</option>
                            <option value="inquiry">Inquiry</option>
                        </select>

                        <select
                            name="stream"
                            value={formData.stream}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring focus:ring-blue-300 outline-none"
                        >
                            <option value="">Select Course</option>
                            <option value="eng">Engineering</option>
                            <option value="mba">Management</option>
                            <option value="pharma">Pharma</option>
                        </select>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GateRegistration;
