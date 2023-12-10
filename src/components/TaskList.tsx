import React from 'react';
import TaskItem from './TaskItem';
import { IonList } from '@ionic/react';
import  Task  from '../models/Task';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <IonList>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </IonList>
  );
};

export default TaskList;
