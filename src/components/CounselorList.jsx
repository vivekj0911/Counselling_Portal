// components/CounselorList.jsx
import { useEffect, useState } from "react";
import CounselorCard from "./CounselorCard";

const CounselorList = ({ refreshTrigger }) => {
  const [counselors, setCounselors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounselors = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/auth/allusers");
        const data = await res.json();
        console.log("Fetched counselors:", data); // Debugging line
        if (res.ok) {
          setCounselors(data);
        } else {
          console.error("Failed to fetch counselors:", data.message);
        }
      } catch (err) {
        console.error("Error fetching counselors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounselors();
  }, [refreshTrigger]);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center text-gray-600">Loading counselors...</div>
      ) : (
        counselors.length > 0 ? (
          counselors.map((counselor) => (
            <CounselorCard key={counselor._id} counselor={counselor} />
          ))
        ) : (
          <div className="text-center text-gray-600">No counselors registered yet.</div>
        )
      )}
    </div>
  );
};

export default CounselorList;
