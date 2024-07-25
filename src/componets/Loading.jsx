import React from 'react';
import LoadingSpinner from './LoadingSpinner';

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <LoadingSpinner />
            <div className="flex flex-col items-center justify-center w-full">
                <div className="mt-10 animate-fadeInOut text-yellow-700 text-8xl shadow-md font-bold">
                    666
                </div>
                <div className="animate-fadeInOut text-white text-3xl mt-5 shadow-md font-medium">
                    Detailing Studio
                </div>
                <div className="animate-fadeInOut text-white mt-2 shadow-md font-medium">
                    By Abdul Gafar
                </div>
            </div>
        </div>
    );
}

export default Loading;
