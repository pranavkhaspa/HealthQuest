'use server';
/**
 * @fileOverview This file defines a Genkit flow for recommending the nearest clinics based on a predicted health issue and user location.
 *
 * - findNearestClinics - A function that takes a health issue and location and returns a list of nearby clinics.
 * - FindNearestClinicsInput - The input type for the findNearestClinics function.
 * - FindNearestClinicsOutput - The return type for the findNearestClinics function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getClinicsNear, Clinic} from '@/services/google-maps';

const FindNearestClinicsInputSchema = z.object({
  healthIssue: z.string().describe('The predicted health issue.'),
  location: z.object({
    lat: z.number().describe('The latitude of the user.'),
    lng: z.number().describe('The longitude of the user.'),
  }).describe('The user location.'),
});
export type FindNearestClinicsInput = z.infer<typeof FindNearestClinicsInputSchema>;

const FindNearestClinicsOutputSchema = z.array(z.object({
  name: z.string().describe('The name of the clinic.'),
  address: z.string().describe('The address of the clinic.'),
  rating: z.number().optional().describe('The rating of the clinic, if available.'),
  user_ratings_total: z.number().optional().describe('The number of user ratings, if available.'),
  location: z.object({
    lat: z.number().describe('The latitude of the clinic.'),
    lng: z.number().describe('The longitude of the clinic.'),
  }).describe('The location of the clinic.'),
})).describe('A list of nearby clinics.');
export type FindNearestClinicsOutput = z.infer<typeof FindNearestClinicsOutputSchema>;

export async function findNearestClinics(input: FindNearestClinicsInput): Promise<FindNearestClinicsOutput> {
  return findNearestClinicsFlow(input);
}

const findNearestClinicsFlow = ai.defineFlow<
  typeof FindNearestClinicsInputSchema,
  typeof FindNearestClinicsOutputSchema
>(
  {
    name: 'findNearestClinicsFlow',
    inputSchema: FindNearestClinicsInputSchema,
    outputSchema: FindNearestClinicsOutputSchema,
  },
  async input => {
    const clinics = await getClinicsNear(input.location, input.healthIssue);
    return clinics;
  }
);
