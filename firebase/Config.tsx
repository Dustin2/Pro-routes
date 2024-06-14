// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from '@env';
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
  initializeFirestore, CACHE_SIZE_UNLIMITED, enableIndexedDbPersistence
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

initializeApp(firebaseConfig);
export const database = getFirestore();
export default {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  query,
  orderBy,
};
