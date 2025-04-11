
'use client';

import { useState } from 'react';
import { aiSymptomChecker } from '@/ai/flows/ai-symptom-checker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const symptomsList = [
  "Fatigue",
  "Headache",
  "Fever",
  "Cough",
  "Sore Throat",
  "Muscle Aches",
  "Nausea",
  "Dizziness",
  "Runny Nose",
  "Shortness of Breath"
];

export default function SymptomCheckerPage() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [possibleIssues, setPossibleIssues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
  };

  const handleCheckSymptoms = async () => {
    setIsLoading(true);
    try {
      const result = await aiSymptomChecker({ symptoms: selectedSymptoms });
      setPossibleIssues(result.possibleIssues);
    } catch (error) {
      console.error("Failed to check symptoms:", error);
      setPossibleIssues(["Failed to get health issues. Please try again."]);
    } finally {
      setIsLoading(false);
    }
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

      <Button onClick={handleCheckSymptoms} disabled={isLoading} className="mb-4 bg-accent text-accent-foreground">
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
