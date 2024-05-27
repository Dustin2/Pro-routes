// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';

import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCMD405SFjngHCtlPzI-sjd7HYSJhzgaZQ',
  authDomain: 'test-1b3df.firebaseapp.com',
  projectId: 'test-1b3df',
  storageBucket: 'test-1b3df.appspot.com',
  messagingSenderId: '206453184442',
  appId: '1:206453184442:web:4cfd6c6a0425f06850af83',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const database = getFirestore();
export default  {collection, addDoc, onSnapshot, serverTimestamp, query, orderBy};
