export function LandingPage() {

    return (
        <div className="h-screen">
            <video
                className="absolute top-0 left-0 right-0 w-screen h-screen object-cover"
                src='https://res.cloudinary.com/diov69qe2/video/upload/v1721826407/CarWashCinematicVideo_yvwqtj.mp4'
                autoPlay
                muted
                loop
            ></video>
            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 text-center">
                <div className=''>
                </div>
                <div className='items-center bg-black bg-opacity-30 backdrop-blur-sm rounded-xl p-10 justify-end bottom-0'>
                    <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl tracking-tight font-medium text-black dark:text-white">
                        Exceptional Care for Every Car
                    </h4>
                    <p className="text-sm lg:text-base max-w-2xl my-4 text-neutral-500 font-normal dark:text-neutral-300">
                        From meticulous detailing to premium treatments, our studio offers comprehensive services to keep your car in pristine condition. Experience unparalleled quality and care for your vehicle with us.
                    </p>
                </div>
                <div className="w-full flex justify-center">
                    <button
                        onClick={() => window.location.href = '#your-link'}
                        className="inline-block px-6 py-3 text-white bg-yellow-600 rounded-lg shadow-lg hover:bg-white hover:text-yellow-600 transition-colors duration-300 ease-in-out transform hover:scale-105"
                    >
                        Learn More
                    </button>
                </div>
            </div>
        </div >
    );
}

export default LandingPage;
