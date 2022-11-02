import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
  // Your firebase credentials
  apiKey: "AIzaSyC9hb4US1VRHJqcYE4yZ9jQeOM6h6vJycE",
  authDomain: "waaw-waitlist.firebaseapp.com",
  projectId: "waaw-waitlist",
  storageBucket: "waaw-waitlist.appspot.com",
  messagingSenderId: "213804837638",
  appId: "1:213804837638:web:074369716cbebca22b0c87",
  measurementId: "G-YXEDFG0Y60"
});

var db = firebaseApp.firestore();

export { db };