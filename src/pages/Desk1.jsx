import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Desk1 = () => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!studentId) return; // ✅ Skip fetching if no student is selected

        const fetchStudentDetails = async () => {
          setLoading(true);
          try {
              const response = await fetch(`http://localhost:3000/api/desk/${studentId}`, {
                  method: "GET",
                  credentials: "include", // ✅ Ensures cookies are sent
                  headers: {
                      "Content-Type": "application/json",
                  },
              });
      
              if (!response.ok) {
                  throw new Error("Failed to fetch student details.");
              }
      
              const data = await response.json();
              setStudent(data);
          } catch (err) {
              setError(err.message);
          } finally {
              setLoading(false);
          }
      };
      
        fetchStudentDetails();
    }, [studentId]);

    return (
        <div>
            {!studentId ? (
                <p className="text-gray-500">Select a student from the queue.</p> // ✅ Default message
            ) : loading ? (
                <p>Loading student details...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : student ? (
                <div>
                    <h2 className="text-xl font-semibold">Student Details</h2>
                    <p><strong>Name:</strong> {student.firstname} {student.lastname}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <p><strong>Registration No:</strong> {student.registrationNumber}</p>
                </div>
            ) : (
                <p className="text-gray-500">Student data not found.</p>
            )}
        </div>
    );
};

export default Desk1;
