import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const Desk1 = () => {
    const { studentId } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        fatherName: "",
        motherName: "",
        nationality: "",
        category: "",
        address: "",
        pinCode: "",
        sscBoard: "",
        sscYear: "",
        sscMarks: "",
        sscOutOf: "",
        sscPercentage: "",
        hscBoard: "",
        hscYear: "",
        hscPhysics: "",
        hscChemistry: "",
        hscMaths: "",
        hscTotalMarks: "",
        hscPercentage: "",
        jeeYear: "",
        jeePercentage: "",
        cetYear: "",
        cetPercentage: "",
        enrollmentId: "EN24",
        branch: "",
        campusVisit: false,
        cafeteriaVisit: false,
        sportsFacilityVisit: false,
        labVisit: false,
        classroomVisit: false,
        remarks: ""
    });
    // Fetch student details

    useEffect(() => {
        if (!studentId) return;

        const fetchStudentDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/desk/${studentId}`, {
                    withCredentials: true,
                });
                setStudent(response.data);
                console.log(student);

            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch student details");
            } finally {
                setLoading(false);
            }
        };

        fetchStudentDetails();
    }, [studentId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/desk/1/update/${studentId}`, formData, {
                withCredentials: true,
            });

            alert("Student details updated! They are now at Desk2.");


            // ✅ Notify the queue sidebar that a student was processed
            window.dispatchEvent(new CustomEvent("studentMoved", { detail: { studentId } }));

            setStudent(null);
            setFormData({
                fatherName: "",
                motherName: "",
                nationality: "",
                category: "",
                address: "",
                pinCode: "",
                sscBoard: "",
                sscYear: "",
                sscMarks: "",
                sscOutOf: "",
                sscPercentage: "",
                hscBoard: "",
                hscYear: "",
                hscPhysics: "",
                hscChemistry: "",
                hscMaths: "",
                hscTotalMarks: "",
                hscPercentage: "",
                jeeYear: "",
                jeePercentage: "",
                cetYear: "",
                cetPercentage: "",
                enrollmentId: "EN24",
                branch: "",
                campusVisit: false,
                cafeteriaVisit: false,
                sportsFacilityVisit: false,
                labVisit: false,
                classroomVisit: false
            });

            // ✅ Navigate to the base Desk1 page (removes studentId from URL)
            navigate("/desk1");
        } catch (err) {
            alert(err.response?.data?.message || "Failed to update student details.");
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
                <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">Student Registration</h2>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Details */}
                        <fieldset className="border border-gray-300 p-6 rounded-md">
                            <legend className="text-lg font-semibold text-red-700 px-2">Personal Details</legend>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="font-medium">Student Name</label>
                                    <input name="studentName" type="text" className="input-field" value={`${student.firstname} ${student.lastname}`} readOnly />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Father's Name</label>
                                    <input name="fatherName" type="text" className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Mother's Name</label>
                                    <input name="motherName" type="text" className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Gender</label>
                                    <input name="gender" type="text" className="input-field" value={student?.gender === "male" ? "Male" : student?.gender === "female" ? "Female" : student?.gender === "other" ? "Other" : student?.gender || "Not Available"} readOnly />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Email</label>
                                    <input name="email" type="email" className="input-field" value={`${student.email}`} readOnly />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Phone No</label>
                                    <input name="phone" type="text" maxLength={10} pattern="\d{10}" className="input-field" value={`${student.phone}`} readOnly />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Purpose</label>
                                    <input name="purpose" type="text" maxLength={10} pattern="\d{10}" className="input-field" value={student?.purpose === "admission" ? "Admission" : student?.purpose === "inquiry" ? "Inquiry" : student?.purpose === "visit" ? "Campus Visit" : student?.purpose || "Not Available"} readOnly />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Stream</label>
                                    <input name="stream" type="text" maxLength={10} pattern="\d{10}" className="input-field" value={student?.stream === "phr" ? "Pharmacy" : student?.stream === "eng" ? "Engineering" : student?.stream === "mba" ? "Management" : student?.stream || "Not Available"} readOnly />
                                </div>
                                <div className="col-span-2 flex flex-col">
                                    <label className="font-medium">Address</label>
                                    <textarea name="address" rows="3" className="input-field resize-none" onChange={handleChange} required></textarea>
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Pin Code</label>
                                    <input name="pinCode" type="text" maxLength={6} pattern="\d{6}" className="input-field" onChange={handleChange} required />
                                </div>
                            </div>
                        </fieldset>

                        {/* Religious Details */}
                        <fieldset className="border border-gray-300 p-6 rounded-md">
                            <legend className="text-lg font-semibold text-red-700 px-2">Religious Details</legend>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="font-medium">Nationality</label>
                                    <input name="nationality" type="text" className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Category</label>
                                    <input name="category" type="text" className="input-field" onChange={handleChange} required />
                                </div>
                            </div>
                        </fieldset>

                        {/* SSC Details */}
                        <fieldset className="border border-gray-300 p-6 rounded-md">
                            <legend className="text-lg font-semibold text-red-700 px-2">SSC Details</legend>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="flex flex-col">
                                    <label className="font-medium">Board</label>
                                    <input name="sscBoard" type="text" className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Year</label>
                                    <input name="sscYear" type="text" maxLength={4} pattern="\d{4}" className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Marks</label>
                                    <input name="sscMarks" type="number" min={1} className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Out of</label>
                                    <input name="sscOutOf" type="number" min={500} max={600} className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Percentage</label>
                                    <input name="sscPercentage" type="number" min={1} max={100} className="input-field" onChange={handleChange} required />
                                </div>
                            </div>
                        </fieldset>

                        {/* HSC Details */}
                        <fieldset className="border border-gray-300 p-4 rounded-md">
                            <legend className="text-lg font-semibold text-red-700">HSC Details</legend>
                            <div className="grid grid-cols-3 gap-4">
                                <label>Board<input name="hscBoard" type="text" className="input-field" onChange={handleChange} required /></label>
                                <label>Year<input name="hscYear" type="text" maxLength={4} pattern="\d{4}" className="input-field" onChange={handleChange} required /></label>
                                <label>Physics<input name="hscPhysics" type="number" min={1} className="input-field" onChange={handleChange} required /></label>
                                <label>Chemistry<input name="hscChemistry" type="number" min={1} className="input-field" onChange={handleChange} required /></label>
                                <label>Maths<input name="hscMaths" type="number" min={1} className="input-field" onChange={handleChange} required /></label>
                                <label>Percentage<input name="hscPercentage" type="number" min={1} max={100} className="input-field" onChange={handleChange} required /></label>
                            </div>
                        </fieldset>

                        {/* JEE Details */}
                        <fieldset className="border border-gray-300 p-4 rounded-md">
                            <legend className="text-lg font-semibold text-red-700">JEE Details</legend>
                            <div className="grid grid-cols-3 gap-4">
                                <label>Year<input name="jeeYear" type="text" maxLength={4} pattern="\d{4}" className="input-field" onChange={handleChange} required /></label>
                                <label>Physics<input name="jeePhysics" type="number" min={1} className="input-field" onChange={handleChange} required /></label>
                                <label>Chemistry<input name="jeeChemistry" type="number" min={1} className="input-field" onChange={handleChange} required /></label>
                                <label>Maths<input name="jeeMaths" type="number" min={1} className="input-field" onChange={handleChange} required /></label>
                                <label>Percentage<input name="jeePercentage" type="number" min={1} max={100} className="input-field" onChange={handleChange} required /></label>
                            </div>
                        </fieldset>

                        {/* MHT-CET Details */}
                        <fieldset className="border border-gray-300 p-6 rounded-md">
                            <legend className="text-lg font-semibold text-red-700 px-2">MHT-CET Details</legend>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="flex flex-col">
                                    <label className="font-medium">Year</label>
                                    <input name="cetYear" type="text" maxLength={4} pattern="\d{4}" className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Physics</label>
                                    <input name="cetPhysics" type="number" min={1} className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Chemistry</label>
                                    <input name="cetChemistry" type="number" min={1} className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Maths</label>
                                    <input name="cetMaths" type="number" min={1} className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Percentage</label>
                                    <input name="cetPercentage" type="number" min={1} max={100} className="input-field" onChange={handleChange} required />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Enrollment ID</label>
                                    <input name="enrollmentId" type="text" value="EN24" readOnly className="input-field bg-gray-100" />
                                </div>
                                <div className="flex flex-col">
                                    <label className="font-medium">Branch</label>
                                    <input name="branch" type="text" className="input-field" onChange={handleChange} required />
                                </div>
                            </div>
                        </fieldset>

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
                                <textarea name="remarks" rows="3" className="input-field resize-none" onChange={handleChange}></textarea>
                            </div>
                        </fieldset>


                        <button type="submit" className="w-full bg-red-700 text-white py-3 rounded-md text-lg hover:bg-red-800 transition">Submit</button>
                    </form>
                </div>
            ) : (
                <p className="text-gray-500">Student data not found.</p>
            )}
        </div>


    );
};

export default Desk1;
