import { useState } from "react";
import CounselorRegistrationForm from "../components/CounselorRegistrationForm";
import CounselorList from "../components/CounselorList";
import AdminDashboardStats from "../components/AdminDashboardStats";
import AdminStudentList from "../components/AdminStudentList";
import Header from "../components/Header";

const AdminPanel = () => {
  const [refreshList, setRefreshList] = useState(false);

  const handleRefresh = () => {
    setRefreshList(!refreshList);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-red-700 mb-8">Admin Panel</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            {/* Student Stats */}
            <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Student Stats</h2>
              <AdminDashboardStats statsType="studentCount" />
            </section>

            {/* Stream Distribution */}
            <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Stream Distribution</h2>
              <div className="flex justify-center items-center h-72">
                <AdminDashboardStats statsType="streamDistribution" />
              </div>
            </section>

            {/* Counselor Registration */}
            <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Register Counselor</h2>
              <CounselorRegistrationForm onRegistered={handleRefresh} />
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-8">
            {/* Counselor Count */}
            <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">Counselor Count</h2>
              <AdminDashboardStats statsType="counselorCount" />
            </section>

            {/* Student Records */}
            <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold text-red-700 mb-4">Student Records</h2>
              <div className="overflow-y-auto max-h-[350px]">
                <AdminStudentList />
              </div>
            </section>

            {/* Counselor List */}
            <section className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Counselor List</h2>
              <CounselorList refreshTrigger={refreshList} />
            </section>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AdminPanel;
