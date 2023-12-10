import React from 'react';
import { IonItem, IonLabel, IonButton } from '@ionic/react';
import  Task  from '../models/Task';

interface TaskItemProps {
  task: Task;
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onCompleteTask, onDeleteTask }) => {
  return (
    <IonItem>
      <IonLabel>
        <h2>{task.name}</h2>
        <p>{task.description}</p>
        <p>Tipo: {task.type}</p>
      </IonLabel>
      {!task.completed && <IonButton onClick={() => onCompleteTask(task.id)}>Completar</IonButton>}
      <IonButton onClick={() => onDeleteTask(task.id)}>Eliminar</IonButton>
    </IonItem>
  );
};

export default TaskItem;
