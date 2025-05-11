// components/CounselorCard.jsx
const CounselorCard = ({ counselor }) => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-sm">
        <h3 className="text-xl font-semibold text-red-700">{counselor.name}</h3>
        <p className="text-sm text-gray-600">{counselor.email}</p>
        <p className="text-sm text-gray-500 capitalize">{counselor.type}</p>
      </div>
    );
  };
  
  export default CounselorCard;
  