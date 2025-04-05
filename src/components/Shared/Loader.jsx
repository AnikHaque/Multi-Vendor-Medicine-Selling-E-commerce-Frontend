
import React from 'react';

const Loader = ({ size = 'md', color = 'blue', className = '' }) => {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-4',
    lg: 'h-10 w-10 border-4',
  };

  const spinnerSize = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-t-transparent border-${color}-500 ${spinnerSize}`}
      ></div>
    </div>
  );
};

export default Loader;
