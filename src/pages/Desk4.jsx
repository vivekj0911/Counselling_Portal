import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Desk4() {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        admissionStatus: false,
        reason: "",
        remarks: ""
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

    const isFormValid =
        formData.admissionStatus &&
        (formData.admissionStatus === "approved" || (formData.admissionStatus === "rejected" && formData.reason.trim() !== "")) &&
        formData.remarks.trim() !== "";

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        try {
            await axios.put(
                `http://localhost:3000/api/desk/4/update/${studentId}`,
                {
                    admissionStatus: formData.admissionStatus,
                    reason: formData.reason.trim(),
                    remarks: formData.remarks.trim()
                },
                { withCredentials: true }
            );

            window.dispatchEvent(new CustomEvent("studentMoved", { detail: { studentId } }));

            setSuccess("Student successfully processed and marked as completed.");
            setFormData({ admissionStatus: "", reason: "", remarks: "" });
            setStudent(null);
            navigate("/desk4");
        } catch (err) {
            setError("Update failed. Please try again.");
            console.error(err);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg">
            {!studentId ? (
                <p className="text-gray-500">Select a student from the queue.</p>
            ) : loading ? (
                <p>Loading student details...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : student ? (
                <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl p-6 rounded-2xl">
                    <h2 className="text-2xl font-semibold text-red-700 mb-6 text-center">Desk 4 - Final Admission Decision</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Admission Status */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="admissionStatus">
                                Admission Status <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="admissionStatus"
                                name="admissionStatus"
                                value={formData.admissionStatus}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-700"
                            >
                                <option value="">-- Select --</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        {/* Reason for Rejection */}
                        {formData.admissionStatus === "rejected" && (
                            <div>
                                <label className="block text-gray-700 font-medium mb-1" htmlFor="reason">
                                    Reason for Rejection <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="reason"
                                    name="reason"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-700"
                                    placeholder="Provide a brief reason for rejection"
                                />
                            </div>
                        )}


                        {/* Remarks */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-1" htmlFor="remarks">
                                Remarks
                            </label>
                            <textarea
                                id="remarks"
                                name="remarks"
                                value={formData.remarks}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-red-700"
                                placeholder="Additional notes or comments"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className="w-full bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition disabled:opacity-50"
                        >
                            {loading ? "Submitting..." : "Submit & Complete"}
                        </button>

                        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
                        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                    </form>
                </div>
            ) : (
                <p className="text-gray-500">Student data not found.</p>
            )}
        </div>
    );
}
