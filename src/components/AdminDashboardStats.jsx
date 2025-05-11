import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#E53E3E", "#DD6B20", "#38A169", "#3182CE", "#805AD5"];

const AdminDashboardStats = () => {
  const [studentStats, setStudentStats] = useState({ total: 0, today: 0 });
  const [streamData, setStreamData] = useState([]);
  const [counselorCount, setCounselorCount] = useState(0);

  useEffect(() => {
    // Fetch total and today's student count
    fetch("http://localhost:3000/api/desk/student-count", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (data?.total !== undefined && data?.today !== undefined) {
          setStudentStats(data);
        } else {
          console.warn("Unexpected student stats format:", data);
        }
      })
      .catch(err => console.error("Student count error:", err));

    // Fetch stream distribution
    fetch("http://localhost:3000/api/desk/stream-distribution", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStreamData(data.map(item => ({ name: item._id, value: item.count })));
        } else {
          console.warn("Unexpected stream data format:", data);
        }
      })
      .catch(err => console.error("Stream distribution error:", err));

    // Fetch counselor count
    fetch("http://localhost:3000/api/desk/counselor-count", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        if (typeof data.count === "number") {
          setCounselorCount(data.count);
        } else {
          console.warn("Unexpected counselor count format:", data);
        }
      })
      .catch(err => console.error("Counselor count error:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Student Stats */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="font-semibold text-lg mb-2">Student Stats</h2>
        <p>Total Students: <strong>{studentStats.total}</strong></p>
        <p>Today's Students: <strong>{studentStats.today}</strong></p>
      </div>

      {/* Counselor Count */}
      <div className="bg-white shadow p-4 rounded-lg">
        <h2 className="font-semibold text-lg mb-2">Counselor Count</h2>
        <p>Total Counselors: <strong>{counselorCount}</strong></p>
      </div>

      {/* Stream Distribution Pie Chart */}
      <div className="bg-white shadow p-4 rounded-lg col-span-1 md:col-span-2">
        <h2 className="font-semibold text-lg mb-4">Stream Distribution</h2>
        {streamData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <PieChart width={400} height={300}>
            <Pie
              data={streamData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {streamData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardStats;
