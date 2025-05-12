import { useEffect, useState } from "react";
import TeacherList from "./teacher-list"; // Assuming TeacherList is in the same folder

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch teacher data from the backend API
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/getAllCollegeAuthorities"); // Update with your actual API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTeachers(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []); // Empty dependency array to run only on mount

  const handleEdit = (teacher) => {
    console.log("Edit teacher", teacher);
    // You can handle the edit logic here
  };

  const handleDelete = (teacherId) => {
    console.log("Delete teacher with ID", teacherId);
    // You can handle the delete logic here
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Teacher List</h1>
      <TeacherList teachers={teachers} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default TeacherPage;
