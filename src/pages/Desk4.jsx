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
        <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg">
            {!studentId ? (
                <p className="text-gray-500">Select a student from the queue.</p>
            ) : loading ? (
                <p>Loading student details...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : student ? (
                <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl p-6 rounded-2xl">
                    <h2 className="text-2xl font-semibold text-red-700 mb-6 text-center">Desk 4 - Final Admission Decision</h2>
                    {/* Personal Details */}
                    <fieldset className="border border-gray-300 p-6 rounded-md">
                        <legend className="text-lg font-semibold text-red-700 px-2">Personal Details</legend>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="font-medium">Student Name</label>
                                <input name="studentName" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={`${student.firstname} ${student.lastname}`} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Father&apos;s Name</label>
                                <input name="fatherName" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.fatherName} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Mother&apos;s Name</label>
                                <input name="motherName" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.motherName} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Gender</label>
                                <input name="gender" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student?.gender === "male" ? "Male" : student?.gender === "female" ? "Female" : student?.gender === "other" ? "Other" : student?.gender || "Not Available"} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Email</label>
                                <input name="email" type="email" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={`${student.email}`} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Phone No</label>
                                <input name="phone" type="text" maxLength={10} pattern="\d{10}" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={`${student.phone}`} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Purpose</label>
                                <input name="purpose" type="text" maxLength={10} pattern="\d{10}" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student?.purpose === "admission" ? "Admission" : student?.purpose === "inquiry" ? "Inquiry" : student?.purpose === "visit" ? "Campus Visit" : student?.purpose || "Not Available"} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Stream</label>
                                <input name="stream" type="text" maxLength={10} pattern="\d{10}" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student?.stream === "phr" ? "Pharmacy" : student?.stream === "eng" ? "Engineering" : student?.stream === "mba" ? "Management" : student?.stream === "libart" ? "Liberal Arts" : student?.stream || "Not Available"} readOnly />
                            </div>
                            <div className="col-span-2 flex flex-col">
                                <label className="font-medium">Address</label>
                                <textarea name="address" rows="3" className="input-field resize-none text-gray-600 bg-gray-100 mb-3 resize-none" value={student.desk_updates.desk1.address} readOnly></textarea>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Pin Code</label>
                                <input name="pinCode" type="text" maxLength={6} pattern="\d{6}" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.pinCode} readOnly />
                            </div>
                        </div>
                    </fieldset>

                    {/* Religious Details */}
                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">Religious Details</legend>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col">
                                <label className="font-medium">Nationality</label>
                                <input name="nationality" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.nationality} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Category</label>
                                <input name="category" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.category} readOnly />
                            </div>
                        </div>
                    </fieldset>

                    {/* SSC Details */}
                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">SSC Details</legend>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label className="font-medium">Board</label>
                                <input name="sscBoard" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.sscBoard} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Year</label>
                                <input name="sscYear" type="text" maxLength={4} pattern="\d{4}" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.sscYear} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Marks</label>
                                <input name="sscMarks" type="number" min={1} className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.sscMarks} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Out of</label>
                                <input name="sscOutOf" type="number" min={500} max={600} className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.sscOutOf} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Percentage</label>
                                <input name="sscPercentage" type="number" min={1} max={100} className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.sscPercentage} readOnly />
                            </div>
                        </div>
                    </fieldset>

                    {/* HSC Details */}
                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">HSC Details</legend>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label className="font-medium">Board</label>
                                <input name="hscBoard" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.hscBoard} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Year</label>
                                <input name="hscYear" type="text" maxLength={4} pattern="\d{4}" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.hscYear} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Marks</label>
                                <input name="hscMarks" type="number" min={1} className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.hscMarks} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Out of</label>
                                <input name="hscOutOf" type="number" min={500} max={600} className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.hscOutOf} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Percentage</label>
                                <input name="hscPercentage" type="number" min={1} max={100} className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.hscPercentage} readOnly />
                            </div>
                        </div>
                    </fieldset>

                    {/* JEE Details */}
                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">JEE Details</legend>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label className="font-medium">Year</label>
                                <input name="jeeYear" type="text" maxLength={4} pattern="\d{4}" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.jeeYear} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Percentile</label>
                                <input name="jeePercentile" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.jeePercentile == '' ? "Not filled" : student.desk_updates.desk1.jeePercentile} />
                            </div>
                        </div>
                    </fieldset>

                    {/* MHT-CET Details */}
                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">MHT-CET Details</legend>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label className="font-medium">Year</label>
                                <input name="cetYear" type="text" maxLength={4} pattern="\d{4}" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.cetYear} readOnly />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Percentile</label>
                                <input name="cetPercentile" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.cetPercentile == '' ? "Not filled" : student.desk_updates.desk1.cetPercentile} />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Enrollment ID</label>
                                <input name="enrollmentId" type="text" value={student.desk_updates.desk1.enrollmentId} className="input-field resize-none text-gray-600 bg-gray-100 mb-3" />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">Branch</label>
                                <input name="branch" type="text" className="input-field resize-none text-gray-600 bg-gray-100 mb-3" value={student.desk_updates.desk1.branch == '' ? "Not filled" : student.desk_updates.desk1.branch} />
                            </div>
                        </div>
                    </fieldset>

                    {/*Desk1 remarks*/}
                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">Desk1 - Remarks</legend>
                        <div className="flex flex-col">
                            <label className="font-medium">Additional Remarks</label>
                            <textarea name="remarks" rows="3" className="input-field resize-none text-gray-600 bg-gray-100 mb-3 resize-none" value={student.desk_updates.desk1.remarks} ></textarea>
                        </div>
                    </fieldset>

                    {/* Campus Visit Details */}
                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">Campus Visit Details</legend>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="campusVisit" checked={student.desk_updates.desk2.campusVisit} className="w-5 h-5" readOnly />
                                <label className="font-medium">Campus Visit</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="cafeteriaVisit" checked={student.desk_updates.desk2.cafeteriaVisit} className="w-5 h-5" readOnly />
                                <label className="font-medium">Cafeteria Visit</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="sportsFacilityVisit" checked={student.desk_updates.desk2.sportsFacilityVisit} className="w-5 h-5" readOnly />
                                <label className="font-medium">Sports Facility Visit</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="labVisit" checked={student.desk_updates.desk2.labVisit} className="w-5 h-5" readOnly />
                                <label className="font-medium">Lab Visit</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" name="classroomVisit" checked={student.desk_updates.desk2.classroomVisit} className="w-5 h-5" readOnly />
                                <label className="font-medium">Classroom Visit</label>
                            </div>
                        </div>
                    </fieldset>


                    {/* Desk2 Remarks */}
                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">Desk2 - Remarks</legend>
                        <div className="flex flex-col">
                            <label className="font-medium">Remarks</label>
                            <textarea name="remarks" rows="3" className="input-field resize-none text-gray-600 bg-gray-100 mb-3 resize-none" value={student.desk_updates.desk2.remarks} ></textarea>
                        </div>
                    </fieldset>

                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">Counselling Topic</legend>
                        <div className="flex flex-col">
                            <label className="font-medium">Topic</label>
                            <textarea name="remarks" rows="3" className="input-field text-gray-600 bg-gray-100 resize-none h-11" value={student.desk_updates.desk3.topic} ></textarea>
                        </div>
                    </fieldset>

                    <fieldset className="border border-gray-300 p-6 rounded-md mt-3">
                        <legend className="text-lg font-semibold text-red-700 px-2">Desk3 - Remarks</legend>
                        <div className="flex flex-col">
                            <label className="font-medium">Remarks</label>
                            <textarea name="remarks" rows="3" className="input-field resize-none text-gray-600 bg-gray-100 mb-3 resize-none" value={student.desk_updates.desk3.remarks} ></textarea>
                        </div>
                    </fieldset>

                    {/* <button type="submit" className="w-full bg-red-700 text-white py-3 rounded-md text-lg hover:bg-red-800 transition">Submit</button> */}

                    <form onSubmit={handleSubmit} className="space-y-5 mt-4">
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
