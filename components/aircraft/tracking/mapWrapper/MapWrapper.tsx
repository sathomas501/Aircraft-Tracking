import React, { useState, useMemo } from 'react';
import MapComponent from '../Map/MapComponent';
import UnifiedSelector from '../../selector/UnifiedSelector';

interface Aircraft {
  model: string;
  icao24: string;
  "N-NUMBER": string;
  manufacturer: string;
  latitude: number;
  longitude: number;
  altitude: number;
  heading: number;
  velocity: number;
  on_ground: boolean;
  last_contact: number;
  NAME: string;
  CITY: string;
  STATE: string;
  OWNER_TYPE: string;
  TYPE_AIRCRAFT: string;
  isTracked: boolean;
}

interface State {
  aircraft: Aircraft[];
  isLoading: boolean;
  error: string | null;
  selectedManufacturer: string;
}

const MapWrapper: React.FC = () => {
  console.log('MapWrapper rendering');
  const [state, setState] = useState<State>({
    aircraft: [],
    isLoading: false,
    error: null,
    selectedManufacturer: '',
  });

  const [selectedModel, setSelectedModel] = useState<string>('');

  const modelCounts = useMemo(() => {
    const counts = new Map<string, number>();
    state.aircraft.forEach((plane) => {
      if (plane.model) {
        counts.set(plane.model, (counts.get(plane.model) || 0) + 1);
      }
    });
    return counts;
  }, [state.aircraft]);

  const handleManufacturerSelect = async (manufacturer: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
<<<<<<< HEAD
      const response = await fetch('/api/manufacturer/icao24s', {
=======
      const response = await fetch('/api/manufacturers/icao24s', {
>>>>>>> 314bd49f0f3f6d37433272baaae05e8f3b9af939
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ manufacturer }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch aircraft data.');
      }

      const data = await response.json();
      
      if (!data.icao24List) {
        throw new Error('Invalid data format received from server.');
      }

      setState((prev) => ({
        ...prev,
        selectedManufacturer: manufacturer,
        aircraft: data.icao24List,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Error:', error);
      setState((prev) => ({
        ...prev,
        error: 'Failed to load aircraft data.',
        isLoading: false,
      }));
    }
  };

  const handleAircraftUpdate = (data: { aircraft: Aircraft[] }) => {
<<<<<<< HEAD
    console.log('Received aircraft update:', data.aircraft);
=======
>>>>>>> 314bd49f0f3f6d37433272baaae05e8f3b9af939
    if (!data.aircraft) {
      console.error('Invalid aircraft data received');
      return;
    }
<<<<<<< HEAD
  
    setState((prev) => {
      console.log('Updating state with aircraft:', data.aircraft);
      return {
        ...prev,
        aircraft: data.aircraft,
      };
    });
=======

    setState((prev) => ({
      ...prev,
      aircraft: data.aircraft,
    }));
>>>>>>> 314bd49f0f3f6d37433272baaae05e8f3b9af939
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 right-0 z-10 max-w-sm ml-4">
        <UnifiedSelector
          selectedType="manufacturer"
          selectedManufacturer={state.selectedManufacturer}
          selectedModel={selectedModel}
          modelCounts={modelCounts}
          totalActive={state.aircraft.length}
          onManufacturerSelect={handleManufacturerSelect}
          onModelSelect={setSelectedModel}
          onAircraftUpdate={handleAircraftUpdate}
        />
      </div>

      <div className="absolute inset-0 z-0">
        {!state.isLoading && <MapComponent aircraft={state.aircraft} />}
      </div>

      {state.error && (
        <div className="absolute top-4 left-4 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {state.error}
        </div>
      )}

      {state.isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="text-white">Loading aircraft data...</div>
        </div>
      )}
    </div>
  );
};

export default MapWrapper;