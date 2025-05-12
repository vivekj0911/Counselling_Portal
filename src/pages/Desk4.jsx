"use client"

import { useState, useEffect } from "react"
import Header from "../components/Header"
import StatsGrid from "../components/d4/stats-grid"
import AdmissionChart from "../components/d4/admission-chart"
import CalendarView from "../components/d4/calendar-view"
import StudentList from "../components/d4/student-list"
import StudentModal from "../components/d4/student-modal"
import TeacherForm from "../components/d4/teacher-form"
import TeacherCredentials from "../components/d4/teacher-credentials"
import TeacherList from "../components/d4/teacher-list"
import TeacherModal from "../components/d4/teacher-modal"
import {
  initialStudentData,
  initialTeacherData,
  sampleFieldData,
} from "../data/mock-data"

export default function AdmissionDashboard() {
  const [students, setStudents] = useState(initialStudentData)
  const [teachers, setTeachers] = useState(initialTeacherData)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [todayCount, setTodayCount] = useState(0)
  const [selectedDateCount, setSelectedDateCount] = useState(0)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [generatedCredentials, setGeneratedCredentials] = useState(null)
  const [editingTeacher, setEditingTeacher] = useState(null)
  const [showTeacherModal, setShowTeacherModal] = useState(false)

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    const todayStudents = students.filter((student) => student.admissionDate === today)
    setTodayCount(todayStudents.length)

    const selectedStudents = students.filter((student) => student.admissionDate === selectedDate)
    setSelectedDateCount(selectedStudents.length)
  }, [students, selectedDate])

  const fetchStudentList = () => {
    console.log(`Fetching students for ${selectedDate}`)
    const filteredStudents = initialStudentData.filter((student) => student.admissionDate === selectedDate)
    setStudents(filteredStudents.length > 0 ? filteredStudents : initialStudentData)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const handleStudentClick = (student) => {
    setSelectedStudent(student)
    setShowStudentModal(true)
  }


  // -----------------------------------
  const handleTeacherSubmit = async (teacherData) => {
    try {
      const res = await fetch("/api/college-authorities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(teacherData),
      })
      const result = await res.json()
      if (res.ok) {
        setTeachers((prev) => [...prev, result])
        setGeneratedCredentials({ id: result.id, password: result.generatedPassword })
      } else {
        console.error("Failed to add teacher:", result)
      }
    } catch (err) {
      console.error("Error adding teacher:", err)
    }
  }
  
  const handleEditTeacher = (teacher) => {
    setEditingTeacher(teacher)
    setShowTeacherModal(true)
  }
  
  const handleDeleteTeacher = async (id) => {
    try {
      const res = await fetch(`/api/college-authorities/${id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setTeachers((prev) => prev.filter((t) => t.id !== id))
      } else {
        console.error("Failed to delete teacher")
      }
    } catch (err) {
      console.error("Error deleting teacher:", err)
    }
  }
  
  const handleSaveTeacherEdit = async (updatedTeacher) => {
    try {
      const res = await fetch(`/api/college-authorities/${updatedTeacher.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTeacher),
      })
      const result = await res.json()
      if (res.ok) {
        setTeachers((prev) =>
          prev.map((t) => (t.id === updatedTeacher.id ? result : t))
        )
        setShowTeacherModal(false)
      } else {
        console.error("Failed to update teacher:", result)
      }
    } catch (err) {
      console.error("Error updating teacher:", err)
    }
  }
  

  // ------------------------------------------

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <main className="flex-1 container mx-auto p-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <StatsGrid
            totalStudents={initialStudentData.length}
            todayCount={todayCount}
            totalTeachers={teachers.length}
            selectedDateCount={selectedDateCount}
          />
          <AdmissionChart fieldData={sampleFieldData} />
        </div>

        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="w-full md:w-1/2">
            <CalendarView
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              onFetchStudents={fetchStudentList}
              studentData={initialStudentData}
            />
          </div>
          <StudentList students={students} onStudentClick={handleStudentClick} />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-xl font-semibold mb-6">New Teacher Registration</h2>
            {!generatedCredentials ? (
              <TeacherForm onSubmit={handleTeacherSubmit} />
            ) : (
              <TeacherCredentials
                id={generatedCredentials.id}
                password={generatedCredentials.password}
                onReset={() => setGeneratedCredentials(null)}
              />
            )}
          </div>
          <TeacherList teachers={teachers} onEdit={handleEditTeacher} onDelete={handleDeleteTeacher} />
        </div>
      </main>

      <StudentModal student={selectedStudent} show={showStudentModal} onClose={() => setShowStudentModal(false)} />
      <TeacherModal
        teacher={editingTeacher}
        show={showTeacherModal}
        onClose={() => setShowTeacherModal(false)}
        onSave={handleSaveTeacherEdit}
      />
    </div>
  )
}
