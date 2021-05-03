import firebase from 'firebase/app'
import {auth, database} from  '../../config/firebase'

const loginWithGoogle = (callback : ()=>void) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  auth
  .signInWithPopup(provider)
  .then((result) => {
    // /** @type {firebase.auth.OAuthCredential} */
    // var credential = result.credential;
    // // This gives you a Google Access Token. You can use it to access the Google API.
    // var token = credential && credential.accessToken
    // // The signed-in user info.
    // var user = result.user
    // console.log(result)
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
    });
}

const register = ({displayName, email,photoURL}:any) => {
  database.collection("users").add({
    name : displayName,
    email : email,
    displayPic : photoURL,
    crypto : [],
    stocks : [],
    mutualFunds : []
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