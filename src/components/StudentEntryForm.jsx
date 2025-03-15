import { useState } from "react";
import axios from "axios";

const StudentEntryForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        gender:"",
        phone: "",
        email: "",
        purpose: "",
        stream: "",
        visitors: 0
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
            lastname: formData.lastName,
            gender: formData.gender,
            phone: formData.phone,
            email: formData.email,
            purpose: formData.purpose,
            stream: formData.stream,
            visitors: formData.visitors
        };
        try {
            const response = await axios.post("http://localhost:3000/api/gate/form", formattedData, {
                withCredentials: true
            });

            if (response.status === 201) {
                const { studId } = response.data; // ✅ Extract the generated token
            // setMessage(`✅ Student Registration Completed! Token: ${studId}`);

            // ✅ Display token in an alert window
            alert(`Your unique token: ${studId}\nPlease note it down for future reference.`);
                window.dispatchEvent(new CustomEvent("studentRegistered", { detail: { student: response.data } }));

                // Clear form fields after successful registration
                setFormData({
                    firstName: "",
                    lastName: "",
                    gender: "",
                    phone: "",
                    email: "",
                    purpose: "",
                    stream: "",
                    visitors:0
                });
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Registration failed");
            setTimeout(() => setMessage(""), 3000);
        }
        setLoading(false);
    };

    return (
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
                {/* Personal Information */}
                <div className="mb-3 pb-2 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                            <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                            <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base bg-white"
                            >
                                <option value="" defaultChecked="male">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="mb-4 pb-4 border-b border-gray-100">
                    <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                            <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                            <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                            />
                        </div>
                    </div>
                </div>

                {/* Purpose & Stream */}
                <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase tracking-wide">Visit Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="purpose" className="block text-sm font-medium text-gray-600 mb-1">Purpose of Visit</label>
                            <select id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} required
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base bg-white"
                            >
                                <option value="">Select Purpose</option>
                                <option value="admission">Admission</option>
                                <option value="inquiry">Inquiry</option>
                                <option value="visit">Campus Visit</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="stream" className="block text-sm font-medium text-gray-600 mb-1">Interested Course</label>
                            <select id="stream" name="stream" value={formData.stream} onChange={handleChange} required
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base bg-white"
                            >
                                <option value="">Select Course</option>
                                <option value="eng">Engineering</option>
                                <option value="mba">Management</option>
                                <option value="phr">Pharmacy</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="visitors" className="block text-sm font-medium text-gray-600 mb-1">Number of Visitors</label>
                            <input id="visitors" type="number" name="visitors" value={formData.visitors} onChange={handleChange} min="0" required
                                className="w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:ring-1 focus:ring-gray-700 focus:border-gray-700 text-base"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" disabled={loading} className="bg-red-700 text-white py-2.5 px-6 rounded-md hover:bg-red-500 transition disabled:opacity-60 text-sm font-semibold">
                        {loading ? "Processing..." : "Register Visitor"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StudentEntryForm;
