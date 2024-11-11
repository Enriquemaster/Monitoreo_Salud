import { IonApp, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonPage, IonMenuButton } from '@ionic/react';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { useState, useEffect, useCallback } from 'react';
import { Storage } from '@capacitor/storage';
import Globe from "@/components/ui/globe";
import HyperText from "@/components/ui/hyper-text";
import RetroGrid from "@/components/ui/retro-grid"; 
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Menu from './Menu';
import './Home.css';

const Contador: React.FC = () => {
  const [steps, setSteps] = useState(0);
  const [acceleration, setAcceleration] = useState<DeviceMotionAccelerationData | null>(null);
  const [subscription, setSubscription] = useState<any>(null);

  // Parámetros de configuración
  const ACCELERATION_THRESHOLD = 1.5;
  const MIN_STEP_DELAY = 500;
  const MIN_MOVEMENT_THRESHOLD = 0.5;
  let lastStepTime = 0;
  let lastAcceleration = 0;
  const userWeight = 70;
  const STEP_LENGTH = 0.762;
  const CALORIES_PER_STEP = 0.04;

  // Función para guardar los pasos
  const saveData = async (newSteps: number) => {
    try {
      await Storage.set({
        key: 'steps',
        value: newSteps.toString()
      });
    } catch (error) {
      console.error('Error saving steps:', error);
    }
  };

  // Cargar los pasos desde el almacenamiento
  const loadData = async () => {
    try {
      const { value: stepsValue } = await Storage.get({ key: 'steps' });
      if (stepsValue) {
        let loadedSteps = parseInt(stepsValue, 10);
        if (loadedSteps > 0) {
          loadedSteps -= 1;  // Resta 1 para contrarrestar el posible paso extra al cargar
        }
        setSteps(loadedSteps);
      }
    } catch (error) {
      console.error('Error loading steps:', error);
    }
  };

  // Función para resetear los datos de pasos
  const resetData = async () => {
    try {
      await Storage.remove({ key: 'steps' });
      setSteps(0);
    } catch (error) {
      console.error('Error resetting steps:', error);
    }
  };

  // Función para detectar un paso
  const detectStep = useCallback((currentAcceleration: number) => {
    const currentTime = Date.now();
    if (
      Math.abs(currentAcceleration - lastAcceleration) > ACCELERATION_THRESHOLD &&
      currentTime - lastStepTime > MIN_STEP_DELAY &&
      currentAcceleration > MIN_MOVEMENT_THRESHOLD
    ) {
      setSteps(prevSteps => {
        const newSteps = prevSteps + 1;
        saveData(newSteps);
        return newSteps;
      });
      lastStepTime = currentTime;
    }
    lastAcceleration = currentAcceleration;
  }, []);

  // Efecto para cargar los datos y suscribirse al sensor de aceleración
  useEffect(() => {
    loadData();
    const watchAcceleration = async () => {
      try {
        const watch = DeviceMotion.watchAcceleration({ frequency: 50 })
          .subscribe((acceleration: DeviceMotionAccelerationData) => {
            setAcceleration(acceleration);
            const magnitude = Math.sqrt(
              Math.pow(acceleration.x || 0, 2) +
              Math.pow(acceleration.y || 0, 2) +
              Math.pow(acceleration.z || 0, 2)
            );
            detectStep(magnitude);
          });
        setSubscription(watch);
      } catch (error) {
        console.error('Error al acceder al acelerómetro:', error);
      }
    };
    watchAcceleration();
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [detectStep]);

  // Cálculos adicionales
  const distanceTraveled = steps * STEP_LENGTH;
  const caloriesBurned = (distanceTraveled / 1000) * (userWeight * 0.57);

  return (
    <IonApp>
      <Menu />
      
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar className="border-b border-gray-200">
            <IonMenuButton slot="start" className="text-gray-600"/>
            <IonTitle className="font-semibold text-gray-800">Seguimiento Calorías</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="bg-gray-50">
          <div className="max-w-xl mx-auto p-6 space-y-6">
            {/* Card Principal - Pasos */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-5xl font-bold text-gray-800 mb-2">
                  {steps.toLocaleString()}
                </h2>
                <p className="text-gray-500 text-lg">
                  Pasos Totales
                </p>
              </div>
            </div>

            {/* Grid de Métricas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Distancia */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {distanceTraveled.toFixed(2)} m
                    </p>
                    <p className="text-sm text-gray-500">
                      Distancia Recorrida
                    </p>
                  </div>
                </div>
              </div>

              {/* Calorías */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {caloriesBurned.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Calorías Quemadas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de Reset */}
            <button 
              onClick={resetData}
              className="w-full bg-green-500 hover:bg-red-600 text-white font-medium px-6 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Resetear Datos
            </button>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Contador;
