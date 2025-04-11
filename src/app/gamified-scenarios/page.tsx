'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
// import confetti from 'canvas-confetti'; // <-- Import confetti

const healthChallenges = [
  {
    id: 1,
    character: 'Alex',
    scenario: 'Alex wants tea, but has diabetes—help them decide the safe sugar amount.',
    options: [
      { text: '3 teaspoons', isHealthy: false },
      { text: '1/2 teaspoon', isHealthy: true },
      { text: '2 teaspoons', isHealthy: false },
      { text: 'No sugar', isHealthy: true },
    ],
  },
  {
    id: 2,
    character: 'Mia',
    scenario: 'Mia has a cold. Should she take antibiotics?',
    options: [
      { text: 'Yes, immediately', isHealthy: false },
      { text: 'No, unless a doctor prescribes them', isHealthy: true },
      { text: 'Only if the fever is high', isHealthy: false },
    ],
  },
  {
    id: 3,
    character: 'Carlos',
    scenario: 'Carlos wants to improve his heart health. Which snack is the best choice?',
    options: [
      { text: 'A bag of potato chips', isHealthy: false },
      { text: 'A handful of almonds', isHealthy: true },
      { text: 'A candy bar', isHealthy: false },
    ],
  },
  {
    id: 4,
    character: 'Priya',
    scenario: 'Priya feels stressed. What’s a healthy way for her to cope?',
    options: [
      { text: 'Scrolling through social media for hours', isHealthy: false },
      { text: 'Practicing deep breathing exercises', isHealthy: true },
      { text: 'Eating a large pizza', isHealthy: false },
    ],
  },
  {
    id: 5,
    character: 'Sam',
    scenario: 'Sam needs to stay hydrated during a soccer game. What should he drink?',
    options: [
      { text: 'Soda', isHealthy: false },
      { text: 'Water', isHealthy: true },
      { text: 'Energy drink', isHealthy: false },
    ],
  },
  {
    id: 6,
    character: 'Emily',
    scenario: 'Emily is feeling down. Which activity is most likely to improve her mood?',
    options: [
      { text: 'Staying in bed all day', isHealthy: false },
      { text: 'Going for a walk in the park', isHealthy: true },
      { text: 'Watching TV for hours', isHealthy: false },
    ],
  },
  {
    id: 7,
    character: 'David',
    scenario: 'David wants to protect his skin from the sun. What should he do?',
    options: [
      { text: 'Stay indoors all day', isHealthy: false },
      { text: 'Apply sunscreen and wear a hat', isHealthy: true },
      { text: 'Use tanning oil', isHealthy: false },
    ],
  },
  {
    id: 8,
    character: 'Linda',
    scenario: 'Linda is having trouble sleeping. What should she avoid before bedtime?',
    options: [
      { text: 'Drinking herbal tea', isHealthy: false },
      { text: 'Using electronic devices', isHealthy: true },
      { text: 'Reading a book', isHealthy: false },
    ],
  },
  {
    id: 9,
    character: 'Kevin',
    scenario: 'Kevin wants to build strong bones. What should he include in his diet?',
    options: [
      { text: 'Sugary cereals', isHealthy: false },
      { text: 'Dairy products and leafy greens', isHealthy: true },
      { text: 'Fast food', isHealthy: false },
    ],
  },
  {
    id: 10,
    character: 'Sarah',
    scenario: 'Sarah wants to improve her posture while working at her desk. What should she do?',
    options: [
      { text: 'Slouching in her chair', isHealthy: false },
      { text: 'Sitting upright with her back supported', isHealthy: true },
      { text: 'Looking down at her laptop all day', isHealthy: false },
    ],
  },
  // Additional scenarios for a wider variety of real-life situations
  {
    id: 11,
    character: 'Rajesh',
    scenario: 'Rajesh feels hungry between meals. What’s a healthy snack option?',
    options: [
      { text: 'A sugary donut', isHealthy: false },
      { text: 'A piece of fruit', isHealthy: true },
      { text: 'A handful of pretzels', isHealthy: false },
    ],
  },
  {
    id: 12,
    character: 'Aisha',
    scenario: 'Aisha wants to reduce her salt intake. What should she avoid?',
    options: [
      { text: 'Fresh vegetables', isHealthy: false },
      { text: 'Processed foods', isHealthy: true },
      { text: 'Home-cooked meals', isHealthy: false },
    ],
  },
  {
    id: 13,
    character: 'Omar',
    scenario: 'Omar wants to improve his memory. Which activity is most helpful?',
    options: [
      { text: 'Watching TV passively', isHealthy: false },
      { text: 'Solving puzzles and reading', isHealthy: true },
      { text: 'Avoiding all mental stimulation', isHealthy: false },
    ],
  },
  {
    id: 14,
    character: 'Fatima',
    scenario: 'Fatima wants to maintain a healthy weight. What’s a key strategy?',
    options: [
      { text: 'Skipping meals', isHealthy: false },
      { text: 'Balancing diet and exercise', isHealthy: true },
      { text: 'Eating whatever she wants without limit', isHealthy: false },
    ],
  },
  {
    id: 15,
    character: 'Li Wei',
    scenario: 'Li Wei wants to lower his risk of heart disease. What’s an important lifestyle change?',
    options: [
      { text: 'Smoking cigarettes', isHealthy: false },
      { text: 'Regular physical activity', isHealthy: true },
      { text: 'Ignoring stress', isHealthy: false },
    ],
  },
  {
    id: 16,
    character: 'Sofia',
    scenario: 'Sofia is planning a healthy breakfast. Which option is the best?',
    options: [
      { text: 'A large stack of pancakes with syrup', isHealthy: false },
      { text: 'Oatmeal with berries and nuts', isHealthy: true },
      { text: 'A breakfast sandwich with bacon and cheese', isHealthy: false },
    ],
  },
  {
    id: 17,
    character: 'Ethan',
    scenario: 'Ethan wants to take care of his eyes. What should he do regularly?',
    options: [
      { text: 'Stare at screens for long periods without breaks', isHealthy: false },
      { text: 'Get regular eye exams', isHealthy: true },
      { text: 'Never wear sunglasses', isHealthy: false },
    ],
  },
  {
    id: 18,
    character: 'Isabella',
    scenario: 'Isabella wants to improve her sleep quality. What should she do?',
    options: [
      { text: 'Drink coffee right before bed', isHealthy: false },
      { text: 'Establish a consistent sleep schedule', isHealthy: true },
      { text: 'Use electronic devices in bed', isHealthy: false },
    ],
  },
  {
    id: 19,
    character: 'Noah',
    scenario: 'Noah wants to keep his teeth healthy. What’s essential?',
    options: [
      { text: 'Brush teeth after every meal', isHealthy: true },
      { text: 'Never floss', isHealthy: false },
      { text: 'Drink sugary soda regularly', isHealthy: false },
    ],
  },
  {
    id: 20,
    character: 'Ava',
    scenario: 'Ava wants to boost her immune system. What should she focus on?',
    options: [
      { text: 'Eating a variety of fruits and vegetables', isHealthy: true },
      { text: 'Avoiding all physical activity', isHealthy: false },
      { text: 'Getting as little sleep as possible', isHealthy: false },
    ],
  },
];

