import React from 'react';

export const Loader = ({ size = 'medium', color = 'primary' }) => {
  const sizeClass = size === 'small' ? 'h-4 w-4' : size === 'large' ? 'h-8 w-8' : 'h-6 w-6';
  
  const colorClass = 
    color === 'primary' ? 'border-[#f74464] border-t-transparent' : 
    color === 'white' ? 'border-white border-t-transparent' : 
    'border-[#374258] border-t-transparent';

  return (
    <div className={`spinner ${sizeClass} border-2 rounded-full animate-spin ${colorClass}`}></div>
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-[#374258]/80 z-50">
      <div className="flex flex-col items-center">
        <Loader size="large" color="primary" />
        <p className="mt-4 text-[#374258] dark:text-white font-medium">Loading...</p>
      </div>
    </div>
  );
};

export const ContentLoader = () => {
  return (
    <div className="w-full py-12 flex justify-center">
      <Loader size="medium" color="primary" />
    </div>
  );
};