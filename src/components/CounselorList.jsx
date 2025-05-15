

import { useEffect, useState } from "react";
import CounselorCard from "./CounselorCard";

const CounselorList = ({ refreshTrigger }) => {
  const [counselors, setCounselors] = useState([]);
  const [filteredCounselors, setFilteredCounselors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounselors = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:3000/api/auth/allusers");
        const data = await res.json();
        if (res.ok) {
          setCounselors(data);
          setSearchTerm(""); // reset search when refreshed
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

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = counselors.filter(
      (c) =>
        c.name?.toLowerCase().includes(lowerTerm) ||
        c.email?.toLowerCase().includes(lowerTerm)
    );
    setFilteredCounselors(filtered);
  }, [searchTerm, counselors]);

  return (
    <div className="space-y-4 w-full ">
      {/* Search bar */}
      <div className="flex justify-center mb-2">
        <input
          type="text"
          placeholder="Search counselors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 mb-3 rounded w-2/3 font-medium"
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-600 ">Loading counselors...</div>
      ) : filteredCounselors.length > 0 ? (
        filteredCounselors.map((counselor) => (
          <CounselorCard key={counselor._id} counselor={counselor} />
        ))
      ) : (
        <div className="text-center text-gray-600">No matching counselors found.</div>
      )}
    </div>
  );
};

export default CounselorList;
