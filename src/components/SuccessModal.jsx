// src/components/SuccessModal.jsx
const SuccessModal = ({ token, onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-center border border-gray-200">
                <h2 className="text-xl font-bold text-green-700 mb-3">🎉 Registration Successful!</h2>
                <p className="text-gray-700 text-sm mb-2">Your unique token is:</p>
                <div className="text-lg font-mono text-red-600 bg-red-100 p-2 rounded-md inline-block mb-4">
                    {token}
                </div>
                <p className="text-xs text-gray-500 mb-4">Please note it down for future reference.</p>
                <button
                    onClick={onClose}
                    className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
