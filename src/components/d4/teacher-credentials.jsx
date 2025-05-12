"use client";

export default function TeacherCredentials({ id, password, onReset }) {
  return (
    <div className="text-center">
      <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-medium text-green-800 mb-3">Registration Successful!</h3>
        <p className="mb-3">Please share these credentials with the teacher:</p>

        <div className="bg-white p-4 rounded border border-gray-200 mb-4">
          <p className="mb-2">
            <span className="font-bold">Teacher ID:</span>
            <span className="ml-2 text-blue-700">{id}</span>
          </p>
          <p>
            <span className="font-bold">Password:</span>
            <span className="ml-2 text-blue-700">{password}</span>
          </p>
        </div>
        <p className="text-sm text-gray-600">Make sure to save these credentials as they won't be shown again.</p>
      </div>
      <button onClick={onReset} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Register Another Teacher
      </button>
    </div>
  );
}
