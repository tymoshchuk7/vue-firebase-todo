import firebase from "firebase";

const firebaseConfig = {
//your config
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()

