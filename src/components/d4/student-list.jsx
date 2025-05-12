"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function StudentList({ students, onStudentClick }) {
  const [studentSearch, setStudentSearch] = useState("");

  // Filter students based on search input
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.field.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Student List</h2>

        {/* Search bar for students */}
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search students..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>

      {filteredStudents.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {filteredStudents.map((student) => (
            <li
              key={student.id}
              className="py-4 cursor-pointer hover:bg-gray-50"
              onClick={() => onStudentClick(student)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{student.name}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{student.field}</span>
                    <span className="text-xs text-gray-500 ml-2">{student.admissionDate}</span>
                  </div>
                </div>
                <div className="text-blue-500 hover:text-blue-700">View Details</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-8">No students found</p>
      )}
    </div>
  );
}
