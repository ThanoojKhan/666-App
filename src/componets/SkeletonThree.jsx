import React from "react";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

const SkeletonThree = () => {
    return (
        <a
            href="https://www.youtube.com/embed/eMBlkjCA298?autoplay=1&mute=1&loop=1&playlist=eMBlkjCA298&controls=0&showinfo=0"
            target="_blank"
            rel="noopener noreferrer" // for security reasons
            className="relative flex gap-10 h-full group/image"
        >
            <div className="w-full mx-auto bg-transparent dark:bg-transparent group h-full">
                <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
                    <IconBrandYoutubeFilled className="h-20 w-20 absolute z-10 inset-0 text-red-500 m-auto" />
                    <img
                        src="https://assets.aceternity.com/fireship.jpg"
                        alt="header"
                        className="h-full w-full aspect-square object-cover object-center rounded-sm blur-none group-hover/image:blur-md transition-all duration-200"
                    />
                </div>
            </div>
        </a>
    );
};

export default SkeletonThree;
