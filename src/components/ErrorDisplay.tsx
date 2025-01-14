import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <p className="text-xl text-red-600 font-semibold">Error loading data</p>
    <p className="mt-2 text-gray-600">{message}</p>
  </div>
);

export default ErrorDisplay;