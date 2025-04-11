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
];

export default function GamifiedScenariosPage() {
  const [currentChallenge, setCurrentChallenge] = useState(healthChallenges[0]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleAnswer = (isHealthy: boolean) => {
    if (isHealthy) {
      setScore(score + 1);
      setFeedback('Great job! That was a healthy choice.');
    } else {
      setScore(Math.max(0, score - 1));
      setFeedback('Oops! That might not have been the healthiest option.');
    }
    // Optionally, move to the next challenge after a delay
    setTimeout(() => {
      const nextChallengeIndex = healthChallenges.findIndex(challenge => challenge.id === currentChallenge.id) + 1;
      if (nextChallengeIndex < healthChallenges.length) {
        setCurrentChallenge(healthChallenges[nextChallengeIndex]);
        setFeedback('');
      } else {
        setFeedback('You have completed all the challenges!');
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
