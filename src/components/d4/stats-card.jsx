// import { LucideIcon } from "lucide-react";

export default function StatsCard({ icon: Icon, title, value, iconColor, iconBgColor }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
      <div className={`p-3 rounded-full ${iconBgColor} ${iconColor} mr-4`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
