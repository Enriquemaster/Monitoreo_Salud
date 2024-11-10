import React from 'react';
import { IonApp, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import SeguimientoMapa from './SeguimientoMapa'; // Asegúrate de que la ruta sea correcta

const Seguimiento: React.FC = () => {
  return (
    <IonApp>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" className="custom-menu-button" />
            <IonTitle>Seguimiento de Rutas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          {/* Inserta el componente SeguimientoMapa para mostrar el mapa y la distancia recorrida */}
          <h1 className="items-center justify-center flex mb-4 text-4xl font-bold transform transition duration-500 hover:scale-110 hover:text-yellow-400">
  Tu Progreso
</h1>
          <SeguimientoMapa />
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Seguimiento;
