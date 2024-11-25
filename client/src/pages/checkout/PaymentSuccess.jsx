import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleOrderDetails = () => {
    navigate('/dashboard/order'); // Route to order details page
  };

  const handleGoHome = () => {
    navigate('/'); // Route to homepage
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-lg mb-6">Thank you for your purchase. Your order has been successfully processed.</p>
        <div className="flex gap-4">
          <button
            onClick={handleOrderDetails}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            View Order Details
          </button>
          <button
            onClick={handleGoHome}
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
