import { IonApp, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonItem, IonPage, IonMenuButton, IonRouterOutlet } from '@ionic/react';
import Globe from "@/components/ui/globe";
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import HyperText from "@/components/ui/hyper-text";
import RetroGrid from "@/components/ui/retro-grid"; 
import './Home.css';
import Menu from './Menu';





const Cardiaca: React.FC = () => {
  return (
    <IonApp>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start"  className="custom-menu-button"/>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main-content" className="ion-padding bg-gray-100 flex flex-col items-center justify-center h-auto w-full">
          <HyperText
            className="text-4xl font-bold text-black dark:text-green-500"
            text="Hyper Text"
          />

     
          <h1 className="mt-4 text-4xl font-bold text-green-500">
            ¡Ritmo cardiaco!
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            Este es un texto estilizado con Tailwind.
          </p>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Cardiaca;
