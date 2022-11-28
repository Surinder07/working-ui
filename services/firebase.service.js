import firebase from "firebase";

const firebaseConfig = process.env.firebase;

const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const firebaseDb = firebaseApp.firestore();