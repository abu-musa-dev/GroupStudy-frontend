import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-red-500 mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-lg text-gray-700 mb-6">Sorry, the page you are looking for does not exist.</p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg font-medium py-3 px-8 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg transition-all duration-300"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
