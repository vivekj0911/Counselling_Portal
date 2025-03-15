import { useState } from "react";
import axios from "axios";

const ReVisitForm = () => {
    const [studId, setStudId] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [student, setStudent] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Fetch student details using token (studId)
    const fetchStudentDetails = async () => {
        if (!studId) {
            setMessage("❌ Please enter a valid token!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/gate/info/${studId}`, { withCredentials: true });
            setStudent(response.data);
            setMessage("✅ Student details retrieved!");
        } catch (err) {
            setStudent(null);
            setMessage(err.response?.data?.message || "❌ Student not found.");
        }
        setLoading(false);
    };

    // ✅ Retrieve Student Token (if forgotten)
    const fetchToken = async () => {
        if (!email && !phone) {
            setMessage("❌ Please enter either Email or Phone to retrieve your token!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:3000/api/gate/studId", { params: { email, phone },  withCredentials: true });
            setStudId(response.data.studId);
            setMessage("✅ Token retrieved successfully!");
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Student not found.");
        }
        setLoading(false);
    };

    // ✅ Handle Re-Visit Entry
    const handleReVisit = async () => {
        if (!studId) {
            setMessage("❌ Please enter a valid student token!");
            return;
        }
        setLoading(true);
        try {
            await axios.post(`http://localhost:3000/api/gate/direct-entry/${studId}`, {}, { withCredentials: true });
            setMessage("✅ Re-visit recorded successfully!");
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Re-visit process failed.");
        }
        setLoading(false);
    };

    return (
        <div className="bg-white shadow-md w-full max-w-md border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-red-700 tracking-tight border-b pb-3">Student Re-Visit</h2>

            {message && (
                <div className={`px-6 py-3 text-sm ${message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {message}
                </div>
            )}

            {/* Token Input */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Enter Token (studId)</label>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={studId}
                        onChange={(e) => setStudId(e.target.value)}
                        placeholder="Enter Token..."
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-md"
                    />
                    <button onClick={fetchStudentDetails} className="bg-red-700 text-white px-3 rounded-md">
                        {loading ? "Loading..." : "Fetch Details"}
                    </button>
                </div>
            </div>

            <div className="text-gray-500 text-sm text-center">OR</div>

            {/* Retrieve Token Section */}
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Forgot Token? Retrieve using Email/Phone</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email..."
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-md mb-2"
                />
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter Phone..."
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-md"
                />
                <button onClick={fetchToken} className="w-full bg-gray-600 text-white py-2 mt-3 rounded-md">
                    {loading ? "Retrieving..." : "Get Token"}
                </button>
            </div>

            {/* Show Student Details */}
            {student && (
                <div className="border-t mt-4 pt-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Student Details</h3>
                    <div className="text-sm text-gray-700">
                        <p><strong>Name:</strong> {student.firstname} {student.lastname}</p>
                        <p><strong>Current Desk:</strong> {student.currentDesk}</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button onClick={handleReVisit} className="bg-blue-600 text-white py-2 px-6 rounded-md">
                            {loading ? "Processing..." : "Re-Visit"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReVisitForm;
