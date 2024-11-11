import React, { useEffect, useState } from 'react';
import { Storage } from '@capacitor/storage';

const SeguimientoPasos: React.FC = () => {
  const [steps1, setSteps] = useState(0); // Contador de pasos
  const [distanceTraveled1, setDistanceTraveled] = useState(0); // Distancia recorrida en metros
  const [lastStepTime, setLastStepTime] = useState(0); // Tiempo del último paso detectado
  const [isMoving, setIsMoving] = useState(false); // Estado para detectar movimiento

  const STEP_DISTANCE_METERS = 0.69; // 69 cm en metros

  // Cargar datos al inicio
  useEffect(() => {
    const loadData = async () => {
      const storedSteps = await Storage.get({ key: 'steps1' });
      const storedDistance = await Storage.get({ key: 'distanceTraveled1' });
      
      setSteps(storedSteps.value ? parseInt(storedSteps.value) : 0);
      setDistanceTraveled(storedDistance.value ? parseFloat(storedDistance.value) : 0);
    };

    loadData();
  }, []);

  // Guardar datos en el almacenamiento de Capacitor
  const saveData = async () => {
    await Storage.set({ key: 'steps1', value: steps1.toString() });
    await Storage.set({ key: 'distanceTraveled1', value: distanceTraveled1.toString() });
  };

  // Detectar y contar pasos
  const handleMotion = (event: DeviceMotionEvent) => {
    const acceleration = event.acceleration;
    const currentTime = Date.now();

    if (
      acceleration &&
      (Math.abs(acceleration.x || 0) > 2 || Math.abs(acceleration.y || 0) > 2) &&
      currentTime - lastStepTime > 300 // Esperar 300 ms entre detecciones de pasos
    ) {
      setSteps((prevSteps) => prevSteps + 1); // Incrementa el contador de pasos
      const distanceInMeters = STEP_DISTANCE_METERS; // Convertir distancia de pasos a metros
      setDistanceTraveled((prevDistance) => prevDistance + distanceInMeters); // Actualizar la distancia en metros
      setLastStepTime(currentTime); // Actualizar el tiempo del último paso detectado
      setIsMoving(true);

      saveData(); // Guardar los datos cada vez que haya un paso detectado
    } else {
      setIsMoving(false);
    }
  };

  // Inicia la escucha del movimiento
  useEffect(() => {
    window.addEventListener('devicemotion', handleMotion);

    // Limpia los listeners al desmontar el componente
    return () => {
      window.removeEventListener('devicemotion', handleMotion);
    };
  }, [lastStepTime]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-background">
      <div className="col-span-1 bg-card p-4 rounded-lg shadow-md bg-[#10b981]">
        <h3 className="text-xl font-bold">Pasos Registrados</h3>
        <div className="mt-2 bg-accent p-4 rounded custom-menu-button">
          <h2 className="text-2xl font-bold text-gray-800">{steps1}</h2>
          <p className="text-sm text-gray-500">Pasos Totales en la Aplicación</p>
        </div>
      </div>

      <div className="col-span-1 bg-card p-4 rounded-lg shadow-md bg-[#d5d153]">
        <h3 className="text-xl font-bold">Distancia Recorrida</h3>
        <div className="mt-2 bg-accent p-4 rounded">
          <p className="text-2xl font-bold text-gray-800">{distanceTraveled1.toFixed(2)} m</p>
          <p className="text-sm text-gray-500">Distancia Recorrida en la Aplicación</p>
        </div>
      </div>
    </div>
  );
};

export default SeguimientoPasos;
