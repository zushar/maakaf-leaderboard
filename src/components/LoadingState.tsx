import React from 'react';
import { Loader } from 'lucide-react';

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <Loader className="w-12 h-12 text-sky-700 animate-spin" />
    <p className="mt-4 text-lg text-gray-600">Loading contributions...</p>
  </div>
);

export default LoadingState;