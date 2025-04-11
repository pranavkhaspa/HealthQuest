
'use client';

import { useState } from 'react';
import { getBasicHealthAdvice } from '@/ai/flows/basic-health-advice';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function HealthAdvicePage() {
  const [healthIssue, setHealthIssue] = useState('');
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAdvice = async () => {
    setIsLoading(true);
    try {
      const result = await getBasicHealthAdvice({ healthIssue });
      setAdvice(result.advice);
    } catch (error) {
      console.error("Failed to get health advice:", error);
      setAdvice("Failed to get health advice. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-4">Basic Health Advice</h1>
      <p className="text-lg mb-4">Enter a health issue to get day-wise advice and minimal medicine suggestions:</p>

      <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
        <Input
          type="text"
          placeholder="Enter Health Issue"
          value={healthIssue}
          onChange={(e) => setHealthIssue(e.target.value)}
          className="md:w-64"
        />
        <Button onClick={handleGetAdvice} disabled={isLoading} className="bg-accent text-accent-foreground">
          {isLoading ? "Getting Advice..." : "Get Advice"}
        </Button>
      </div>

      {advice && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Health Advice:</CardTitle>
            <CardDescription>Day-wise advice and medicine suggestions:</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{advice}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
