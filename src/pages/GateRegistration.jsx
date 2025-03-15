import { useState } from "react";
import Header from "../components/Header";
import StudentEntryForm from "../components/StudentEntryForm";
import StudentExitForm from "../components/StudentExitForm";
import RevisitForm from "../components/ReVisitForm";

const GateRegistration = () => {
    const [activeTab, setActiveTab] = useState("entry"); // Default to Student Entry Form

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            {/* Header Component */}
            <Header />

            {/* Navigation Tabs */}
            <div className="flex justify-center bg-white shadow-md py-4">
                <button 
                    className={`px-6 py-2 text-lg font-semibold tracking-wide ${
                        activeTab === "entry" ? "text-red-700 border-b-4 border-red-700" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("entry")}
                >
                    Student Entry
                </button>
                <button 
                    className={`px-6 py-2 text-lg font-semibold tracking-wide ${
                        activeTab === "exit" ? "text-red-700 border-b-4 border-red-700" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("exit")}
                >
                    Student Exit
                </button>
                <button 
                    className={`px-6 py-2 text-lg font-semibold tracking-wide ${
                        activeTab === "revisit" ? "text-red-700 border-b-4 border-red-700" : "text-gray-600"
                    }`}
                    onClick={() => setActiveTab("revisit")}
                >
                    Re-Visit
                </button>
            </div>

            {/* Form Section */}
            <div className="flex items-center justify-center flex-grow py-6 px-4">
                <div className="bg-white shadow-md w-full max-w-3xl border border-gray-200 rounded-lg p-6">
                    {activeTab === "entry" && <StudentEntryForm />}
                    {activeTab === "exit" && <StudentExitForm />}
                    {activeTab === "revisit" && <RevisitForm />}
                </div>
            </div>
        </div>
    );
};

export default GateRegistration;
