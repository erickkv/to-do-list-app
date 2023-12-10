import {
    getFirestore,
    collection,
    addDoc,
    updateDoc,
    query,
    where,
    getDocs,
    deleteDoc,
    doc
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import Task from '../models/Task';
import { firebaseConfig } from '../firebaseConfig';

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtener el servicio de Firestore
const db = getFirestore(app);
const tasksCollection = collection(db, 'tasks');

export const getTasks = async () => {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Task));
};

export const addTask = async (name: string, description: string, type: string) => {
  await addDoc(tasksCollection, { name, description, type, completed: false });
};

export const completeTask = async (taskId: string) => {
  const taskDoc = doc(db, 'tasks', taskId);
  await updateDoc(taskDoc, { completed: true });
};

export const deleteCompletedTasks = async () => {
  const completedTasksQuery = query(tasksCollection, where('completed', '==', true));
  const completedTasksSnapshot = await getDocs(completedTasksQuery);

  completedTasksSnapshot.docs.forEach(async (taskDoc) => {
    await deleteDoc(doc(tasksCollection, taskDoc.id));
  });
};

export const deleteTask = async (taskId: string) => {
  try {
    const taskDoc = doc(db, 'tasks', taskId);
    await deleteDoc(taskDoc);
    console.log('Tarea eliminada con éxito.');
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    throw error;
  }
};
