
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Welcome to HealthQuest!</h1>
      <p className="text-lg mb-8">Explore our features and embark on a journey to better health.</p>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <Link href="/gamified-scenarios" className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors">
          Gamified Health Scenarios
        </Link>
        <Link href="/symptom-checker" className="px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors">
          AI Symptom Checker
        </Link>
        <Link href="/clinic-finder" className="px-6 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors">
          Local Clinic Finder
        </Link>
        <Link href="https://healthlit-1.onrender.com/" className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/80 transition-colors">
          Basic Health Advice
        </Link>
      </div>
    </div>
  );
}
