const StudentDetailModal = ({ student, onClose }) => {
    console.log("Student Detail Modal:", JSON.stringify(student, null, 2));

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-20 z-50">
            <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-y-auto p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">
                    {student?.firstname} {student?.lastname}'s Details
                </h2>

                <div className="space-y-2">
                    <p><strong>Enrollment ID:</strong> {student?.studId}</p>
                    <p><strong>Phone:</strong> {student?.phone || 'N/A'}</p>
                    <p><strong>Email:</strong> {student?.email || 'N/A'}</p>
                    <hr className="my-2" />

                    <p><strong>Desk 1 Info:</strong> {JSON.stringify(student?.desk_updates?.desk1 || {}, null, 2)}</p>
                    <p><strong>Desk 2 Info:</strong> {JSON.stringify(student?.desk_updates?.desk2 || {}, null, 2)}</p>
                    <p><strong>Desk 3 Info:</strong> {JSON.stringify(student?.desk_updates?.desk3 || {}, null, 2)}</p>
                    <p><strong>Desk 4 Info:</strong> {JSON.stringify(student?.desk_updates?.desk4 || {}, null, 2)}</p>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default StudentDetailModal;
