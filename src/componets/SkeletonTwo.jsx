import React from "react";
import { motion } from "framer-motion";
import pic1 from '../assets/images/pic1.jpeg';
import pic2 from '../assets/images/pic2.jpeg';
import pic3 from '../assets/images/pic3.jpeg';
import pic4 from '../assets/images/pic4.jpeg';

const SkeletonTwo = () => {
    const images = [pic1, pic2, pic3, pic4, pic3, pic1];

    const imageVariants = {
        whileHover: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
        whileTap: {
            scale: 1.1,
            rotate: 0,
            zIndex: 100,
        },
    };

    return (
        <div className="relative flex flex-col items-center p-8 gap-10 h-full overflow-hidden">
            <div className="flex flex-row">
                {images.slice(0, 3).map((image, idx) => (
                    <motion.div
                        key={"images-first-" + idx}
                        style={{ rotate: Math.random() * 20 - 10 }}
                        variants={imageVariants}
                        whileHover="whileHover"
                        whileTap="whileTap"
                        className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                    >
                        <img
                            src={image}
                            alt={`Image ${idx}`}
                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                        />
                    </motion.div>
                ))}
            </div>
            <div className="flex flex-row">
                {images.slice(3).map((image, idx) => (
                    <motion.div
                        key={"images-second-" + idx}
                        style={{ rotate: Math.random() * 20 - 10 }}
                        variants={imageVariants}
                        whileHover="whileHover"
                        whileTap="whileTap"
                        className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 flex-shrink-0 overflow-hidden"
                    >
                        <img
                            src={image}
                            alt={`Image ${idx + 3}`}
                            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
                        />
                    </motion.div>
                ))}
            </div>
            <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r h-full pointer-events-none" />
            <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l h-full pointer-events-none" />
        </div>
    );
};

export default SkeletonTwo;
