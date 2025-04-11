/**
 * Represents a geographical location with latitude and longitude coordinates.
 */
export interface Location {
  /**
   * The latitude of the location.
   */
  lat: number;
  /**
   * The longitude of the location.
   */
  lng: number;
}

/**
 * Represents a clinic with its name and location.
 */
export interface Clinic {
  /**
   * The name of the clinic.
   */
  name: string;
  /**
   * The location of the clinic.
   */
  location: Location;
}

/**
 * Asynchronously retrieves a list of clinics near a given location.
 *
 * @param location The location to search for clinics near.
 * @param healthIssue The health issue to search for clinics that can treat.
 * @returns A promise that resolves to a list of Clinic objects.
 */
export async function getClinicsNear(location: Location, healthIssue: string): Promise<Clinic[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Example Clinic',
      location: {
        lat: location.lat + 0.01,
        lng: location.lng + 0.01,
      },
    },
  ];
}
