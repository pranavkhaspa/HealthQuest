'use client';

import { useState } from 'react';
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
  keywords: string[];
}

const allClinics: Clinic[] = [
  { name: "Apollo Hospitals", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["cardiology", "diabetes", "orthopedic", "cancer", "maternity"] },
  { name: "Fortis Healthcare", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["cardiology", "diabetes", "orthopedic", "cancer", "maternity"] },
  { name: "Max Healthcare", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["cardiology", "diabetes", "orthopedic", "cancer", "maternity"] },
  { name: "Manipal Hospitals", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["cardiology", "diabetes", "orthopedic", "cancer", "maternity"] },
  { name: "Narayana Health", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["cardiology", "diabetes", "orthopedic", "cancer", "maternity"] },
  { name: "Medanta – The Medicity", address: "Gurgaon", location: { lat: 28.4595, lng: 77.0266 }, keywords: ["multispeciality", "internal medicine", "surgery"] },
  { name: "BLK Super Speciality Hospital", address: "New Delhi", location: { lat: 28.6139, lng: 77.2090 }, keywords: ["multispeciality", "cardiology", "neurology"] },
  { name: "Kokilaben Dhirubhai Ambani Hospital", address: "Mumbai", location: { lat: 19.0760, lng: 72.8777 }, keywords: ["multispeciality", "oncology", "cardiac care"] },
  { name: "Columbia Asia Hospitals", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["general", "family medicine", "pediatrics"] },
  { name: "Artemis Hospital", address: "Gurgaon", location: { lat: 28.4595, lng: 77.0266 }, keywords: ["oncology", "neuroscience", "cardiology"] },
  { name: "Dr. Mohan’s Diabetes Specialities Centre", address: "Chennai", location: { lat: 13.0827, lng: 80.2707 }, keywords: ["diabetes", "endocrinology"] },
  { name: "Cloudnine Hospitals (Maternity & Child)", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["maternity", "childcare", "gynecology"] },
  { name: "Rainbow Children’s Hospital", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["pediatric", "children", "kids", "fever"] },
  { name: "Kaya Skin Clinic", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["skin", "dermatology", "cosmetics"] },
  { name: "Vasan Eye Care", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["eye", "ophthalmology", "vision"] },
  { name: "Sankara Nethralaya", address: "Chennai", location: { lat: 13.0827, lng: 80.2707 }, keywords: ["eye", "ophthalmology", "vision"] },
  { name: "Dr. Batra’s Homeopathy Clinics", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["homeopathy", "alternative medicine"] },
  { name: "Practo Care Clinics", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["general", "primary care"] },
  { name: "SRL Diagnostics Clinics", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["diagnostics", "testing", "pathology"] },
  { name: "Thyrocare Wellness Centres", address: "Various locations", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["wellness", "preventative care"] },
  { name: "Lifeline Multi-Speciality Clinic", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["general", "checkup"] },
  { name: "HealthPlus Diagnostics", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["diagnostics", "checkup"] },
  { name: "WellCare Hospital", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["general", "emergency"] },
  { name: "Nova Medicare", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["medicare", "insurance"] },
  { name: "CareFirst Medical Center", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["general", "first aid"] },
  { name: "Greenleaf Wellness Hospital", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["wellness", "therapy"] },
  { name: "CityHealth Medical Institute", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["research", "institute"] },
  { name: "Pulse24 Emergency Clinic", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["emergency", "urgent care"] },
  { name: "UrbanMed Healthcare", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["urban", "healthcare"] },
  { name: "VitaNova Clinic", address: "Generic location", location: { lat: 20.5937, lng: 78.9629 }, keywords: ["therapy", "rehabilitation"] }
];

export default function ClinicFinderPage() {
  const [healthIssue, setHealthIssue] = useState('');
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()

  const handleFindClinics = () => {
    setIsLoading(true);
    try {
      const searchTerm = healthIssue.toLowerCase();
      const foundClinics = allClinics.filter(clinic =>
        clinic.name.toLowerCase().includes(searchTerm) ||
        clinic.address.toLowerCase().includes(searchTerm) ||
        clinic.keywords.some(keyword => searchTerm.includes(keyword))
      );

      if (foundClinics.length > 0) {
        setClinics(foundClinics);
      } else {
        toast({
          title: "No Clinics Found",
          description: "No clinics matching the search criteria were found.",
          variant: "destructive",
        });
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
