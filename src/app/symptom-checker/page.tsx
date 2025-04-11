'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const symptomsList = [
  "Fatigue", "Headache", "Fever", "Cough", "Sore Throat",
  "Muscle Aches", "Nausea", "Dizziness", "Runny Nose", "Shortness of Breath"
];

// Normalize symptom keys: sort them for consistent matching
const rawSymptomResults = {
  ["Fatigue"]: ["Possible overexertion or lack of sleep", "Consider resting and managing stress."],
  ["Headache"]: ["Possible tension headache or migraine", "Stay hydrated and consider pain relief."],
  ["Fever"]: ["Possible infection or virus", "Monitor temperature and consult a doctor if high."],
  ["Cough"]: ["Possible cold or respiratory infection", "Use cough drops and stay hydrated."],
  ["Sore Throat"]: ["Possible throat infection or strep throat", "Gargle with salt water and see a doctor if severe."],
  ["Muscle Aches"]: ["Possible overexertion or flu", "Rest and consider pain relief."],
  ["Nausea"]: ["Possible indigestion or food poisoning", "Stay hydrated and avoid heavy foods."],
  ["Dizziness"]: ["Possible dehydration or low blood pressure", "Sit down and drink water."],
  ["Runny Nose"]: ["Possible cold or allergies", "Use decongestants and stay hydrated."],
  ["Shortness of Breath"]: ["Possible asthma or respiratory issue", "Consult a doctor immediately."],
  ["Fatigue,Headache"]: ["Possible stress or dehydration", "Rest and hydrate."],
  ["Fever,Cough"]: ["Likely a cold or flu", "Rest, hydrate, and consider over-the-counter remedies."],
  ["Nausea,Dizziness"]: ["Possible inner ear infection or motion sickness", "Rest and take anti-nausea medication if needed."],
  ["Shortness of Breath,Cough"]: ["Possible bronchitis or pneumonia", "Consult a doctor immediately."],
  ["Fatigue,Muscle Aches,Fever"]: ["Likely the flu", "Rest and hydrate."]
};

// Sort keys so "Headache,Fatigue" and "Fatigue,Headache" are treated the same
const symptomResults: Record<string, string[]> = {};
Object.entries(rawSymptomResults).forEach(([key, value]) => {
  const sortedKey = key.split(',').sort().join(',');
  symptomResults[sortedKey] = value;
});

export default function SymptomCheckerPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [possibleIssues, setPossibleIssues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleCheckSymptoms = () => {
    setIsLoading(true);
    const symptomsKey = selectedSymptoms.slice().sort().join(',');
    const results = symptomResults[symptomsKey];

    if (results) {
      setPossibleIssues(results);
    } else {
      setPossibleIssues(["No match found. Try selecting fewer or different symptoms."]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-4">AI Symptom Checker</h1>
      <p className="text-lg mb-4">Select your symptoms to find possible health issues:</p>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {symptomsList.map(symptom => (
          <Button
            key={symptom}
            variant={selectedSymptoms.includes(symptom) ? "default" : "secondary"}
            className={selectedSymptoms.includes(symptom) ? "bg-accent text-accent-foreground" : ""}
            onClick={() => toggleSymptom(symptom)}
          >
            {symptom}
          </Button>
        ))}
      </div>

      <Button
        onClick={handleCheckSymptoms}
        disabled={isLoading || selectedSymptoms.length === 0}
        className="mb-4 bg-accent text-accent-foreground"
      >
        {isLoading ? "Checking..." : "Check Symptoms"}
      </Button>

      {possibleIssues.length > 0 && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Possible Health Issues:</CardTitle>
            <CardDescription>Based on the selected symptoms:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {possibleIssues.map((issue, index) => (
                <li key={index} className="mb-1">{issue}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
