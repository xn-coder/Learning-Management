import React from 'react';

const StudentPaymentsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Student Payment Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">PAID INVOICE</h2>
          {/* Content for Paid Invoices */}
          <p>Display list of paid invoices here...</p>
          {/* You would likely replace this with a table component */}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">UNPAID INVOICE</h2>
          {/* Content for Unpaid Invoices */}
          <p>Display list of unpaid invoices here...</p>
          {/* You would likely replace this with a table component */}
        </div>
      </div>
    </div>
  );
};

export default StudentPaymentsPage;