import { Users, UserPlus, BookOpen, Calendar } from "lucide-react";
import StatsCard from "./stats-card";

export default function StatsGrid({ totalStudents, todayCount, totalTeachers, selectedDateCount }) {
  return (
    <div className="w-full md:w-[605px] grid grid-cols-2 gap-6">
      <StatsCard
        icon={Users}
        title="Total Students"
        value={totalStudents}
        iconColor="text-blue-600"
        iconBgColor="bg-blue-100"
      />
      <StatsCard
        icon={UserPlus}
        title="Today's Admissions"
        value={todayCount}
        iconColor="text-green-600"
        iconBgColor="bg-green-100"
      />
      <StatsCard
        icon={BookOpen}
        title="Total Teachers"
        value={totalTeachers}
        iconColor="text-purple-600"
        iconBgColor="bg-purple-100"
      />
      <StatsCard
        icon={Calendar}
        title="Selected Date"
        value={selectedDateCount}
        iconColor="text-yellow-600"
        iconBgColor="bg-yellow-100"
      />
    </div>
  );
}
