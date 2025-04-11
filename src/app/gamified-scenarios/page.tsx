'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

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
];

export default function GamifiedScenariosPage() {
  const [currentChallenge, setCurrentChallenge] = useState(healthChallenges[0]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [challengeCompleted, setChallengeCompleted] = useState(false);

  const handleAnswer = (isHealthy: boolean) => {
    if (isHealthy) {
      setScore(score + 1);
      setFeedback('Great job! That was a healthy choice.');
    } else {
      setScore(Math.max(0, score - 1));
      setFeedback('Oops! That might not have been the healthiest option.');
    }
    setChallengeCompleted(true);

    // Optionally, move to the next challenge after a delay
    setTimeout(() => {
      const nextChallengeIndex = healthChallenges.findIndex(challenge => challenge.id === currentChallenge.id) + 1;
      if (nextChallengeIndex < healthChallenges.length) {
        setCurrentChallenge(healthChallenges[nextChallengeIndex]);
        setFeedback('');
        setChallengeCompleted(false);
      } else {
        setFeedback('You have completed all the challenges!');
        setChallengeCompleted(false);
      }
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-4">Gamified Health Scenarios</h1>
      <p className="text-lg mb-4">
        Help our characters make healthy decisions and earn points!
      </p>

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
      </div>

      {feedback && <p className="text-xl mt-4">{feedback}</p>}
      <p className="text-xl mt-4">Your Score: {score}</p>
    </div>
  );
}
