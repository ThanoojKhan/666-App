import React from 'react';
import LoadingGif from '../assets/loading.gif';

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <img src={LoadingGif} alt="Loading..." className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40" />
            <div className="mt-4 text-xl font-bold text-white animate-pulse md:text-2xl lg:text-3xl">
                666 Detailing Studio
            </div>
        </div>
    );
}

export default Loading;
