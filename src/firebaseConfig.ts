import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

export const firebaseConfig = {
    apiKey: "AIzaSyBtUtKdRtttbWBqyUw-4kxyrfn_EdQhGrc",
    authDomain: "todo-list-app-7a09b.firebaseapp.com",
    projectId: "todo-list-app-7a09b",
    storageBucket: "todo-list-app-7a09b.appspot.com",
    messagingSenderId: "311327847819",
    appId: "1:311327847819:web:97b2d91e71aeeb9b15eb8e"
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };
