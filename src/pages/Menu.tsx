import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonIcon } from '@ionic/react';
import { home, walk, pulse, fitness, map } from 'ionicons/icons'; // Importar iconos de Ionicons

const Menu: React.FC = () => {
  return (
    <IonMenu side="start" menuId="mainMenu" contentId="main-content" className="bg-gradient-to-b from-green-700 to-green-800 text-white">
      <IonHeader className="bg-green-600">
        <IonToolbar>
          <IonTitle className="text-lg font-semibold text-center py-2 text-green-500">Menú de Salud</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList className="space-y-2 px-4 py-2">
          {/* Item 1: Inicio */}
          <IonItem button routerLink="/Home" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white py-3 px-2">
            <IonIcon icon={home} slot="start" className="text-xl" />
            <span className="ml-3">Inicio</span>
          </IonItem>
          
          {/* Item 2: Contador de pasos */}
          <IonItem button routerLink="/Contador" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white py-3 px-2">
            <IonIcon icon={walk} slot="start" className="text-xl" />
            <span className="ml-3">Contador de pasos</span>
          </IonItem>

          {/* Item 3: Monitoreo de la postura */}
          <IonItem button routerLink="/Postura" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white py-3 px-2">
            <IonIcon icon={pulse} slot="start" className="text-xl" />
            <span className="ml-3">Monitoreo de la postura</span>
          </IonItem>

          {/* Item 4: Registro de ejercicios */}
          <IonItem button routerLink="/Ejercicios" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white py-3 px-2">
            <IonIcon icon={fitness} slot="start" className="text-xl" />
            <span className="ml-3">Registro de ejercicios</span>
          </IonItem>

          {/* Item 5: Seguimiento */}
          <IonItem button routerLink="/Seguimiento" className="hover:bg-green-700 transition duration-300 rounded-md text-black dark:text-white py-3 px-2">
            <IonIcon icon={map} slot="start" className="text-xl" />
            <span className="ml-3">Seguimiento en el aire libre</span>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

