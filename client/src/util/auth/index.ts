import firebase from 'firebase/app'
import {auth, database} from  '../../config/firebase'

const loginWithGoogle = (callback : ()=>void) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  provider.addScope('profile');
  provider.addScope('email');
 
  auth
  .signInWithPopup(provider)
  .then((result) => {
    database.collection("users").where("email", "==", result.user?.email).get().then(data => {
      // console.log(data.size)
      if(data.size){
        console.log("user exists in db")
      }
      else{
        if(result.user){
          const {displayName, email, photoURL} = result.user
          register({displayName, email, photoURL})
        }
      }
    }).then(()=> callback())
    // check if this email exists in database if not create a new user.
    }).catch((error) => {
      console.log(error)
      throw error
    })
}

const register = ({displayName, email,photoURL}:any) => {
  database.collection("users").add({
    name : displayName,
    email : email,
    displayPic : photoURL,
    portfolios: []
  }).then((doc) => {
    console.log(doc)
  })
}

const logout = () => {
  auth.signOut().then(()=>{
    console.log("signed out")
  })
}

export {
  loginWithGoogle,
  register,
  logout
}