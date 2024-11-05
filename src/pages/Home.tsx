import { IonApp, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonItem, IonPage, IonMenuButton } from '@ionic/react';
import Globe from "@/components/ui/globe";
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import HyperText from "@/components/ui/hyper-text";
import RetroGrid from "@/components/ui/retro-grid"; 
import Menu from './Menu'; 
import DeleteIcon from '@mui/icons-material/Delete';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonApp>
      <Menu /> 
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonMenuButton slot="start" className="custom-menu-button"/>
            <IonTitle>Home</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main-content" className="ion-padding bg-gray-100 flex flex-col items-center justify-center h-auto w-full ">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 bg-background">
            <section className="col-span-1 md:col-span-5 bg-card p-4 rounded-lg shadow-md bg-[#10b981]">
              <h2 className="text-2xl font-bold">Historial de actividades</h2>
              <p className="mt-2">Get matched with our elite group of hard-selected & rigorously vetted Unicorn Dev, assigned to you in 24 hours.</p>
              <button className="mt-4 text-white p-2 rounded transition duration-300 bg-[#9aa30d] ">Get started</button>
            </section>

            <div className="col-span-1 md:col-span-7 bg-card p-4 rounded-lg shadow-md bg-[#d5d153]">
              <h3 className="text-xl font-bold">Visualización de rutas</h3>
              <p className="mt-2">
                DeviceTotal is an up-and-coming post-seed cybersecurity startup, backed by market-leading investors. Our technology predicts, and prioritizes vulnerabilities found on IoT devices and provides
                recommendations for managing and mitigating the threat of connected devices. 3+ years of experience in Python programming.
              </p>
              <button className="mt-4 bg-secondary text-white bg-[#10b981] hover:bg-green-600 p-2 rounded transition duration-300">Get started</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-background ">
            <div className="col-span-1 bg-card p-4 rounded-lg shadow-md bg-[#10b981]">
              <h3 className="text-xl font-bold">Pasos y Calorías</h3>
              <div className="mt-2 bg-accent p-4 rounded custom-menu-button">
                <p className="text-2xl">+18,65%</p>
                <p className="text-muted-foreground">Hourly rate continuously increases every few months.</p>
              </div>
            </div>



            <div className="col-span-1 bg-card p-4 rounded-lg shadow-md bg-[#d5d153]">
              <h3 className="text-xl font-bold">Distancia Recorrida</h3>
              <div className="mt-2 bg-accent p-4 rounded ">
                <p className="text-2xl">+46,37%</p>
                <p className="text-muted-foreground">New specialists add their resumes to platform every week.</p>
              </div>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonApp>
  );
};

export default Home;
