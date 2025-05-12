import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

function AdmissionChart({ fieldData }) {
  return (
    <div className="w-full md:flex-1 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-xl font-semibold mb-6">Admission Distribution</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={fieldData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {fieldData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AdmissionChart;
