import { IonApp, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonItem, IonPage, IonMenuButton } from '@ionic/react';
import Globe from "@/components/ui/globe";
import HyperText from "@/components/ui/hyper-text";
import RetroGrid from "@/components/ui/retro-grid"; 
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import './Home.css';
import Menu from './Menu';


const Postura: React.FC = () => {
  return (
    <IonApp>
        <Menu /> {/* Aquí se incluye el menú */}
    


     
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" className="custom-menu-button"  />
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main-content" className="ion-padding bg-gray-100 flex flex-col items-center justify-center h-auto w-full">
      

     
          <h1 className="mt-4 text-4xl font-bold text-green-500">
            Postura
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            Este es un texto estilizado con Tailwind.
          </p>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Postura;
