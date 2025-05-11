import { useState, useEffect } from "react";
import axios from "axios";
import StudentDetailModal from "./StudentDetailModal";

const AdminStudentList = () => {
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, [selectedDate]);

    const fetchStudents = async () => {
        try {
            const formattedDate = selectedDate
                ? new Date(selectedDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                }).toUpperCase().replace(/ /g, '') // e.g. "08MAY24"
                : "today";

            const response = await axios.get(`http://localhost:3000/api/desk/date/${formattedDate}`, {
                withCredentials: true,
            });
            if (response.status !== 200) {
                throw new Error("Failed to fetch students");
            }

        setStudents(response.data);
    } catch (err) {
        console.error("Failed to fetch students:", err);
    }
};

return (
    <div>
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Students</h2>
            <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border px-2 py-1 rounded"
            />
        </div>

        <div className="overflow-y-auto max-h-[60vh] border rounded p-2">
            {students.map(student => (
                <div
                    key={student._id}
                    onClick={() => setSelectedStudent(student)}
                    className="cursor-pointer border-b py-2 hover:bg-gray-100"
                >
                    {student.firstname} — {student.studId}
                </div>
            ))}
        </div>

        {selectedStudent && (
            <StudentDetailModal
                student={selectedStudent}
                onClose={() => setSelectedStudent(null)}
            />
        )}
    </div>
);
};

export default AdminStudentList;
