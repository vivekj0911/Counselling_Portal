import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Desk3() {
  const { studentId } = useParams(); // student ID from URL
  const navigate = useNavigate(); // for navigation
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    topic: "",
    remarks: "",
  });


  useEffect(() => {

    if (!studentId) return;

    const fetchStudentDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3000/api/desk/${studentId}`, {
          withCredentials: true,
        });
        setStudent(response.data);
      } catch (err) {
        console.error("Fetch student error:", err);
        setError(err.response?.data?.message || "Failed to fetch student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [studentId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = formData.topic.trim() !== "" && formData.remarks.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      await axios.put(
        `http://localhost:3000/api/desk/3/update/${studentId}`,
        { topic: formData.topic.trim(), remarks: formData.remarks.trim() },
        { withCredentials: true }
      );

      // ✅ Notify the queue sidebar that a student was processed
      window.dispatchEvent(new CustomEvent("studentMoved", { detail: { studentId } }));

      setStudent(null); // Clear the student data after processing
      setSuccess("Information successfully updated and student sent to Desk 3.");
      setFormData({ topic: "", remarks: "" });
      navigate("/desk3"); // Redirect to Desk 2 page
    } catch (err) {
      setError("Failed to update. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white  rounded-lg">
      {!studentId ? (
        <p className="text-gray-500">Select a student from the queue.</p>
      ) : loading ? (
        <p>Loading student details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : student ? (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl p-6 rounded-2xl">
          <h2 className="text-2xl font-semibold text-red-700 mb-6 text-center">Desk 3 - Counselling Details</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="topic">
                Counselling Topic <span className="text-red-500">*</span>
              </label>
              <input
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="e.g. CS, AI, EnTC, Mech etc."
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1" htmlFor="remarks">
                Remarks <span className="text-red-500">*</span>
              </label>
              <textarea
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-700"
                placeholder="Write any observations or recommendations..."
              />
            </div>

            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit & Send to Desk 4"}
            </button>

            {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </form>
        </div>
      ) : (
        <p className="text-gray-500">Student data not found.</p>
      )}
    </div>
  )
}
