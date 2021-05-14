import firebase from 'firebase/app'
import {auth, database} from  '../../config/firebase'

export class Auth{
  login(callback : ()=>void){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    provider.addScope('profile');
    provider.addScope('email');

    auth
    .signInWithPopup(provider)
    .then((result) => {
      database.collection("users").doc(result.user?.uid).get().then(data => {
        console.log(data)
        if(data.exists){
          console.log("user signed in!")
        }
        else{
          if(result.user){
            const {uid,displayName, email, photoURL} = result.user
            this.register({uid,displayName, email, photoURL})
          }
        }
      }).then(()=> callback())
      // check if this email exists in database if not create a new user.
      }).catch((error) => {
        console.log(error)
        throw error
      })
  }
  register({uid,displayName, email,photoURL}:any){
    database.collection("users").doc(uid).set({
      name : displayName,
      email : email,
      displayPic : photoURL,
      portfolios: []
    }).then((doc) => {
      console.log("user registered!")
    })
  }
  logout(){
    auth.signOut().then(()=>{
      console.log("signed out")
    })
  }
  currentUser(callback :(u:any)=>void){
    auth.onAuthStateChanged((u) => {
      // console.log(u)
      callback(u)
    })
  }
}
