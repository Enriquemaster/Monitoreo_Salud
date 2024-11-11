import { IonApp, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonItem, IonPage, IonMenuButton, IonRouterOutlet } from '@ionic/react';
import Globe from "@/components/ui/globe";
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import HyperText from "@/components/ui/hyper-text";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";
import RetroGrid from "@/components/ui/retro-grid"; 
import './Home.css';
import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Menu from './Menu';





const Cardiaca: React.FC = () => {

  const [value, setValue] = useState(0);
  const history = useHistory(); 
 
  useEffect(() => {
    const handleIncrement = (prev: number) => {
      if (prev === 100) {
        history.push('/home'); //
        return 0;
      }
      return prev + 10;
    };
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 500);
    return () => clearInterval(interval);
  }, []);
  

  return (
    <IonApp>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Cargando...</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main-content" className="ion-padding bg-gray-100 flex flex-col items-center justify-center ">
    
        <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Centra el contenido */}
        <AnimatedCircularProgressBar  
       max={100}
       min={0}
       value={value}
       gaugePrimaryColor="rgb(81 170 11)"
       gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
         />
         
        </div>
      
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Cardiaca;
