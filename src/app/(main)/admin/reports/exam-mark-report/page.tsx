import React from 'react';

const ExamMarkReportPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Student Marks</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Enter Student Score Form */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">+ ENTER STUDENT SCORE</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="exam" className="block text-sm font-medium text-gray-700">
                Exam
              </label>
              <select
                id="exam"
                name="exam"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Select Class</option>
                {/* Add exam options here */}
              </select>
            </div>
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                Class
              </label>
              <select
                id="class"
                name="class"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Select Class</option>
                {/* Add class options here */}
              </select>
            </div>
            <div>
              <label htmlFor="student" className="block text-sm font-medium text-gray-700">
                Student
              </label>
              <select
                id="student"
                name="student"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Select Class First</option>
                {/* Add student options here */}
              </select>
            </div>
            <div>
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <i className="fas fa-search mr-2"></i> Get Details
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Student Mark Entry/Display */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Student Marks Details</h2>
          {/* Content for displaying student marks and mark entry fields will go here */}
          <div className="text-center text-gray-500">
            Select Exam, Class, and Student to view/enter marks.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamMarkReportPage;