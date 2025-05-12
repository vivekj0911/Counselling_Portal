import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TeacherList({ teachers, onEdit, onDelete }) {
  const [teacherSearch, setTeacherSearch] = useState("");

  // Filter teachers based on search input
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      teacher.department.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      teacher.email.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      teacher.role.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  return (
    <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Teacher List</h2>

      <input
        type="text"
        placeholder="Search teachers..."
        value={teacherSearch}
        onChange={(e) => setTeacherSearch(e.target.value)}
        className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredTeachers.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{teacher.name}</div>
                    <div className="text-sm text-gray-500">{teacher.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <button onClick={() => onEdit(teacher)} className="text-blue-600 hover:text-blue-900">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => onDelete(teacher.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-center py-4">No teachers found</p>
      )}
    </div>
  );
}
