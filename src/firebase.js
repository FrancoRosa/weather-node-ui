import firebase from 'firebase';
import firebaseConfig from './firebaseconfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const rtdb = firebaseApp.database();
export const db = firebaseApp.firestore();