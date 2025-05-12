import { useState, useEffect } from "react";
import {
  Calendar,
  ChevronDown,
  Users,
  UserPlus,
  BookOpen,
  Filter,
  X,
  Edit,
  Trash2,
  Search,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import Header from "../components/Header";

// Mock data - in a real app, this would come from an API
const initialStudentData = [
  {
    id: 1,
    name: "John Doe",
    field: "Engineering",
    admissionDate: "2025-04-24",
    email: "john@example.com",
    phone: "123-456-7890",
    address: "123 Main St",
    age: 21,
    course: "Computer Science",
    parentName: "Richard Doe",
    emergencyContact: "123-456-7899",
    bloodGroup: "O+",
    previousSchool: "ABC School",
  },
  {
    id: 2,
    name: "Jane Smith",
    field: "Pharmacy",
    admissionDate: "2025-04-25",
    email: "jane@example.com",
    phone: "123-456-7891",
    address: "124 Main St",
    age: 22,
    course: "B.Pharm",
    parentName: "Robert Smith",
    emergencyContact: "123-456-7892",
    bloodGroup: "A+",
    previousSchool: "XYZ School",
  },
  {
    id: 3,
    name: "Bob Johnson",
    field: "Engineering",
    admissionDate: "2025-04-23",
    email: "bob@example.com",
    phone: "123-456-7892",
    address: "125 Main St",
    age: 20,
    course: "Mechanical Engineering",
    parentName: "Mary Johnson",
    emergencyContact: "123-456-7893",
    bloodGroup: "B+",
    previousSchool: "PQR School",
  },
  {
    id: 4,
    name: "Alice Brown",
    field: "Medicine",
    admissionDate: "2025-04-25",
    email: "alice@example.com",
    phone: "123-456-7893",
    address: "126 Main St",
    age: 23,
    course: "MBBS",
    parentName: "James Brown",
    emergencyContact: "123-456-7894",
    bloodGroup: "AB+",
    previousSchool: "LMN School",
  },
  {
    id: 5,
    name: "Charlie Wilson",
    field: "Pharmacy",
    admissionDate: "2025-04-22",
    email: "charlie@example.com",
    phone: "123-456-7894",
    address: "127 Main St",
    age: 21,
    course: "Pharm D",
    parentName: "Helen Wilson",
    emergencyContact: "123-456-7895",
    bloodGroup: "O-",
    previousSchool: "EFG School",
  },
];

// Mock teacher data
const initialTeacherData = [
  {
    id: "T1001",
    name: "Dr. Alan Smith",
    email: "alan@example.com",
    department: "Engineering",
    role: "Professor",
  },
  {
    id: "T1002",
    name: "Dr. Emily Johnson",
    email: "emily@example.com",
    department: "Medicine",
    role: "Assistant Professor",
  },
  {
    id: "T1003",
    name: "Dr. Robert Brown",
    email: "robert@example.com",
    department: "Pharmacy",
    role: "Associate Professor",
  },
  {
    id: "T1004",
    name: "Dr. Lisa Davis",
    email: "lisa@example.com",
    department: "Science",
    role: "Lecturer",
  },
  {
    id: "T1005",
    name: "Dr. Michael Wilson",
    email: "michael@example.com",
    department: "Engineering",
    role: "Professor",
  },
];

// Sample data for pie chart
const sampleFieldData = [
  { name: "Engineering", value: 32, color: "#0088FE" },
  { name: "Pharmacy", value: 28, color: "#00C49F" },
  { name: "Medicine", value: 20, color: "#FFBB28" },
  { name: "Other", value: 20, color: "#FF8042" },
];

export default function AdmissionDashboard() {
  const [students, setStudents] = useState(initialStudentData);
  const [teachers, setTeachers] = useState(initialTeacherData);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [todayCount, setTodayCount] = useState(0);
  const [selectedDateCount, setSelectedDateCount] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [teacherData, setTeacherData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });
  const [generatedCredentials, setGeneratedCredentials] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [studentSearch, setStudentSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");

  // Calculate counts
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    // Today's count
    const todayStudents = students.filter(
      (student) => student.admissionDate === today
    );
    setTodayCount(todayStudents.length);

    // Selected date count
    const selectedStudents = students.filter(
      (student) => student.admissionDate === selectedDate
    );
    setSelectedDateCount(selectedStudents.length);
  }, [students, selectedDate]);

  const fetchStudentList = () => {
    // In a real app, this would fetch from an API based on the selected date
    console.log(`Fetching students for ${selectedDate}`);
    // For now, we're just filtering our mock data
    const filteredStudents = initialStudentData.filter(
      (student) => student.admissionDate === selectedDate
    );
    setStudents(
      filteredStudents.length > 0 ? filteredStudents : initialStudentData
    );
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleTeacherSubmit = (e) => {
    e.preventDefault();

    // Generate random ID and password
    const teacherId = `T${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0")}`;
    const password = Math.random().toString(36).slice(-8);

    setGeneratedCredentials({ id: teacherId, password });

    // In a real app, you would save this to your database
    console.log("Teacher registered:", {
      ...teacherData,
      id: teacherId,
      password,
    });

    // Add to our teacher list for demo purposes
    const newTeacher = {
      ...teacherData,
      id: teacherId,
    };

    setTeachers([...teachers, newTeacher]);

    // Reset form
    setTeacherData({ name: "", email: "", department: "", role: "" });
  };

  const handleEditTeacher = (teacher) => {
    setEditingTeacher({ ...teacher });
    setShowTeacherModal(true);
  };

  const handleDeleteTeacher = (teacherId) => {
    if (confirm("Are you sure you want to delete this teacher?")) {
      setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
    }
  };

  const handleSaveTeacherEdit = (e) => {
    e.preventDefault();
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === editingTeacher.id ? editingTeacher : teacher
      )
    );
    setShowTeacherModal(false);
  };

  // Filter students based on search input
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.field.toLowerCase().includes(studentSearch.toLowerCase()) ||
      student.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Filter teachers based on search input
  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      teacher.department.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      teacher.email.toLowerCase().includes(teacherSearch.toLowerCase()) ||
      teacher.role.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  // Calendar helper functions
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Add header for the month and year
    const monthHeader = (
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentMonth(new Date(year, month - 1))}
          className="p-2 rounded hover:bg-gray-200"
        >
          &lt;
        </button>
        <h3 className="font-bold text-xl">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={() => setCurrentMonth(new Date(year, month + 1))}
          className="p-2 rounded hover:bg-gray-200"
        >
          &gt;
        </button>
      </div>
    );

    // Add day names header
    const dayNamesHeader = (
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-600 p-2"
          >
            {day}
          </div>
        ))}
      </div>
    );

    // Add empty cells for days before first day of month
    const emptyCells = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      emptyCells.push(
        <div key={`empty-${i}`} className="h-12 bg-gray-50"></div>
      );
    }

    // Add days of the month
    const dayCells = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const isSelected = date === selectedDate;
      const hasStudents = initialStudentData.some(
        (student) => student.admissionDate === date
      );

      dayCells.push(
        <div
          key={day}
          onClick={() => handleDateChange(date)}
          className={`h-12 flex items-center justify-center cursor-pointer text-sm rounded
            ${
              isSelected
                ? "bg-blue-500 text-white"
                : hasStudents
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
        >
          {day}
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow p-8">
        {monthHeader}
        {dayNamesHeader}
        <div className="grid grid-cols-7 gap-2">
          {emptyCells}
          {dayCells}
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 mb-4">
            Selected Date: {selectedDate}
          </p>
          <button
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 flex items-center justify-center mx-auto"
            onClick={fetchStudentList}
          >
            <Filter size={16} className="mr-2" />
            Fetch Students
          </button>
        </div>
      </div>
    );
  };

  // Student details modal
  const renderStudentModal = () => {
    if (!showStudentModal || !selectedStudent) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowStudentModal(false)}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Student Details</h3>
            <button
              onClick={() => setShowStudentModal(false)}
              className="p-1 hover:bg-blue-700 rounded"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-8">
            <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="font-bold text-2xl text-blue-800">
                {selectedStudent.name}
              </h3>
              <div className="flex items-center mt-2">
                <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">
                  {selectedStudent.field}
                </span>
                <span className="ml-3 text-gray-600">
                  ID: {selectedStudent.id}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h4 className="font-semibold text-lg border-b pb-2">
                  Personal Information
                </h4>

                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedStudent.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedStudent.phone}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{selectedStudent.address}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{selectedStudent.age}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="font-medium">{selectedStudent.bloodGroup}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-semibold text-lg border-b pb-2">
                  Academic Information
                </h4>

                <div>
                  <p className="text-sm text-gray-500">Course</p>
                  <p className="font-medium">{selectedStudent.course}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Admission Date</p>
                  <p className="font-medium">{selectedStudent.admissionDate}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Previous School</p>
                  <p className="font-medium">
                    {selectedStudent.previousSchool}
                  </p>
                </div>

                <h4 className="font-semibold text-lg border-b pb-2 mt-8">
                  Emergency Contact
                </h4>

                <div>
                  <p className="text-sm text-gray-500">Parent/Guardian Name</p>
                  <p className="font-medium">{selectedStudent.parentName}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Emergency Contact</p>
                  <p className="font-medium">
                    {selectedStudent.emergencyContact}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600"
                onClick={() => setShowStudentModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Teacher edit modal
  const renderTeacherModal = () => {
    if (!showTeacherModal || !editingTeacher) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowTeacherModal(false)}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="text-xl font-bold">Edit Teacher</h3>
            <button
              onClick={() => setShowTeacherModal(false)}
              className="p-1 hover:bg-blue-700 rounded"
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSaveTeacherEdit} className="space-y-5">
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  htmlFor="teacherName"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="teacherName"
                  className="w-full p-3 border rounded"
                  value={editingTeacher.name}
                  onChange={(e) =>
                    setEditingTeacher({
                      ...editingTeacher,
                      name: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  htmlFor="teacherEmail"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="teacherEmail"
                  className="w-full p-3 border rounded"
                  value={editingTeacher.email}
                  onChange={(e) =>
                    setEditingTeacher({
                      ...editingTeacher,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  htmlFor="teacherDepartment"
                >
                  Department
                </label>
                <select
                  id="teacherDepartment"
                  className="w-full p-3 border rounded"
                  value={editingTeacher.department}
                  onChange={(e) =>
                    setEditingTeacher({
                      ...editingTeacher,
                      department: e.target.value,
                    })
                  }
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Science">Science</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm text-gray-600 mb-2"
                  htmlFor="teacherRole"
                >
                  Role
                </label>
                <select
                  id="teacherRole"
                  className="w-full p-3 border rounded"
                  value={editingTeacher.role}
                  onChange={(e) =>
                    setEditingTeacher({
                      ...editingTeacher,
                      role: e.target.value,
                    })
                  }
                  required
                >
                  <option value="Professor">Professor</option>
                  <option value="Associate Professor">
                    Associate Professor
                  </option>
                  <option value="Assistant Professor">
                    Assistant Professor
                  </option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Lab Assistant">Lab Assistant</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 py-2 px-5 rounded hover:bg-gray-400"
                  onClick={() => setShowTeacherModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-5 rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Using your Header component */}
      <Header />

      {/* Main content */}
      <main className="flex-1 container mx-auto p-8">
        {/* Stats Grid and Pie Chart */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Stats Grid - fixed width 605px */}
          <div className="w-full md:w-[605px] grid grid-cols-2 gap-6">
            {/* Total Students */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                <Users size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold">
                  {initialStudentData.length}
                </p>
              </div>
            </div>

            {/* Today's Admissions */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                <UserPlus size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Today's Admissions</p>
                <p className="text-2xl font-bold">{todayCount}</p>
              </div>
            </div>

            {/* Total Teachers */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                <BookOpen size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Teachers</p>
                <p className="text-2xl font-bold">{teachers.length}</p>
              </div>
            </div>

            {/* Selected Date Admissions */}
            <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Selected Date</p>
                <p className="text-2xl font-bold">{selectedDateCount}</p>
              </div>
            </div>
          </div>

          {/* Pie Chart - takes remaining width */}
          <div className="w-full md:flex-1 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-6">
              Admission Distribution
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sampleFieldData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {sampleFieldData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Calendar and Student List Section */}
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Calendar - 50% width */}
          <div className="w-full md:w-1/2">{renderCalendar()}</div>

          {/* Student List - 50% width */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Student List</h2>

              {/* Search bar for students */}
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-2.5 text-gray-400"
                />
              </div>
            </div>

            {filteredStudents.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <li
                    key={student.id}
                    className="py-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => handleStudentClick(student)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                            {student.field}
                          </span>
                          <span className="text-xs text-gray-500 ml-2">
                            {student.admissionDate}
                          </span>
                        </div>
                      </div>
                      <div className="text-blue-500 hover:text-blue-700">
                        View Details
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No students found
              </p>
            )}
          </div>
        </div>

        {/* Teacher Registration and Teacher List */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Teacher Registration - 50% width */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-6">
              New Teacher Registration
            </h2>
            {!generatedCredentials ? (
              <form onSubmit={handleTeacherSubmit} className="space-y-5">
                <div>
                  <label
                    className="block text-sm text-gray-600 mb-2"
                    htmlFor="teacherName"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="teacherName"
                    className="w-full p-3 border rounded"
                    value={teacherData.name}
                    onChange={(e) =>
                      setTeacherData({ ...teacherData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm text-gray-600 mb-2"
                    htmlFor="teacherEmail"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="teacherEmail"
                    className="w-full p-3 border rounded"
                    value={teacherData.email}
                    onChange={(e) =>
                      setTeacherData({ ...teacherData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-sm text-gray-600 mb-2"
                    htmlFor="teacherDepartment"
                  >
                    Department
                  </label>
                  <select
                    id="teacherDepartment"
                    className="w-full p-3 border rounded"
                    value={teacherData.department}
                    onChange={(e) =>
                      setTeacherData({
                        ...teacherData,
                        department: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Science">Science</option>
                  </select>
                </div>
                <div>
                  <label
                    className="block text-sm text-gray-600 mb-2"
                    htmlFor="teacherRole"
                  >
                    Role
                  </label>
                  <select
                    id="teacherRole"
                    className="w-full p-3 border rounded"
                    value={teacherData.role}
                    onChange={(e) =>
                      setTeacherData({ ...teacherData, role: e.target.value })
                    }
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">
                      Associate Professor
                    </option>
                    <option value="Assistant Professor">
                      Assistant Professor
                    </option>
                    <option value="Lecturer">Lecturer</option>
                    <option value="Lab Assistant">Lab Assistant</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-green-500 text-white py-3 px-4 rounded hover:bg-green-600"
                >
                  Register Teacher
                </button>
              </form>
            ) : (
              <div className="text-center">
                <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="text-lg font-medium text-green-800 mb-3">
                    Registration Successful!
                  </h3>
                  <p className="mb-3">
                    Please share these credentials with the teacher:
                  </p>

                  <div className="bg-white p-4 rounded border border-gray-200 mb-4">
                    <p className="mb-2">
                      <span className="font-bold">Teacher ID:</span>
                      <span className="ml-2 text-blue-700">
                        {generatedCredentials.id}
                      </span>
                    </p>
                    <p>
                      <span className="font-bold">Password:</span>
                      <span className="ml-2 text-blue-700">
                        {generatedCredentials.password}
                      </span>
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Make sure to save these credentials as they won't be shown
                    again.
                  </p>
                </div>
                <button
                  onClick={() => setGeneratedCredentials(null)}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Register Another Teacher
                </button>
              </div>
            )}
          </div>

          {/* Teacher List with Edit/Delete - 50% width */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Teacher List</h2>

            <input
              type="text"
              placeholder="Search teachers..."
              value={teacherSearch}
              onChange={(e) => setTeacherSearch(e.target.value)}
              className="mb-4 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {filteredTeachers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTeachers.map((teacher) => (
                      <tr key={teacher.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">
                            {teacher.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {teacher.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {teacher.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {teacher.role}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            <button
                              onClick={() => handleEditTeacher(teacher)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteTeacher(teacher.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No teachers found
              </p>
            )}
          </div>
        </div>
      </main>

      {/* Student Details Modal */}
      {renderStudentModal()}

      {/* Teacher Edit Modal */}
      {renderTeacherModal()}
    </div>
  );
}