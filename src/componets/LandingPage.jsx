import React from 'react';

export function LandingPage() {

    return (
        <div className="h-screen p-0 w-screen overflow-hidden">
            <video
                className="absolute top-0 left-0 w-screen h-screen object-cover"
                src='https://res.cloudinary.com/diov69qe2/video/upload/v1721826407/CarWashCinematicVideo_yvwqtj.mp4'
                autoPlay
                muted
                loop
                controls={false}
            ></video>

            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
                    Exceptional Care for Every Car
                </h4>
                <p className="text-sm lg:text-base max-w-2xl my-4 text-neutral-500 font-normal dark:text-neutral-300">
                    From meticulous detailing to premium treatments, our studio offers comprehensive services to keep your car in pristine condition. Experience unparalleled quality and care for your vehicle with us.
                </p>
                <div className="mt-8">
                    <a
                        href="#your-link"
                        className="inline-block px-6 py-3 text-white bg-black dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </div >
    );
}

export default LandingPage;
