import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { firebaseConfig } from '../src/firebaseConfig';

const seedTasks = async () => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const tasksCollection = collection(db, 'tasks');

  // Agrega tareas de prueba
  const tasksData = [
    { name: 'Tarea 1', description: 'Descripción 1', type: 'Trabajo', completed: false },
    { name: 'Tarea 2', description: 'Descripción 2', type: 'Casa', completed: true },
  ];

  for (const task of tasksData) {
    await addDoc(tasksCollection, task);
  }

  console.log('Tareas agregadas con éxito.');
};

seedTasks();
