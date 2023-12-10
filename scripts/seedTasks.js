import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBtUtKdRtttbWBqyUw-4kxyrfn_EdQhGrc",
  authDomain: "todo-list-app-7a09b.firebaseapp.com",
  projectId: "todo-list-app-7a09b",
  storageBucket: "todo-list-app-7a09b.appspot.com",
  messagingSenderId: "311327847819",
  appId: "1:311327847819:web:97b2d91e71aeeb9b15eb8e"
};

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


/* REGLAS ANTERIORES DE FIREBASE

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
} */
