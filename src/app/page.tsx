'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useSpring, animated } from 'react-spring';
import { useEffect, useState } from 'react';

export default function Home() {
  // Fade-in animation for the heading
  const headingAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(-50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 280, friction: 60 },
  });

  // Fade-in animation for the paragraph
  const paragraphAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 200,
    config: { tension: 280, friction: 60 },
  });

  // Scale-up animation for the buttons
  const buttonsAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 400,
    config: { tension: 300, friction: 70 },
  });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-100 to-blue-100">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header Section with Animation */}
        <div className="text-center">
          <animated.h1 className="text-4xl font-extrabold text-gray-900" style={headingAnimation}>
            Welcome to HealthQuest!
          </animated.h1>
          <animated.p className="mt-4 text-lg text-gray-600" style={paragraphAnimation}>
            Explore our features for a healthier lifestyle.
          </animated.p>
        </div>

        {/* Features Grid with Animation */}
        <animated.div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" style={buttonsAnimation}>
          <Link href="/gamified-scenarios" className="transition-all duration-300 ease-in-out transform hover:scale-105">
            <Button className="w-full h-16 bg-green-500 hover:bg-green-700 text-white font-bold rounded-lg shadow-md">
              Gamified Health Scenarios
            </Button>
          </Link>
          <Link href="/symptom-checker" className="transition-all duration-300 ease-in-out transform hover:scale-105">
            <Button className="w-full h-16 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md">
              AI Symptom Checker
            </Button>
          </Link>
          <Link href="/clinic-finder" className="transition-all duration-300 ease-in-out transform hover:scale-105">
            <Button className="w-full h-16 bg-yellow-500 hover:bg-yellow-700 text-white font-bold rounded-lg shadow-md">
              Local Clinic Finder
            </Button>

          </Link>
          <Link href="https://healthlit-1.onrender.com/" className="transition-all duration-300 ease-in-out transform hover:scale-105">
            <Button className="w-full h-16 bg-red-500 hover:bg-red-700 text-white font-bold rounded-lg shadow-md">
              Basic Health Advice
            </Button>
          </Link>
        </animated.div>
      </div>
    </div>
  );
}
