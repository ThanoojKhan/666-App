import React, { useState, useEffect } from 'react';
import './App.css';
import FeaturesSectionDemo from './componets/FeaturesSectionDemo'
import LandingPage from './componets/LandingPage'
import Loading from './componets/Loading';
import Contact from './componets/Contact';
import Location from './componets/Location';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ?
        <Loading />
        : <>
          <LandingPage />
          <FeaturesSectionDemo />
          <Contact />
          <Location />
        </>
      }
    </>
  );
}

export default App;
