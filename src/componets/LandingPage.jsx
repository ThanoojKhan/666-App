import React, { useState } from 'react';
import svg from '../assets/images/WhatsApp-Logo.svg';
import ServiceModal from './ServiceModal';

export function LandingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="h-screen min-h-[730px]">
            <video
                className="absolute top-0 left-0 right-0 w-screen h-screen min-h-[770px] object-cover"
                src='https://res.cloudinary.com/diov69qe2/video/upload/v1721826407/CarWashCinematicVideo_yvwqtj.mp4'
                autoPlay
                muted
                loop
            ></video>
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-center">
                <div className="flex flex-col items-center justify-center w-full">
                    <div className="mt-10 animate-fadeInOut text-yellow-700 text-8xl font-bold">
                        666
                    </div>
                    <div className="animate-fadeInOut text-white text-3xl mt-5 font-medium">
                        Detailing Studio
                    </div>
                    <div className="animate-fadeInOut text-white mt-2 font-medium">
                        By Abdul Gafar
                    </div>
                </div>
                <div className='items-center my-3 bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-10 justify-end bottom-0'>
                    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
                        Exceptional Care for Every Car
                    </h4>
                    <p className="text-sm lg:text-base max-w-2xl my-4 text-neutral-500 font-normal dark:text-neutral-300">
                        From meticulous detailing to premium treatments, our studio offers comprehensive services to keep your car in pristine condition. Experience unparalleled quality and care for your vehicle with us.
                    </p>
                </div>
                <div className="w-full m-10 flex justify-center">
                    <button
                        onClick={openModal}
                        className="inline-flex items-center px-6 py-3 text-white bg-black bg-opacity-40 rounded-lg shadow-lg hover:bg-green-400 transition-colors duration-300 ease-in-out transform hover:scale-105"
                    >
                        <img src={svg} alt="WhatsApp Logo" className="w-6 h-6" />
                        Contact Us
                    </button>
                </div>
            </div>
            <ServiceModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default LandingPage;
