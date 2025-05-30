import React from 'react';

const PaymentSettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stripe Payment Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">STRIPE PAYMENT SETTINGS</h2>
          <a href="#" className="text-blue-600 hover:underline mb-4 block">Register Here</a>

          <div className="mb-4">
            <label htmlFor="stripe-active" className="block text-sm font-medium text-gray-700">
              Active
            </label>
            <select
              id="stripe-active"
              name="stripe-active"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="stripe-test-mode" className="block text-sm font-medium text-gray-700">
              Test Mode
            </label>
            <select
              id="stripe-test-mode"
              name="stripe-test-mode"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>Off</option>
              <option>On</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="stripe-test-secret-key" className="block text-sm font-medium text-gray-700">
              Test Secret Key
            </label>
            <input
              type="text"
              id="stripe-test-secret-key"
              name="stripe-test-secret-key"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="test secret key"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stripe-test-public-key" className="block text-sm font-medium text-gray-700">
              Test Public Key
            </label>
            <input
              type="text"
              id="stripe-test-public-key"
              name="stripe-test-public-key"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="test public key"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stripe-live-secret-key" className="block text-sm font-medium text-gray-700">
              Live Secret Key
            </label>
            <input
              type="text"
              id="stripe-live-secret-key"
              name="stripe-live-secret-key"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="live secret key"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="stripe-live-public-key" className="block text-sm font-medium text-gray-700">
              Live Public Key
            </label>
            <input
              type="text"
              id="stripe-live-public-key"
              name="stripe-live-public-key"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="live public key"
            />
          </div>
        </div>

        {/* PayPal Payment Settings */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">PAYPAL PAYMENT SETTINGS</h2>
          <a href="#" className="text-blue-600 hover:underline mb-4 block">Register Here</a>

          <div className="mb-4">
            <label htmlFor="paypal-active" className="block text-sm font-medium text-gray-700">
              Active
            </label>
            <select
              id="paypal-active"
              name="paypal-active"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="paypal-mode" className="block text-sm font-medium text-gray-700">
              Mode
            </label>
            <select
              id="paypal-mode"
              name="paypal-mode"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>Sandbox</option>
              <option>Live</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="paypal-client-id-sandbox" className="block text-sm font-medium text-gray-700">
              Client Id (Sandbox)
            </label>
            <input
              type="text"
              id="paypal-client-id-sandbox"
              name="paypal-client-id-sandbox"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="client id sandbox"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="paypal-client-id-production" className="block text-sm font-medium text-gray-700">
              Client Id (Production)
            </label>
            <input
              type="text"
              id="paypal-client-id-production"
              name="paypal-client-id-production"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="client - production"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              + Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSettingsPage;