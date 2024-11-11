import { useEffect, useState } from 'react';
import {
  IonApp,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonMenuButton,
} from '@ionic/react';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import './Home.css';
import Boy from '@mui/icons-material/Boy';
import Menu from './Menu';

const Postura: React.FC = () => {
  const [acceleration, setAcceleration] = useState<DeviceMotionAccelerationData | null>(null);
  const [postureMessage, setPostureMessage] = useState<string>(''); // Mensaje de postura
  const [gyroEnabled, setGyroEnabled] = useState<boolean>(true); // Estado del giroscopio

  useEffect(() => {
    // Iniciar monitoreo del acelerómetro
    const subscription = DeviceMotion.watchAcceleration({ frequency: 1000 }).subscribe(
      (data: DeviceMotionAccelerationData) => {
        setAcceleration(data);
        setGyroEnabled(true); // Giroscopio activo

        // Evaluar postura en función de los datos de aceleración
        evaluatePosture(data);
      },
      (error) => {
        console.error("Error al acceder al acelerómetro", error);
        setGyroEnabled(false); // Deshabilitar giroscopio si falla
        setPostureMessage("Giroscopio apagado");
      }
    );

    // Limpiar la suscripción cuando el componente se desmonte
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Función para evaluar la postura
  const evaluatePosture = (data: DeviceMotionAccelerationData) => {
    const { x, y, z } = data;

    // Definir umbrales para postura correcta, semi-correcta e incorrecta
    if (x && y && z) {
      if (Math.abs(x) < 1 && Math.abs(y) < 1 && Math.abs(z - 9.8) < 1) {
        setPostureMessage('Posición correcta');
      } else if (Math.abs(x) < 2 && Math.abs(y) < 2 && Math.abs(z - 9.8) < 2) {
        setPostureMessage('Posición no tan correcta');
      } else {
        setPostureMessage('Posición incorrecta');
      }
    }
  };

  return (
    <IonApp>
      <Menu />

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" className="custom-menu-button" />
            <IonTitle className="text-Black">Detector de Postura</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent
          id="main-content"
          className="ion-padding bg-gradient-to-b from-green-700 to-green-800 flex flex-col items-center justify-center h-full w-full"
        >

          {/* Icono de postura */}
          <div className="flex items-center justify-center space-x-4">
            {/* Icono de Boy para giroscopio apagado */}
            {!gyroEnabled && (
              <div className="flex items-center justify-center h-40 w-40 bg-gray-200 rounded-full shadow-lg">
                <Boy color="disabled" sx={{ fontSize: 150 }} />
              </div>
            )}

            {/* Icono de Boy para posición incorrecta */}
            {gyroEnabled && postureMessage === 'Posición incorrecta' && (
              <div className="flex items-center justify-center h-40 w-40 bg-red-500 text-white rounded-full shadow-lg animate-pulse">
                <Boy sx={{ fontSize: 150 }} />
              </div>
            )}

            {/* Icono de Boy para posición correcta */}
            {gyroEnabled && postureMessage === 'Posición correcta' && (
              <div className="flex items-center justify-center h-40 w-40 bg-green-500 text-white rounded-full shadow-lg animate-bounce">
                <Boy color="success" sx={{ fontSize: 150 }} />
              </div>
            )}

            {/* Icono de Boy para posición no tan correcta */}
            {gyroEnabled && postureMessage === 'Posición no tan correcta' && (
              <div className="flex items-center justify-center h-40 w-40 bg-yellow-500 text-white rounded-full shadow-lg">
                <Boy color="disabled" sx={{ fontSize: 150 }} />
              </div>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-bold items-center flex-center flex justify-center text-black">Monitoreo de Postura</h1>
          <p className="mt-2 text-lg text-gray-700 text-center">
            Monitoreo de la postura mediante giroscopio y acelerómetro.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-4">
            <div className="col-span-1 md:col-span-5 bg-green-500 p-4 rounded-lg shadow-md">
              <p className="text-2xl font-semibold text-white">{postureMessage}</p>
            </div>

          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Postura;
