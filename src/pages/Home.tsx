import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Globe from "@/components/ui/globe";
import HyperText from "@/components/ui/hyper-text";
import RetroGrid from "@/components/ui/retro-grid"; 
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent className="ion-padding bg-gray-100 flex flex-col items-center justify-center h-auto w-full">
      
      
      <HyperText
      className="text-4xl font-bold text-black dark:text-blue"
      text="Hyper Text"/>

      
{/* Texto adicional para probar Tailwind */}
<h1 className="mt-4 text-4xl font-bold text-blue-500">
          ¡Tailwind CSS está funcionando!
        </h1>
        <p className="mt-2 text-lg text-gray-700">
          Este es un texto estilizado con Tailwind.
        </p>


   

      </IonContent>
    </IonPage>
  );
};

export default Home;
