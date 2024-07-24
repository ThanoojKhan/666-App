import React from 'react';
import SkeletonOne from './SkeletonOne';
import SkeletonTwo from './SkeletonTwo';
import SkeletonThree from './SkeletonThree';
import SkeletonFour from './SkeletonFour';
import FeatureCard from './FeatureCard';
import FeatureTitle from './FeatureTitle';
import FeatureDescription from './FeatureDescription';
import Video from '../assets/Video/CarWashCinematicVideo.mp4';

export function FeaturesSectionDemo() {
    const features = [
        {
            title: "Identify Exterior Issues",
            description:
                "Effortlessly detect and manage exterior problems of your vehicle with our advanced inspection tools, ensuring a thorough and effective detailing process.",
            skeleton: <SkeletonOne />,
            className: "col-span-1 lg:col-span-6",
        }
        ,
        {
            title: "Showcasing Completed Projects",
            description:
                "Highlight and review completed detailing projects with ease, showcasing the exceptional work done in our shop using high-quality images.",
            skeleton: <SkeletonTwo />,
            className: "col-span-1 lg:col-span-6",

        },
        {
            title: "Watch Our Services in Action",
            description:
                "Discover the quality of our detailing services by watching videos of our work on YouTube. See firsthand how we transform vehicles with our expert care.",
            skeleton: <SkeletonThree />,
            className: "col-span-1 lg:col-span-3",
        },

        {
            title: "Detailing with Precision and Care",
            description:
                "Experience top-tier care with our detailing services. We handle every vehicle with utmost attention to detail and precision, ensuring a flawless finish and complete satisfaction.",
            skeleton: <SkeletonFour />,
            className: "col-span-1 lg:col-span-3",
        },

    ];

    return (
        <div className="relative z-20 py-10 max-w-7xl mx-auto">
            <div className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 rounded-xl">
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
    );
}

export default FeaturesSectionDemo;
