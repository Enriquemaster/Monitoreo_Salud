// Menu.tsx
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/react';

const Menu: React.FC = () => {
  return (
    <IonMenu side="start" menuId="mainMenu" contentId="main-content" className="bg-green-800 text-white">
      <IonHeader className="bg-green-600">
        <IonToolbar>
          <IonTitle className="text-lg font-semibold text-center py-4">Menú de Salud</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="space-y-2">
          <IonItem button routerLink="/Home" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white px-4 py-2">
            Inicio
          </IonItem>
          <IonItem button routerLink="/Contador" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white px-4 py-2">
            Contador de pasos
          </IonItem>
          <IonItem button routerLink="/Postura" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white px-4 py-2">
            Monitoreo de la postura
          </IonItem>
          <IonItem button routerLink="/Ejercicios" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white px-4 py-2">
            Registro de ejercicios
          </IonItem>
          <IonItem button routerLink="/Seguimiento" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white px-4 py-2">
            Seguimiento de ubicación para el ejercicio al aire libre
          </IonItem>
          <IonItem button routerLink="/Cardiaca" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white px-4 py-2">
            Medidor de frecuencia cardíaca
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
