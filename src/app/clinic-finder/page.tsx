
'use client';

import { useState } from 'react';
import { findNearestClinics } from '@/ai/flows/local-clinic-finder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ClinicFinderPage() {
  const [healthIssue, setHealthIssue] = useState('');
  const [clinics, setClinics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFindClinics = async () => {
    setIsLoading(true);
    try {
      // Mock location for demonstration
      const location = { lat: 34.052235, lng: -118.243683 }; // Los Angeles coordinates
      const result = await findNearestClinics({ healthIssue, location });
      setClinics(result);
    } catch (error) {
      console.error("Failed to find clinics:", error);
      setClinics([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-4">Local Clinic Finder</h1>
      <p className="text-lg mb-4">Enter your health issue to find the nearest clinics:</p>

      <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
        <Input
          type="text"
          placeholder="Enter Health Issue"
          value={healthIssue}
          onChange={(e) => setHealthIssue(e.target.value)}
          className="md:w-64"
        />
        <Button onClick={handleFindClinics} disabled={isLoading} className="bg-accent text-accent-foreground">
          {isLoading ? "Finding Clinics..." : "Find Clinics"}
        </Button>
      </div>

      {clinics.length > 0 && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Nearest Clinics:</CardTitle>
            <CardDescription>Clinics based on your health issue:</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {clinics.map((clinic, index) => (
                <li key={index} className="mb-2">
                  {clinic.name} - Lat: {clinic.location.lat}, Lng: {clinic.location.lng}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
