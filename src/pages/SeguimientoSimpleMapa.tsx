import React, { useEffect, useState } from 'react';
import Mapa from './Mapa';

type LatLng = { lat: number; lng: number };

const SeguimientoSimpleMapa: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null); // Ubicación actual
  const initialCenter = { lat: 20.676, lng: -103.347 }; // Centro inicial del mapa

  // Actualizar posición en cada cambio detectado
  const updatePosition = (position: GeolocationPosition) => {
    const newLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentLocation(newLocation);
  };

  useEffect(() => {
    // Inicia la detección de ubicación por GPS
    const watchId = navigator.geolocation.watchPosition(
      updatePosition,
      (error) => console.error('Error obteniendo ubicación:', error),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }
    );

    // Limpia el listener al desmontar el componente
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <Mapa
        initialCenter={currentLocation || initialCenter} // Centrar el mapa en la ubicación actual
        markers={currentLocation ? [{ lat: currentLocation.lat, lng: currentLocation.lng }] : []} // Solo marcador de ubicación actual
        path={[]} // No pasar ruta para evitar el dibujo de la Polyline
      />
      <div className="tracking-info grid grid-cols-1 gap-4 p-4 items-center justify-center">
        <div className="tracking-item flex flex-col items-center justify-center p-2">
          <div className="mb-2"> 
            <h2 className='font-bold'>Ubicación actual</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeguimientoSimpleMapa;
