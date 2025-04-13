import { useState } from "react";
import axios from "axios";

const StudentExitForm = () => {
    const [studId, setStudId] = useState(""); // Token input
    const [student, setStudent] = useState(null); // Student details
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Fetch Student Details
    const fetchStudentDetails = async () => {
        if (!studId) {
            setMessage("❌ Please enter a valid student token!");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/gate/info/${studId}`, {
                withCredentials: true,
            });
            setStudent(response.data); // Store student details
            setMessage("");
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Student not found.");
            setStudent(null);
        }
        setLoading(false);
    };

    // ✅ Handle Student Exit (Update Exit Time in DB)
    const handleExit = async () => {
        if (!student) return;
        setLoading(true);
        try {
            await axios.post(`http://localhost:3000/api/gate/exit/${studId}`, {}, { withCredentials: true });
            setMessage("✅ Exit time recorded successfully!");
            setTimeout(() => setMessage(""), 3000);
            setStudId("");
            setStudent(null);
        } catch (err) {
            setMessage(err.response?.data?.message || "❌ Exit process failed.");
        }
        setLoading(false);
    };

    return (
        
        <div className="bg-white shadow-md w-full max-w-md border border-gray-200 rounded-lg p-6 ">
            <h2 className="text-2xl font-semibold text-red-700 tracking-tight border-b pb-3">Student Exit</h2>

            {message && (
                <div className={`px-6 py-3 text-sm ${message.includes("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                    {message}
                </div>
            )}

            {/* Token Input Field */}
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
                    <button onClick={fetchStudentDetails} className="bg-blue-700 text-white px-3 rounded-md">
                        {loading ? "Fetching..." : "Find Student"}
                    </button>
                </div>
            </div>

            {/* Show Student Details if Found */}
            {student && (
                <div className="border border-gray-200 p-4 rounded-md mb-4 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-700">Student Information</h3>
                    <p><strong>Name:</strong> {student.firstname} {student.lastname}</p>
                    <p><strong>Current Desk:</strong> {student.currentDesk}</p>
                </div>
            )}

            {/* Exit Button (Only Shows After Student is Found) */}
            {student && (
                <div className="flex justify-end">
                    <button onClick={handleExit} className="bg-red-700 text-white py-2 px-6 rounded-md hover:bg-red-500 transition">
                        {loading ? "Processing..." : "Exit"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default StudentExitForm;
