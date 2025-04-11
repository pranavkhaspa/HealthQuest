'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const symptomsList = [
  "Fatigue", "Headache", "Fever", "Cough", "Sore Throat",
  "Muscle Aches", "Nausea", "Dizziness", "Runny Nose", "Shortness of Breath"
];

const symptomToCauses: Record<string, { cause: string; advice: string }[]> = {
  "Fatigue": [
    { cause: "Lack of sleep or stress", advice: "Ensure adequate rest and manage stress levels." },
    { cause: "Anemia or thyroid issues", advice: "Consider seeing a doctor for blood tests." },
  ],
  "Headache": [
    { cause: "Tension headache", advice: "Stay hydrated, take breaks from screens." },
    { cause: "Migraine", advice: "Avoid triggers, use pain relief if needed." },
  ],
  "Fever": [
    { cause: "Viral or bacterial infection", advice: "Monitor temperature, consult a doctor if >102°F." },
    { cause: "Flu or COVID", advice: "Rest, hydrate, isolate if needed." },
  ],
  "Cough": [
    { cause: "Common cold", advice: "Use cough syrup, rest, and hydrate." },
    { cause: "Bronchitis or pneumonia", advice: "Seek medical help if persistent." },
  ],
  "Sore Throat": [
    { cause: "Strep throat or viral infection", advice: "Gargle warm salt water, consult doctor if severe." },
  ],
  "Muscle Aches": [
    { cause: "Flu or overexertion", advice: "Rest and use pain relievers." },
  ],
  "Nausea": [
    { cause: "Food poisoning or indigestion", advice: "Avoid solid food, sip water." },
    { cause: "Stomach flu", advice: "Rest, hydrate, and monitor symptoms." },
  ],
  "Dizziness": [
    { cause: "Dehydration or low blood pressure", advice: "Sit down, drink fluids." },
    { cause: "Inner ear issues", advice: "See a doctor if recurrent." },
  ],
  "Runny Nose": [
    { cause: "Cold or allergies", advice: "Use antihistamines or decongestants." },
  ],
  "Shortness of Breath": [
    { cause: "Asthma or COVID", advice: "Seek immediate medical attention." },
    { cause: "Pneumonia or heart issue", advice: "Go to the ER if severe." },
  ],
};

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
    try {
      const causes: { cause: string; advice: string }[] = [];
      selectedSymptoms.forEach(symptom => {
        const symptomCauses = symptomToCauses[symptom];
        if (symptomCauses) {
          causes.push(...symptomCauses);
        }
      });

      const causeCounts: Record<string, { count: number; advice: string }> = {};
      causes.forEach(item => {
        causeCounts[item.cause] = causeCounts[item.cause] || { count: 0, advice: item.advice };
        causeCounts[item.cause].count++;
      });

      const sortedCauses = Object.entries(causeCounts)
        .sort(([, a], [, b]) => b.count - a.count)
        .map(([cause, { advice }]) => ({ cause, advice }));

      if (sortedCauses.length > 0) {
        setPossibleIssues(sortedCauses.slice(0, 2).map(item => `${item.cause}. Advice: ${item.advice}`));
      } else {
        setPossibleIssues(["No specific issues found for these symptoms. Please consult a doctor for further evaluation."]);
      }
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

