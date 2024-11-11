import React, { useEffect, useState } from 'react';
import Mapa from './Mapa';
import { Storage } from '@capacitor/storage';
import { BorderBeam } from "@/components/ui/border-beam";

type LatLng = { lat: number; lng: number };

const SeguimientoMapa: React.FC = () => {
  const [route, setRoute] = useState<LatLng[]>([]); // Ruta acumulada
  const [currentLocation, setCurrentLocation] = useState<LatLng | null>(null); // Ubicación actual
  const [steps2, setSteps] = useState(0); // Contador de pasos
  const [distanceKm2, setDistanceKm] = useState(0); // Distancia en kilómetros
  const [calories2, setCalories] = useState(0); // Calorías quemadas
  const [isMoving, setIsMoving] = useState(false); // Estado para detectar movimiento
  const initialCenter = { lat: 20.676, lng: -103.347 }; // Centro inicial del mapa
  const [lastStepTime, setLastStepTime] = useState(0); // Tiempo del último paso detectado
  
  const STEP_DISTANCE_METERS = 0.69; // 69 cm en metros
  const CALORIES_PER_METER = 0.05; // Calorías quemadas por cada metro recorrido

  // Cargar datos al inicio
  useEffect(() => {
    const loadData = async () => {
      const storedSteps = await Storage.get({ key: 'steps2' });
      const storedDistanceKm = await Storage.get({ key: 'distanceKm2' });
      const storedCalories = await Storage.get({ key: 'calories2' });
      
      setSteps(storedSteps.value ? parseInt(storedSteps.value) : 0);
      setDistanceKm(storedDistanceKm.value ? parseFloat(storedDistanceKm.value) : 0);
      setCalories(storedCalories.value ? parseFloat(storedCalories.value) : 0);
    };

    loadData();
  }, []);

  // Guardar datos en el almacenamiento de Capacitor
  const saveData = async () => {
    await Storage.set({ key: 'steps2', value: steps2.toString() });
    await Storage.set({ key: 'distanceKm2', value: distanceKm2.toString() });
    await Storage.set({ key: 'calories2', value: calories2.toString() });
  };

  // Actualizar posición y calcular distancia, calorías
  const updatePosition = (position: GeolocationPosition) => {
    const newLocation = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    setRoute((prevRoute) => [...prevRoute, newLocation]);
    setCurrentLocation(newLocation);
  };

  useEffect(() => {
    // Inicia la detección de ubicación por GPS
    const watchId = navigator.geolocation.watchPosition(
      updatePosition,
      (error) => console.error('Error obteniendo ubicación:', error),
      { enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }
    );

    // Detección de pasos con el acelerómetro
    const handleMotion = (event: DeviceMotionEvent) => {
      const acceleration = event.acceleration;
      const currentTime = Date.now();

      if (
        acceleration &&
        (Math.abs(acceleration.x || 0) > 2 || Math.abs(acceleration.y || 0) > 2) &&
        currentTime - lastStepTime > 300 // Esperar 300 ms entre detecciones de pasos
      ) {
        setSteps((prevSteps) => prevSteps + 1); // Incrementa el contador de pasos
        const distanceInKm = STEP_DISTANCE_METERS / 1000; // Convertir distancia de pasos a km
        setDistanceKm((prevDistance) => prevDistance + distanceInKm); // Actualizar la distancia en km
        setCalories((prevCalories) => prevCalories + STEP_DISTANCE_METERS * CALORIES_PER_METER); // Calorías acumuladas
        setLastStepTime(currentTime); // Actualizar el tiempo del último paso detectado
        setIsMoving(true);

        saveData(); // Guardar los datos cada vez que haya un paso detectado
      } else {
        setIsMoving(false);
      }
    };

    // Escuchar el evento de movimiento
    window.addEventListener('devicemotion', handleMotion);

    // Limpia los listeners al desmontar el componente
    return () => {
      navigator.geolocation.clearWatch(watchId);
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [isMoving]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
                  <div className="border-4 border-green-500 rounded-lg p-4">
      <Mapa
        initialCenter={currentLocation || initialCenter} // Centrar el mapa en la ubicación actual
        markers={currentLocation ? [{ lat: currentLocation.lat, lng: currentLocation.lng }] : []} // Marcador de ubicación actual
        path={route} // Mostramos el recorrido en el mapa
      />
      </div>
      

        
      <div className="step-counter grid grid-cols-2 sm:grid-cols-2 gap-4 p-4 items-center justify-center ">
      <div className="border-4 border-green-500 rounded-lg ">
        <div className="step-item flex flex-col items-center justify-center p-2">
          <div className="mb-2"> 
          
            <i className="bi bi-person-walking" style={{ fontSize: '40px' }}></i> 
            <h2>Pasos: {steps2}</h2>
            
          </div>
        </div>
        </div>

        <div className="step-item flex flex-col items-center justify-center border-4 border-green-500 rounded-lg  p-2">
        
          <div className="mb-2"> 
            <i className="bi bi-arrow-up-right" style={{ fontSize: '40px' }}></i>
            <h2>Km: {distanceKm2.toFixed(2)}</h2>
          </div>
        </div>
      

        <div className="step-item flex flex-col items-center justify-center border-4 border-green-500 rounded-lg  p-2">
     
          <div className="mb-2">
            <i className="bi bi-fire" style={{ fontSize: '40px' }}></i>
          </div>
          <h2>Calorías: {calories2.toFixed(2)}</h2>
        </div>  
    
      </div>
    </div>
  );
};

export default SeguimientoMapa;
