// import { useState } from "react";
// import CounselorRegistrationForm from "../components/CounselorRegistrationForm";
// import CounselorList from "../components/CounselorList";
// import AdminDashboardStats from "../components/AdminDashboardStats";
// import AdminStudentList from "../components/AdminStudentList";

// const AdminPanel = () => {
//   const [refreshList, setRefreshList] = useState(false);

//   const handleRefresh = () => {
//     setRefreshList(!refreshList);
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <h1 className="text-2xl font-bold mb-6 text-red-700">Admin Panel</h1>

//       {/* Dashboard Stats */}
//       <AdminDashboardStats />

//       {/* Student List Section */}
//       <div className="bg-white p-6 rounded shadow-md border">
//         <h2 className="text-xl font-semibold text-red-700 mb-4">Student Records</h2>
//         <AdminStudentList />
//       </div>

//       {/* Counselor Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         <CounselorRegistrationForm onRegistered={handleRefresh} />
//         <CounselorList refreshTrigger={refreshList} />
//       </div>

//     </div>
//   );
// };

// export default AdminPanel;
// -----------------------------------------------------------------------------------------------------
// import { useState } from "react";
// import CounselorRegistrationForm from "../components/CounselorRegistrationForm";
// import CounselorList from "../components/CounselorList";
// import AdminDashboardStats from "../components/AdminDashboardStats";
// import AdminStudentList from "../components/AdminStudentList";

// const AdminPanel = () => {
//   const [refreshList, setRefreshList] = useState(false);

//   const handleRefresh = () => {
//     setRefreshList(!refreshList);
//   };

//   return (
//     <div className="min-h-screen p-8 bg-gray-50">
//       <h1 className="text-2xl font-bold mb-6 text-red-700">Admin Panel</h1>

//       {/* Main Grid Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left Column */}
//         <div className="space-y-6">
//           {/* Row 1: Student Stats */}
//           <div className="bg-white shadow p-4 rounded-lg">
//             <h2 className="font-semibold text-lg mb-2">Student Stats</h2>
//             <AdminDashboardStats statsType="studentCount" />
//           </div>

//           {/* Row 2: Pie Chart */}
//           <div className="bg-white shadow p-4 rounded-lg">
//             <h2 className="font-semibold text-lg mb-4">Stream Distribution</h2>
//             <AdminDashboardStats statsType="streamDistribution" />
//           </div>

//           {/* Row 3: Counselor Registration */}
//           <CounselorRegistrationForm onRegistered={handleRefresh} />
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Row 1: Counselor Count */}
//           <div className="bg-white shadow p-4 rounded-lg">
//             <h2 className="font-semibold text-lg mb-2">Counselor Count</h2>
//             <AdminDashboardStats statsType="counselorCount" />
//           </div>

//           {/* Row 2: Student Records */}
//           <div className="bg-white p-6 rounded shadow-md border">
//             <h2 className="text-xl font-semibold text-red-700 mb-4">Student Records</h2>
//             <AdminStudentList />
//           </div>

//           {/* Row 3: Counselor List */}
//           <CounselorList refreshTrigger={refreshList} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

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
    <div>
      <Header />
      <div className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6 text-red-700">Admin Panel</h1>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Row 1: Student Stats */}
            <div className="font-metropolis bg-white shadow p-4 rounded-lg h-[130px]">
              <h2 className=" font-semibold text-lg mb-2">Student Stats</h2>
              <AdminDashboardStats statsType="studentCount" />
            </div>

            {/* Row 2: Pie Chart */}
            <div className="bg-white font-metropolis shadow p-4 rounded-lg h-[450px]">
              <h2 className=" font-semibold text-lg mb-4">
                Stream Distribution
              </h2>
              <div className="flex justify-center items-center">
              <AdminDashboardStats statsType="streamDistribution" />
              </div>
            </div>

            {/* Row 3: Counselor Registration */}
            <div className="flex justify-center items-center w-full">

            <CounselorRegistrationForm onRegistered={handleRefresh} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Row 1: Counselor Count */}
            <div className="font-metropolis bg-white shadow p-4 rounded-lg h-[130px]">
              <h2 className="font-semibold text-lg mb-2">Counselor Count</h2>
              <AdminDashboardStats statsType="counselorCount" />
            </div>

            {/* Row 2: Student Records */}
            <div className="bg-white p-6 rounded shadow-md  h-[450px]">
              <h2 className="text-xl font-semibold text-red-700 mb-4">
                Student Records
              </h2>
              <div className="overflow-y-auto h-[calc(100%-2.5rem)]">
                <AdminStudentList />
              </div>
            </div>

            {/* Row 3: Counselor List */}
            <div className="flex justify-center items-center  font-metropolis">
            <CounselorList refreshTrigger={refreshList}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
