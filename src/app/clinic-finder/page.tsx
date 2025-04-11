'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast"

interface Clinic {
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
}

const placeholderClinics: Clinic[] = [
  {
    name: "City General Hospital",
    address: "123 Main Street, Anytown",
    location: { lat: 34.052235, lng: -118.243683 }
  },
  {
    name: "Community Health Clinic",
    address: "456 Elm Avenue, Anytown",
    location: { lat: 34.050000, lng: -118.250000 }
  },
  {
    name: "Family Wellness Center",
    address: "789 Oak Street, Anytown",
    location: { lat: 34.060000, lng: -118.260000 }
  }
];

export default function ClinicFinderPage() {
  const [healthIssue, setHealthIssue] = useState('');
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast()

  const handleFindClinics = async () => {
    setIsLoading(true);
    try {
      // Geocode the health issue using Nominatim
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(healthIssue)}&format=jsonv2`;
      const response = await fetch(nominatimUrl);
      const data = await response.json();

      if (data && data.length > 0) {
        // Use the coordinates from Nominatim
        const { lat, lon } = data[0];
        console.log(`Coordinates for ${healthIssue}: Lat ${lat}, Lon ${lon}`);

        //For now, show placeholder clinics
        setClinics(placeholderClinics);

      } else {
        console.error("Could not find coordinates for the given health issue.");
          toast({
            title: "Error",
            description: "Could not find coordinates for the given health issue. Please try a different search.",
            variant: "destructive",
          })
        setClinics([]);
      }

    } catch (error) {
      console.error("Error finding clinics:", error);
        toast({
            title: "Error",
            description: "Failed to find clinics. Please try again.",
            variant: "destructive",
        })
      setClinics([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-4">Local Clinic Finder</h1>
      <p className="text-lg mb-4">Enter your health issue to find the nearest clinics:</p>

      {/* <div className="flex flex-col md:flex-row items-center gap-2 mb-4">
        <Input
          type="text"
          placeholder="Enter Health Issue"
          value={healthIssue}
          onChange={(e) => setHealthIssue(e.target.value)}
          className="md:w-64"
        />
        <Button onClick={handleFindClinics} disabled={isLoading} className="bg-accent text-accent-foreground">
          {isLoading ? "Find Clinics" : "Finding Clinics..."}
        </Button>
      </div> */}

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
                  {clinic.name}
                  <br />
                  {clinic.address}
                  <br />
                  Lat: {clinic.location.lat}, Lng: {clinic.location.lng}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
