import { useState, useEffect } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ Added useLocation

const StudentQueueSidebar = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation(); // ✅ Get current path

    // ✅ Extract current desk number from URL (e.g., /desk2 => desk2)
    const currentDesk = location.pathname.split("/")[1];

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/desk/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
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

        const handleStudentRegistered = (event) => {
            setStudents((prev) => [...prev, event.detail.student]);
        };

        const handleStudentMoved = (event) => {
            setStudents((prev) => prev.filter((s) => s._id !== event.detail.studentId));
        };

        window.addEventListener("studentRegistered", handleStudentRegistered);
        window.addEventListener("studentMoved", handleStudentMoved);

        return () => {
            window.removeEventListener("studentRegistered", handleStudentRegistered);
            window.removeEventListener("studentMoved", handleStudentMoved);
        };
    }, []);

    const handleStudentClick = (studentId) => {
        // ✅ Navigate to dynamic desk route
        navigate(`/${currentDesk}/${studentId}`);
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
                                onClick={() => handleStudentClick(student._id)}
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
