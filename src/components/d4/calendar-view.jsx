"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

export default function CalendarView({ selectedDate, onDateChange, onFetchStudents, studentData }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

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
        <button onClick={() => setCurrentMonth(new Date(year, month - 1))} className="p-2 rounded hover:bg-gray-200">
          &lt;
        </button>
        <h3 className="font-bold text-xl">
          {monthNames[month]} {year}
        </h3>
        <button onClick={() => setCurrentMonth(new Date(year, month + 1))} className="p-2 rounded hover:bg-gray-200">
          &gt;
        </button>
      </div>
    );

    // Add day names header
    const dayNamesHeader = (
      <div className="grid grid-cols-7 gap-2 mb-4">
        {dayNames.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 p-2">
            {day}
          </div>
        ))}
      </div>
    );

    // Add empty cells for days before first day of month
    const emptyCells = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      emptyCells.push(<div key={`empty-${i}`} className="h-12 bg-gray-50"></div>);
    }

    // Add days of the month
    const dayCells = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      const isSelected = date === selectedDate;
      const hasStudents = studentData.some((student) => student.admissionDate === date);

      dayCells.push(
        <div
          key={day}
          onClick={() => onDateChange(date)}
          className={`h-12 flex items-center justify-center cursor-pointer text-sm rounded
            ${isSelected ? "bg-blue-500 text-white" : hasStudents ? "bg-blue-100" : "hover:bg-gray-100"}`}
        >
          {day}
        </div>
      );
    }

    return (
      <>
        {monthHeader}
        {dayNamesHeader}
        <div className="grid grid-cols-7 gap-2">
          {emptyCells}
          {dayCells}
        </div>
      </>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      {renderCalendar()}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600 mb-4">Selected Date: {selectedDate}</p>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 flex items-center justify-center mx-auto"
          onClick={onFetchStudents}
        >
          <Filter size={16} className="mr-2" />
          Fetch Students
        </button>
      </div>
    </div>
  );
}
