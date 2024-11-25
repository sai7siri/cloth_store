import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancelled = () => {
  const navigate = useNavigate();

  const handleRetryPayment = () => {
    navigate('/checkout'); // Route to the checkout page to retry payment
  };

  const handleGoHome = () => {
    navigate('/'); // Route to homepage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-semibold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-lg mb-6">It seems like your payment was not completed. You can try again or return to the homepage.</p>
        <div className="flex gap-4">
          <button
            onClick={handleRetryPayment}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Retry Payment
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

export default PaymentCancelled;
