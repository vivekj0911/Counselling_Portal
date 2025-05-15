

import { useState, useEffect } from "react";
import axios from "axios";
import StudentDetailModal from "./StudentDetailModal";

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudents();
  }, [selectedDate]);

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = students.filter(
      (s) =>
        s.firstname.toLowerCase().includes(lowerTerm) ||
        s.studId.toLowerCase().includes(lowerTerm)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const fetchStudents = async () => {
    try {
      const formattedDate = selectedDate
        ? new Date(selectedDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })
            .toUpperCase()
            .replace(/ /g, "")
        : "today";

      const response = await axios.get(
        `http://localhost:3000/api/desk/date/${formattedDate}`,
        {
          withCredentials: true,
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch students");
      }

      setStudents(response.data);
      setSearchTerm(""); // reset search on date change
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  return (
    <div>
      {/* Sticky Header with Search + Date */}
      <div className="flex items-center justify-between mb-2 sticky top-0 bg-white z-10 p-2 border-b gap-2">
        <h2 className="text-xl font-bold">Students</h2>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-2 py-1 rounded w-50"
        />

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border px-2 py-1 rounded"
        />
      </div>

      {/* Scrollable List */}
      <div className="overflow-y-auto max-h-[60vh] border rounded p-2 font-bold">
        {filteredStudents.map((student) => (
          <div
            key={student._id}
            onClick={() => setSelectedStudent(student)}
            className="cursor-pointer border-b py-2 hover:bg-gray-100"
          >
            {student.firstname} — {student.studId}
          </div>
        ))}
        {filteredStudents.length === 0 && (
          <div className="text-gray-500 text-sm">No matching students found.</div>
        )}
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
