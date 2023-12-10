import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonAlert,
} from '@ionic/react';
import { completeTask, deleteTask, getTasks } from '../services/TaskService';
import TaskList from '../components/TaskList';
import TaskItem from '../components/TaskItem';
import Task from '../models/Task';

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, [tasks]);

  const loadTasks = async () => {
    const loadedTasks = await getTasks();
    setTasks(loadedTasks);
  };

  const handleCompleteTask = async (taskId: string) => {
    await completeTask(taskId);
    loadTasks();
  };

  const handleShowAlert = (taskId: string) => {
    setTaskIdToDelete(taskId);
    setShowAlert(true);
  };

  const handleConfirmDelete = async () => {
    if (taskIdToDelete) {
      await deleteTask(taskIdToDelete);
      loadTasks();
    }
    setShowAlert(false);
    setTaskIdToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setTaskIdToDelete(null);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tareas por hacer</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <h2>Pendientes</h2>
              <TaskList
                tasks={tasks.filter((task) => !task.completed)}
                onCompleteTask={handleCompleteTask}
                onDeleteTask={handleShowAlert}
              />
            </IonCol>
            <IonCol size="6">
              <h2>Completadas</h2>
              <TaskList
                tasks={tasks.filter((task) => task.completed)}
                onCompleteTask={() => {}}
                onDeleteTask={handleShowAlert}
              />
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton routerLink="/create-task">Crear Tarea</IonButton>

        {/* Alerta de confirmación para eliminar tarea */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setTaskIdToDelete(null)}
          header={'Confirmar eliminación'}
          message={`¿Estás seguro de que deseas eliminar esta tarea?`}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: handleCancelDelete,
            },
            {
              text: 'Eliminar',
              handler: handleConfirmDelete,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
