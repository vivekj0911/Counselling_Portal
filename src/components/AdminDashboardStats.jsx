import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#E53E3E", "#DD6B20", "#38A169", "#3182CE", "#805AD5"];

const AdminDashboardStats = ({ statsType = "all" }) => {
  const [studentStats, setStudentStats] = useState({ total: 0, today: 0 });
  const [streamData, setStreamData] = useState([]);
  const [counselorCount, setCounselorCount] = useState(0);

  useEffect(() => {
    // Fetch total and today's student count
    const fetchStudentCount = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/desk/student-count",
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data?.total !== undefined && data?.today !== undefined) {
          setStudentStats(data);
        } else {
          console.warn("Unexpected student stats format:", data);
        }
      } catch (err) {
        console.error("Student count error:", err);
      }
    };

    // Fetch stream distribution
    const fetchStreamDistribution = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/desk/stream-distribution",
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (Array.isArray(data)) {
          setStreamData(
            data.map((item) => ({ name: item._id, value: item.count }))
          );
        } else {
          console.warn("Unexpected stream data format:", data);
        }
      } catch (err) {
        console.error("Stream distribution error:", err);
      }
    };

    // Fetch counselor count
    const fetchCounselorCount = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/desk/counselor-count",
          {
            credentials: "include",
          }
        );
        const data = await res.json();
        if (typeof data.count === "number") {
          setCounselorCount(data.count);
        } else {
          console.warn("Unexpected counselor count format:", data);
        }
      } catch (err) {
        console.error("Counselor count error:", err);
      }
    };

    // Fetch based on statsType
    if (statsType === "all" || statsType === "studentCount") {
      fetchStudentCount();
    }

    if (statsType === "all" || statsType === "streamDistribution") {
      fetchStreamDistribution();
    }

    if (statsType === "all" || statsType === "counselorCount") {
      fetchCounselorCount();
    }
  }, [statsType]);

  // Render based on statsType
  switch (statsType) {
    case "studentCount":
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-2xl font-semibold text-red-700 mt-1">{studentStats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
            <p className="text-sm text-gray-600">Today's Students</p>
            <p className="text-2xl font-semibold text-red-700 mt-1">{studentStats.today}</p>
          </div>
        </div>
      );

    case "counselorCount":
      return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-center">
          <p className="text-sm text-gray-600 mr-2">Total Counselors:</p>
          <p className="text-2xl font-bold text-red-700">{counselorCount}</p>
        </div>
      );

    case "streamDistribution":
      return streamData.length === 0 ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <PieChart width={350} height={350}>
            <Pie
              data={streamData.map((item) => ({
                ...item,
                name: item.name.toUpperCase(),
              }))}
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {streamData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className="mt-4 lg:mt-0">
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="left"
              wrapperStyle={{ fontSize: '14px' }}
            />
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Stats */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Student Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold text-red-700 mt-1">{studentStats.total}</p>
                </div>
                <div className="border rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-500">Today's Students</p>
                  <p className="text-2xl font-bold text-red-700 mt-1">{studentStats.today}</p>
                </div>
              </div>
            </div>

            {/* Counselor Count */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Counselor Count</h3>
              <div className="border rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Total Counselors</p>
                <p className="text-2xl font-bold text-red-700 mt-1">{counselorCount}</p>
              </div>
            </div>
          </div>
          {/* Stream */}
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Stream Distribution</h3>
            {streamData.length === 0 ? (
              <p className="text-gray-500">No data available</p>
            ) : (
              <PieChart width={300} height={200}>
                <Pie
                  data={streamData.map((item) => ({
                    ...item,
                    name: item.name.toUpperCase(),
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {streamData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" verticalAlign="middle" align="right" />
              </PieChart>
            )}
          </div>
        </div>
      );
  }
};

export default AdminDashboardStats;
