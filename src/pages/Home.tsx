import { IonApp, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonItem, IonPage, IonMenuButton,IonButton, IonIcon} from '@ionic/react';
import Globe from "@/components/ui/globe";
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import HyperText from "@/components/ui/hyper-text";
import RetroGrid from "@/components/ui/retro-grid"; 
import Menu from './Menu'; 
import DeleteIcon from '@mui/icons-material/Delete';
import './Home.css';
import Mapa1 from './SeguimientoSimpleMapa';
import { useState, useEffect, useCallback } from 'react';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Storage } from '@capacitor/storage';
import MediaGallery from './MediaGallery';
import SeguimientoPasos from './SeguimientoPasos'

const Home: React.FC = () => {


  return (
    <IonApp>
      <Menu /> 
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" className="custom-menu-button"/>
            <IonTitle>Inicio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main-content" className="ion-padding bg-gray-100 flex flex-col items-center justify-center h-auto w-full ">
         
           
            <div className="col-span-1 md:col-span-7 bg-card p-4 rounded-lg shadow-md bg-[#d5d153]">
            <h3 className="items-center justify-center flex mb-4 text-2xl font-bold transform transition duration-500 hover:scale-110 hover:text-green-600 bg-gradient-to-r from-black via-green-500 to-green-600 text-transparent bg-clip-text">
              Visualización de rutas</h3>
          <Mapa1/>
            </div>
       

         
     


          <SeguimientoPasos/>
           
      
        
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Home;
