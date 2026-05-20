import React from 'react';

const PageLoader = () => (
    <div className="flex justify-center items-center min-h-[40vh] bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600" />
    </div>
);

export default PageLoader;
