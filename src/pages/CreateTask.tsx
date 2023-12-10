import React from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonLoading } from '@ionic/react';
import AddTask from '../components/AddTask';
import { addTask } from '../services/TaskService';
import { useHistory } from 'react-router-dom';

const CreateTaskPage: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = React.useState(false); // Estado para el indicador de carga

  const handleAddTask = async (name: string, description: string, type: string) => {
    try {
      setIsLoading(true); // Muestra el indicador de carga
      await addTask(name, description, type);
      setIsLoading(false); // Oculta el indicador de carga
      history.push('/'); // Redirige a la página principal
    } catch (error) {
      console.error('Error al agregar tarea:', error);
      setIsLoading(false); // Oculta el indicador de carga en caso de error
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton routerLink="/home">Volver</IonButton>
          <IonTitle>Crear Tarea</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AddTask onAddTask={handleAddTask} />
        <IonLoading
          isOpen={isLoading}
          message="Guardando datos..."
        />
      </IonContent>
    </IonPage>
  );
};

export default CreateTaskPage;
