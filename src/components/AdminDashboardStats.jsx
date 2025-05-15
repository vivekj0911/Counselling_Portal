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
        <>
          <div className=" grid grid-cols-2 gap-4">
            <div className="shadow text-xl rounded p-3">
              <p >
                Total Students:
                <strong className="p-2">{studentStats.total}</strong>
              </p>
            </div>
            <div className="shadow text-xl rounded p-3">
              <p>
                Today's Students:
                <strong className="p-2">{studentStats.today}</strong>
              </p>
            </div>
          </div>
        </>
      );

    case "counselorCount":
      return (
        <p className="flex justify-center items-center text-xl shadow  rounded py-1">
          Total Counselors: <strong className="p-2">{counselorCount}</strong>
        </p>
      );

    case "streamDistribution":
      return streamData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <PieChart width={500} height={350}>
          <Pie
            data={streamData.map((item) => ({
              ...item,
              name: item.name.toUpperCase(), // Capitalize stream name
            }))}
            cx="40%"
            cy="50%"
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {streamData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      );

    default:
      return (
        <div className="font-metropolis grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold ">Student Stats</h3>
            <div className="">
              <p>
                Total Students: <strong>{studentStats.total}</strong>
              </p>
              <p>
                Today's Students: <strong>{studentStats.today}</strong>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Counselor Count</h3>
            <p>
              Total Counselors: <strong>{counselorCount}</strong>
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Stream Distribution</h3>
            {streamData.length === 0 ? (
              <p>No data available</p>
            ) : (
              <PieChart width={300} height={200}>
                <Pie
                  data={streamData.map((item) => ({
                    ...item,
                    name: item.name.toUpperCase(),
                  }))}
                  cx="40%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {streamData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
              </PieChart>
            )}
          </div>
        </div>
      );
  }
};

export default AdminDashboardStats;
