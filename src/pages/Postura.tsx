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
            <IonTitle>Postura</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent
          id="main-content"
          className="ion-padding bg-gray-100 flex flex-col items-center justify-center h-auto w-full"
        >
          {/* Icono de Boy para giroscopio apagado */}
          {!gyroEnabled && (
            <div className="flex items-center justify-center h-40 w-40 bg-gray-200 rounded-full mt-4">
            <Boy color="disabled" sx={{ fontSize: 250 }} />
            </div>
          )}

          {/* Icono de Boy para posición incorrecta */}
          {gyroEnabled && postureMessage === 'Posición incorrecta' && (
            <div className="flex items-center justify-center h-40 w-40 bg-gray-200 rounded-full mt-4">
            <Boy sx={{ fontSize: 250 }} />
            </div>
          )}

          {/* Icono de Boy para posición correcta */}
          {gyroEnabled && postureMessage === 'Posición correcta' && (
                <div className="flex items-center justify-center h-40 w-40 bg-gray-200 rounded-full mt-4">
            <Boy color="success" sx={{ fontSize: 250 }} className='p-24'/>
            </div>
          )}

          <h1 className="mt-4 text-4xl font-bold text-green-500">Monitoreo de Postura</h1>
          <p className="mt-2 text-lg text-gray-700">
            Monitoreo de la postura mediante giroscopio y acelerómetro.
          </p>

          {/* Mostrar mensaje de postura */}
          <div className="mt-4 text-center">
            <p className="text-2xl font-semibold">{postureMessage}</p>
          </div>

          {/* Mostrar datos de aceleración */}
          {acceleration && (
            <div className="mt-4 text-center">
              <p>Movimiento en X: {acceleration.x?.toFixed(2)}</p>
              <p>Movimiento en Y: {acceleration.y?.toFixed(2)}</p>
              <p>Movimiento en Z: {acceleration.z?.toFixed(2)}</p>
            </div>
          )}
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Postura;
