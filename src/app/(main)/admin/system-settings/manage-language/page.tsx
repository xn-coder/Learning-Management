import React from 'react';

const ManageLanguagePage = () => {
  const languages = [
    { name: 'English' },
    { name: 'Arabic' },
    { name: 'French' },
    { name: 'Bengali' },
    { name: 'Chinese' },
    { name: 'Dutch' },
    { name: 'German' },
    { name: 'Hindi' },
    { name: 'Hungarian' },
    { name: 'Greek' },
    { name: 'Indonesian' },
    { name: 'Italian' },
    { name: 'Japanese' },
    { name: 'Korean' },
    { name: 'Latin' },
    { name: 'Portuguese' },
    { name: 'Russian' },
    { name: 'Spanish' },
    { name: 'Turkish' },
    { name: 'Thai' },
    { name: 'Urdu' },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Language</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">LANGUAGE</span>
          <span className="px-3 py-1 bg-green-500 text-white rounded-md text-sm">ACTIVE LANGUAGE: ENGLISH</span>
          <button className="px-3 py-1 bg-gray-200 rounded-md text-sm">Back</button>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">+ Add Language</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md">+ Add String</button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {languages.map((language, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {language.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-.75 7.5a.75.75 0 001.06 1.06L16.5 8.06l-2.5-2.5-3.182 3.182z" />
                    </svg>
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-center text-gray-500 text-sm">
        ©Bringing to you by Weblabs Developers
      </div>
    </div>
  );
};

export default ManageLanguagePage;