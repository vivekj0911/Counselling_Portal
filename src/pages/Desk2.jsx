import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Desk2() {
    const { studentId } = useParams(); // student ID from URL
    const navigate = useNavigate(); // for navigation
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        campusVisit: false,
        cafeteriaVisit: false,
        sportsFacilityVisit: false,
        labVisit: false,
        classroomVisit: false,
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
                console.error("Fetch student error:", err);
                setError(err.response?.data?.message || "Failed to fetch student details");
            } finally {
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, [studentId]);


    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:3000/api/desk/2/update/${studentId}`,
                formData,
                { withCredentials: true }
            );

            // ✅ Notify the queue sidebar that a student was processed
            window.dispatchEvent(new CustomEvent("studentMoved", { detail: { studentId } }));

            setStudent(null); // Clear the student data after processing
            setSuccess("Information successfully updated and student sent to Desk 3.");
            setFormData({ topic: "", remarks: "" });
            navigate("/desk2"); // Redirect to Desk 2 page
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
                    <h2 className="text-2xl font-semibold text-red-700 mb-6 text-center">Desk 2 - Counselling Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Campus Visit Details */}
                        <fieldset className="border border-gray-300 p-6 rounded-md">
                            <legend className="text-lg font-semibold text-red-700 px-2">Campus Visit Details</legend>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="campusVisit" checked={formData.campusVisit} onChange={handleChange} className="w-5 h-5" />
                                    <label className="font-medium">Campus Visit</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="cafeteriaVisit" checked={formData.cafeteriaVisit} onChange={handleChange} className="w-5 h-5" />
                                    <label className="font-medium">Cafeteria Visit</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="sportsFacilityVisit" checked={formData.sportsFacilityVisit} onChange={handleChange} className="w-5 h-5" />
                                    <label className="font-medium">Sports Facility Visit</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="labVisit" checked={formData.labVisit} onChange={handleChange} className="w-5 h-5" />
                                    <label className="font-medium">Lab Visit</label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" name="classroomVisit" checked={formData.classroomVisit} onChange={handleChange} className="w-5 h-5" />
                                    <label className="font-medium">Classroom Visit</label>
                                </div>
                            </div>
                        </fieldset>
                        {/* Remarks */}
                        <fieldset className="border border-gray-300 p-6 rounded-md">
                            <legend className="text-lg font-semibold text-red-700 px-2">Remarks</legend>
                            <div className="flex flex-col">
                                <label className="font-medium">Additional Remarks</label>
                                <textarea name="remarks" rows="3" className="input-field resize-none" value={formData.remarks} onChange={handleChange}></textarea>
                            </div>
                        </fieldset>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition disabled:opacity-50">
                            {loading ? "Submitting..." : "Submit & Send to Desk 3"}
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
