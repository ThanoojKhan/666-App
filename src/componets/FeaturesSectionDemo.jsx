import React from 'react';
import SkeletonOne from './SkeletonOne';
import SkeletonTwo from './SkeletonTwo';
import SkeletonThree from './SkeletonThree';
import SkeletonFour from './SkeletonFour';
import FeatureCard from './FeatureCard';
import FeatureTitle from './FeatureTitle';
import FeatureDescription from './FeatureDescription';

export function FeaturesSectionDemo() {
    const features = [
        {
            title: "Track issues effectively",
            description:
                "Track and manage your project issues with ease using our intuitive interface.",
            skeleton: <SkeletonOne />,
            className:
                "col-span-1 lg:col-span-6",
        },
        {
            title: "Capture pictures with AI",
            description:
                "Capture stunning photos effortlessly using our advanced AI technology.",
            skeleton: <SkeletonTwo />,
            className: "col-span-1 lg:col-span-6",
        },
        {
            title: "Watch our AI on YouTube",
            description:
                "Whether it's you or Tyler Durden, you can get to know about our product on YouTube.",
            skeleton: <SkeletonThree />,
            className:
                "col-span-1 lg:col-span-3",
        },
        {
            title: "Deploy in seconds",
            description:
                "With our blazing fast, state-of-the-art, cutting-edge cloud services (read AWS) - you can deploy your model in seconds.",
            skeleton: <SkeletonFour />,
            className: "col-span-1 lg:col-span-3",
        },
    ];

    return (
        <>
            <div className="relative h-screen w-screen max-w-7xl overflow-hidden">
                <iframe
                    className="absolute top-0 px-0 self-center left-0 w-full h-full object-cover"
                    src="https://www.youtube.com/embed/eMBlkjCA298?autoplay=1&mute=1&loop=1&playlist=eMBlkjCA298&controls=0&showinfo=0"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>

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
            </div>

            <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
                <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 mt-12 rounded-md">
                        {features.map((feature) => (
                            <FeatureCard key={feature.title} className={feature.className}>
                                <FeatureTitle>{feature.title}</FeatureTitle>
                                <FeatureDescription>{feature.description}</FeatureDescription>
                                <div className="h-full w-full">{feature.skeleton}</div>
                            </FeatureCard>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
}

export default FeaturesSectionDemo;
