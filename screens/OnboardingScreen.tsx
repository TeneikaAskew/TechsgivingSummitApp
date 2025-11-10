
import React, { useState, useEffect } from 'react';

const CalendarIcon = () => (
  <svg className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);
const PeopleIcon = () => (
  <svg className="w-12 h-12 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm6-11a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const features = [
  {
    icon: <CalendarIcon />,
    title: "Build Your Schedule",
    description: "Customize your personal agenda.",
  },
  {
    icon: <PeopleIcon />,
    title: "Network with Attendees",
    description: "Connect with professionals.",
  },
];

interface OnboardingScreenProps {
  onLogin: () => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onLogin }) => {
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#0D1117] text-center p-8">
      <header className="flex-shrink-0 mt-16">
        <div className="flex justify-center items-center mb-4">
            <svg className="w-10 h-10 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
            <span className="text-2xl font-bold text-white">Techsgiving</span>
        </div>
        <h1 className="text-4xl font-bold text-white leading-tight">Welcome to Techsgiving Summit 2024</h1>
        <p className="text-gray-400 mt-4">Your official guide to the summit experience.</p>
      </header>
      
      <main className="flex-grow flex flex-col justify-center items-center my-8">
        <div className="w-full max-w-xs h-48 bg-[#161B22] rounded-lg p-6 flex flex-col items-center justify-center border border-gray-700">
          {features[currentFeature].icon}
          <h2 className="font-semibold text-white mt-4">{features[currentFeature].title}</h2>
          <p className="text-gray-400 text-sm mt-1">{features[currentFeature].description}</p>
        </div>
        <div className="flex justify-center mt-6 space-x-2">
            {features.map((_, index) => (
                <div key={index} className={`w-2 h-2 rounded-full transition-colors ${currentFeature === index ? 'bg-orange-500' : 'bg-gray-600'}`}></div>
            ))}
        </div>
      </main>

      <footer className="flex-shrink-0 space-y-4">
        <button onClick={onLogin} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
          Create Account
        </button>
        <button onClick={onLogin} className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
          Sign In
        </button>
      </footer>
    </div>
  );
};

export default OnboardingScreen;
