'use client';

import Link from 'next/link';
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-100 to-blue-100">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Welcome to HealthQuest!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore our features for a healthier lifestyle.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      </div>
    </div>
  );
}
