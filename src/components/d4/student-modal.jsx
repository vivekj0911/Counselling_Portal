"use client";

import { X } from "lucide-react";

export default function StudentModal({ student, show, onClose }) {
  if (!show || !student) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-blue-600 text-white p-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">Student Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-blue-700 rounded">
            <X size={24} />
          </button>
        </div>

        <div className="p-8">
          <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-bold text-2xl text-blue-800">{student.name}</h3>
            <div className="flex items-center mt-2">
              <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">{student.field}</span>
              <span className="ml-3 text-gray-600">ID: {student.id}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-semibold text-lg border-b pb-2">Personal Information</h4>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{student.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{student.phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{student.address}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{student.age}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Blood Group</p>
                <p className="font-medium">{student.bloodGroup}</p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-semibold text-lg border-b pb-2">Academic Information</h4>

              <div>
                <p className="text-sm text-gray-500">Course</p>
                <p className="font-medium">{student.course}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Admission Date</p>
                <p className="font-medium">{student.admissionDate}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Previous School</p>
                <p className="font-medium">{student.previousSchool}</p>
              </div>

              <h4 className="font-semibold text-lg border-b pb-2 mt-8">Emergency Contact</h4>

              <div>
                <p className="text-sm text-gray-500">Parent/Guardian Name</p>
                <p className="font-medium">{student.parentName}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Emergency Contact</p>
                <p className="font-medium">{student.emergencyContact}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <button className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
