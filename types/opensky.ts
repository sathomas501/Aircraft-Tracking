
//types/opensky.ts
import type { Aircraft, PositionData } from './base';

export interface OpenSkyAircraft {
    icao24: string;
    latitude?: number;
    longitude?: number;
    altitude?: number;
    velocity?: number;
    heading: number;
    on_ground: boolean;
    last_contact: number;
    manufacturer: string;
    model?: string;
}

export interface OpenSkyAircraft extends Omit<PositionData, 'latitude' | 'longitude'> {
    latitude?: number;
    longitude?: number;
    manufacturer: string;
    model?: string;
}

export interface ExtendedAircraft extends OpenSkyAircraft, Aircraft {
    altitude: number; // Explicitly define `altitude` as optional
    heading: number;
    latitude: number;
    longitude: number;
    velocity: number;
    "N-NUMBER": string;
    manufacturer: string;
    model?: string;
    NAME: string;
    CITY: string;
    STATE: string;
    isTracked: boolean;
}

export interface AircraftMessage {
    isTracked: boolean;
    icao24: string;
    latitude?: number;
    longitude?: number;
    altitude?: number;
    velocity?: number;
    heading?: number;
    onGround?: boolean;
    lastContact?: number;
    N_N?: string;
<<<<<<< HEAD
    'N-NUMBER'?: string;
    manufacturer?: string;
    model?: string;
    OWNER_TYPE?: string;
    TYPE_AIRCRAFT?: string;
    NAME?: string;
    CITY?: string;
    STATE?: string;
}

export interface OpenSkyPositionData {
    // Define the properties of the OpenSky position data
    icao24: string;
    latitude: number;
    longitude: number;
    altitude: number | null;
    velocity: number | null;
=======
    manufacturer?: string;
    model?: string;
    NAME?: string;
    CITY?: string;
    STATE?: string;
>>>>>>> 798df221367966fbfa340eee7bccf054863206c6
}