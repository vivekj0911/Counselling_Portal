import { useState } from "react";

const Desk1 = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        fatherName: "",
        motherName: "",
        gender: "",
        nationality: "",
        category: "",
        email: "",
        phone: "",
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
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">Student Registration</h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <fieldset className="border border-gray-300 p-6 rounded-md">
                    <legend className="text-lg font-semibold text-red-700 px-2">Personal Details</legend>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label className="font-medium">Student Name</label>
                            <input name="studentName" type="text" className="input-field" onChange={handleChange} required />
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
                            <select name="gender" className="input-field" onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium">Email</label>
                            <input name="email" type="email" className="input-field" onChange={handleChange} required />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-medium">Phone No</label>
                            <input name="phone" type="text" maxLength={10} pattern="\d{10}" className="input-field" onChange={handleChange} required />
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

                <button type="submit" className="w-full bg-red-700 text-white py-3 rounded-md text-lg hover:bg-red-800 transition">Submit</button>
            </form>
        </div>


    );
};

export default Desk1;
