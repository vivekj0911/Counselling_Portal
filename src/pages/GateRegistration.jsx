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
<div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            {/* Header Component */}
            <Header />

            {/* Form Section */}
            <div className="flex items-center justify-center flex-grow py-6 px-4">
                <div className="bg-white shadow-md w-full max-w-3xl border border-gray-200 rounded-lg">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="text-2xl font-semibold text-red-700 tracking-tight">Gate Registration</h2>
                    </div>

                    {message && (
                        <div
                            className={`px-6 py-3 text-sm ${
                                message.includes("✅") 
                                    ? "bg-green-50 text-green-700 border-b border-green-100" 
                                    : "bg-red-50 text-red-700 border-b border-red-100"
                            }`}
                        >
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="p-6">
                        {/* Name Section */}
                        <div className="mb-3 pb-2 border-b border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Personal Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                                    <input
                                        id="firstName"
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="middleName" className="block text-sm font-medium text-gray-600 mb-1">Middle Name</label>
                                    <input
                                        id="middleName"
                                        type="text"
                                        name="middleName"
                                        value={formData.middleName}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                                    <input
                                        id="lastName"
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="mb-4 pb-4 border-b border-gray-100">
                            <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Contact Information</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Course & Purpose Section */}
                        <div className="mb-6">
                            <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Visit Details</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                <div>
                                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-600 mb-1">Purpose of Visit</label>
                                    <select
                                        id="purpose"
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base appearance-none bg-white"
                                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23737373' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                                                backgroundPosition: "right 0.5rem center", 
                                                backgroundRepeat: "no-repeat", 
                                                backgroundSize: "1.5em 1.5em" }}
                                    >
                                        <option value="">Select Purpose</option>
                                        <option value="admission">Admission</option>
                                        <option value="inquiry">Inquiry</option>
                                        <option value="visit">Campus Visit</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="stream" className="block text-sm font-medium text-gray-600 mb-1">Interested Course</label>
                                    <select
                                        id="stream"
                                        name="stream"
                                        value={formData.stream}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base appearance-none bg-white"
                                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23737373' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", 
                                                backgroundPosition: "right 0.5rem center", 
                                                backgroundRepeat: "no-repeat", 
                                                backgroundSize: "1.5em 1.5em" }}
                                    >
                                        <option value="">Select Course</option>
                                        <option value="eng">Engineering</option>
                                        <option value="mba">Management</option>
                                        <option value="pharma">Pharmacy</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-red-700 text-white py-2.5 px-6 rounded-md hover:bg-red-500 transition disabled:opacity-60 text-sm font-semibold tracking-wide"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing...
                                    </span>
                                ) : (
                                    "Register Visitor"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GateRegistration;