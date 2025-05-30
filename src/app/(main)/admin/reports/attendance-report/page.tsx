import React from 'react';

const AttendanceReportPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar would go here */}
      <div className="flex-grow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Attendance Report : Section</h1>
          {/* Date and user info would go here */}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">MANAGE ATTENDANCE</h2>

          <div className="mb-4 flex items-center space-x-4 text-sm">
            <span className="font-semibold">KEYS:</span>
            <span><span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-1"></span>Present</span>
            <span><span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-1"></span>Absent</span>
            <span><span className="inline-block w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>Half Day</span>
            <span><span className="inline-block w-3 h-3 bg-blue-500 rounded-full mr-1"></span>Late</span>
            <span><span className="inline-block w-3 h-3 bg-black rounded-full mr-1"></span>Undefine</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="class" className="block text-sm font-medium text-gray-700 mb-1">
                Select Class
              </label>
              <select
                id="class"
                name="class"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Select</option>
                {/* Add class options here */}
              </select>
            </div>

            <div>
              <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
                Select Section
              </label>
              <select
                id="section"
                name="section"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>Select Class First</option>
                {/* Add section options here */}
              </select>
            </div>

            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                Month
              </label>
              <select
                id="month"
                name="month"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>May</option>
                {/* Add month options here */}
              </select>
            </div>

            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                id="year"
                name="year"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option>2019</option>
                {/* Add year options here */}
              </select>
            </div>
          </div>

          <button className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Get attendance
          </button>
        </div>

        {/* Attendance table would go here */}
      </div>
    </div>
  );
};

export default AttendanceReportPage;