"use client";

import { X } from "lucide-react";
import { useState } from "react";

export default function TeacherModal({ teacher, show, onClose, onSave }) {
  const [editingTeacher, setEditingTeacher] = useState(teacher);

  if (!show || !editingTeacher) return null;

  const handleSave = (e) => {
    e.preventDefault();
    if (editingTeacher) {
      onSave(editingTeacher);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Edit Teacher</h3>
          <button onClick={onClose} className="p-1 hover:bg-blue-700 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-2" htmlFor="teacherName">
                Full Name
              </label>
              <input
                type="text"
                id="teacherName"
                className="w-full p-3 border rounded"
                value={editingTeacher.name}
                onChange={(e) =>
                  setEditingTeacher({
                    ...editingTeacher,
                    name: e.target.value,
                  })
                }
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
                value={editingTeacher.email}
                onChange={(e) =>
                  setEditingTeacher({
                    ...editingTeacher,
                    email: e.target.value,
                  })
                }
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
                value={editingTeacher.department}
                onChange={(e) =>
                  setEditingTeacher({
                    ...editingTeacher,
                    department: e.target.value,
                  })
                }
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
                value={editingTeacher.role}
                onChange={(e) =>
                  setEditingTeacher({
                    ...editingTeacher,
                    role: e.target.value,
                  })
                }
                required
              >
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Lecturer">Lecturer</option>
                <option value="Lab Assistant">Lab Assistant</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                className="bg-gray-300 text-gray-800 py-2 px-5 rounded hover:bg-gray-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button type="submit" className="bg-blue-500 text-white py-2 px-5 rounded hover:bg-blue-600">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
