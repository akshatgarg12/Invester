import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig : any = {
  apiKey: process.env.REACT_APP_FB_APIKEY,
  authDomain: process.env.REACT_APP_FB_AUTHDOMAIN,
  projectId:process.env.REACT_APP_FB_PROJECTID,
  storageBucket: process.env.REACT_APP_FB_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MSI,
  appId: process.env.REACT_APP_FB_APPID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENTID
};

const app : firebase.app.App = firebase.initializeApp(firebaseConfig)

export const auth = app.auth()

export const database = app.firestore()

export default app;



