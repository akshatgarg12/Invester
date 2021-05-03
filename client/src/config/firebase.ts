import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig : any = {
  apiKey: "AIzaSyC5RPEPv8hR2DV2P3o7CuE9re7s0OAVjyw",
  authDomain: "invester-4025c.firebaseapp.com",
  projectId: "invester-4025c",
  storageBucket: "invester-4025c.appspot.com",
  messagingSenderId: "808190653085",
  appId: "1:808190653085:web:9c34a56568b76138d49a74",
  measurementId: "G-E0655V54Q9"
};

const app : firebase.app.App = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()

export const database = app.firestore()

export default app;



