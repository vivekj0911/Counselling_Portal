import { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Import for navigation

const StudentQueueSidebar = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // ✅ Hook for navigation

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/desk/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // ✅ Allows cookies
                });

                if (!response.ok) {
                    throw new Error(response.status === 401 ? "Unauthorized: Please log in again." : "Failed to fetch students.");
                }

                const data = await response.json();
                setStudents(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStudents();
        // ✅ Listen for newly registered students
        const handleStudentRegistered = (event) => {
            setStudents((prevStudents) => [...prevStudents, event.detail.student]); // Append new student
        };

        // ✅ Listen for students moved to Desk2
        const handleStudentMoved = (event) => {
            setStudents((prevStudents) => prevStudents.filter((s) => s._id !== event.detail.studentId)); // Remove student
        };

        window.addEventListener("studentRegistered", handleStudentRegistered);
        window.addEventListener("studentMoved", handleStudentMoved);

        return () => {
            window.removeEventListener("studentRegistered", handleStudentRegistered);
            window.removeEventListener("studentMoved", handleStudentMoved);
        };

    }, []);

    const handleStudentClick = (studentId) => {
        navigate(`/desk1/${studentId}`); // ✅ Navigates to Desk1 with student ID
    };

    return (
        <div className="w-64 h-screen bg-white border-r p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Student Queue</h2>
                <Search className="w-5 h-5 text-gray-600 cursor-pointer" />
            </div>

            {loading ? (
                <div className="text-center text-gray-600">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
                <div className="space-y-2 overflow-y-auto flex-1">
                    {students.length === 0 ? (
                        <div className="text-center text-gray-500">No students in queue</div>
                    ) : (
                        students.map((student) => (
                            <div
                                key={student._id}
                                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition"
                                onClick={() => handleStudentClick(student._id)} // ✅ Handle click event
                            >
                                <div>
                                    <div className="text-sm font-medium">{student.firstname} {student.lastname}</div>
                                    <div className="text-xs text-gray-500">{student.email}</div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-600" />
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default StudentQueueSidebar;