export default function GamifiedScenariosPage() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [celebrated, setCelebrated] = useState(false); // <- Add this state to ensure confetti runs once

  const currentChallenge = healthChallenges[currentChallengeIndex];
  const isLastChallenge = currentChallengeIndex === healthChallenges.length - 1;
  const allChallengesCompleted = currentChallengeIndex >= healthChallenges.length;

  useEffect(() => {
    if (allChallengesCompleted && !celebrated) {
      // confetti({
      //   particleCount: 150,
      //   spread: 70,
      //   origin: { y: 0.6 },
      // });
      setCelebrated(true);
    }
  }, [allChallengesCompleted, celebrated]);

  const handleAnswer = (isHealthy: boolean) => {
    if (isHealthy) {
      setScore(score + 1);
      setFeedback('✅ Great job! That was a healthy choice.');
    } else {
      setScore(Math.max(0, score - 1));
      setFeedback('❌ Oops! That might not have been the healthiest option.');
    }
    setChallengeCompleted(true);

    setTimeout(() => {
      if (!isLastChallenge) {
        setCurrentChallengeIndex(currentChallengeIndex + 1);
        setFeedback('');
        setChallengeCompleted(false);
      } else {
        setCurrentChallengeIndex(currentChallengeIndex + 1); // advance past last
      }
    }, 2000);
  };

  const resetGame = () => {
    setCurrentChallengeIndex(0);
    setScore(0);
    setFeedback('');
    setChallengeCompleted(false);
    setCelebrated(false); // Reset celebration
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-4">Gamified Health Scenarios</h1>
      <p className="text-lg mb-4">
        Help our characters make healthy decisions and earn points!
      </p>

      {!allChallengesCompleted ? (
        <div className="bg-secondary/50 rounded-lg p-4 mb-4 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">
            Scenario: {currentChallenge.character}
          </h2>
          <p className="mb-4">{currentChallenge.scenario}</p>

          <div className="flex flex-col gap-2">
            {currentChallenge.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option.isHealthy)}
                className="bg-primary text-primary-foreground hover:bg-primary/80"
                disabled={challengeCompleted}
              >
                {option.text}
              </Button>
            ))}
          </div>
          {feedback && <p className="mt-4 font-medium">{feedback}</p>}
        </div>
      ) : (
        <div className="bg-green-100 border border-green-300 text-green-900 p-6 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4">🎉 Congratulations!</h2>
          <p className="text-lg mb-2">You completed all the health scenarios.</p>
          <p className="text-xl font-semibold mb-4">Your Score: {score} / {healthChallenges.length}</p>
          <Button onClick={resetGame} className="bg-blue-600 hover:bg-blue-700 text-white">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
}
