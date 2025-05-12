"use client";

import { useState } from "react";

export default function TeacherForm({ onSubmit }) {
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(teacherData);
    // Reset form
    setTeacherData({ name: "", email: "", department: "", role: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm text-gray-600 mb-2" htmlFor="teacherName">
          Full Name
        </label>
        <input
          type="text"
          id="teacherName"
          className="w-full p-3 border rounded"
          value={teacherData.name}
          onChange={(e) => setTeacherData({ ...teacherData, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2" htmlFor="teacherEmail">
          Email
        </label>
        <input
          type="email"
          id="teacherEmail"
          className="w-full p-3 border rounded"
          value={teacherData.email}
          onChange={(e) => setTeacherData({ ...teacherData, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2" htmlFor="teacherDepartment">
          Department
        </label>
        <select
          id="teacherDepartment"
          className="w-full p-3 border rounded"
          value={teacherData.department}
          onChange={(e) => setTeacherData({ ...teacherData, department: e.target.value })}
          required
        >
          <option value="">Select Department</option>
          <option value="Engineering">Engineering</option>
          <option value="Pharmacy">Pharmacy</option>
          <option value="Medicine">Medicine</option>
          <option value="Science">Science</option>
        </select>
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-2" htmlFor="teacherRole">
          Role
        </label>
        <select
          id="teacherRole"
          className="w-full p-3 border rounded"
          value={teacherData.role}
          onChange={(e) => setTeacherData({ ...teacherData, role: e.target.value })}
          required
        >
          <option value="">Select Role</option>
          <option value="Professor">Professor</option>
          <option value="Associate Professor">Associate Professor</option>
          <option value="Assistant Professor">Assistant Professor</option>
          <option value="Lecturer">Lecturer</option>
          <option value="Lab Assistant">Lab Assistant</option>
        </select>
      </div>
      <button type="submit" className="w-full mt-4 bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600">
        Register Teacher
      </button>
    </form>
  );
}

