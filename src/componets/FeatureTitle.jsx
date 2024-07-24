import React from "react";

const FeatureTitle = ({ children }) => {
  return (
    <p className="max-w-5xl mx-auto tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

export default FeatureTitle;
