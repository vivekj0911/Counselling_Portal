import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutButton = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleLogout = async () => {


        setLoading(true);
        try {
            await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
            navigate("/");
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setShowModal(false);
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:opacity-50"
            >
                {loading ? "Logging out..." : "Logout"}
            </button>

              {/* Modal */}
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50  bg-black/50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-3">Confirm Logout</h2>
                        <p className="text-sm text-gray-600 mb-6">Are you sure you want to log out?</p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
                            >
                                {loading ? "Logging out..." : "Logout"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LogoutButton;