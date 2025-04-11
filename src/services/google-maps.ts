'use server';

import {z} from 'genkit';

/**
 * Represents a clinic with its name and location.
 */
export interface Clinic {
  /**
   * The name of the clinic.
   */
  name: string;
  /**
   * The address of the clinic.
   */
  address: string;
  /**
   * The rating of the clinic, if available.
   */
  rating?: number;
  /**
   * The number of user ratings, if available.
   */
  user_ratings_total?: number;
  /**
   * The location of the clinic.
   */
  location: {
    lat: number;
    lng: number;
  };
}

const GoogleMapsResponseSchema = z.object({
  results: z.array(
    z.object({
      name: z.string(),
      formatted_address: z.string(),
      rating: z.number().optional(),
      user_ratings_total: z.number().optional(),
      geometry: z.object({
        location: z.object({
          lat: z.number(),
          lng: z.number(),
        }),
      }),
    })
  ),
});

type GoogleMapsResponse = z.infer<typeof GoogleMapsResponseSchema>;

/**
 * Asynchronously retrieves a list of clinics near a given location using the Google Maps API.
 *
 * @param location The location to search for clinics near.
 * @param healthIssue The health issue to search for clinics that can treat.
 * @returns A promise that resolves to a list of Clinic objects.
 */
export async function getClinicsNear(location: { lat: number; lng: number }, healthIssue: string): Promise<Clinic[]> {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error("GOOGLE_MAPS_API_KEY is not set. Please configure your environment variables.");
    }

    const query = encodeURIComponent(`${healthIssue} clinics`);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=5000&type=doctor&keyword=${query}&key=${apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as GoogleMapsResponse;

    if (!GoogleMapsResponseSchema.safeParse(data).success) {
      console.error('Invalid Google Maps API Response', data);
      return [];
    }

    return data.results.map(result => ({
      name: result.name,
      address: result.formatted_address,
      rating: result.rating,
      user_ratings_total: result.user_ratings_total,
      location: result.geometry.location,
    }));
  } catch (error: any) {
    console.error("Failed to fetch clinics:", error);
    return [];
  }
}
