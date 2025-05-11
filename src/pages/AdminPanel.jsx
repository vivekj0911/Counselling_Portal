import { useState } from "react";
import CounselorRegistrationForm from "../components/CounselorRegistrationForm";
import CounselorList from "../components/CounselorList";
import AdminDashboardStats from "../components/AdminDashboardStats";
import AdminStudentList from "../components/AdminStudentList";

const AdminPanel = () => {
  const [refreshList, setRefreshList] = useState(false);

  const handleRefresh = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-red-700">Admin Panel</h1>

      {/* Dashboard Stats */}
      <AdminDashboardStats />

      {/* Student List Section */}
      <div className="bg-white p-6 rounded shadow-md border">
        <h2 className="text-xl font-semibold text-red-700 mb-4">Student Records</h2>
        <AdminStudentList />
      </div>

      {/* Counselor Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <CounselorRegistrationForm onRegistered={handleRefresh} />
        <CounselorList refreshTrigger={refreshList} />
      </div>

      
    </div>
  );
};

export default AdminPanel;
