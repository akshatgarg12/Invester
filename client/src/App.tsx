import { useEffect } from 'react';
import {database, auth} from './config/firebase'
import firebase from 'firebase/app'

function App() {
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        const {displayName, email, photoURL, uid}  = user;
        console.log({displayName, email, photoURL, uid})
      }
      else{
        console.log("user is not signed in")
      }
    })
    // database.collection('/users').get().then(snapshot => {
    //   snapshot.docs.forEach(doc => {
    //     const user = doc.data()
    //     console.log(user)
    //     user.crypto.forEach((cc:any) => {
    //       cc.get().then((snap:any) => {
    //         console.log(snap.data())
    //        })
    //     })
    //   })
    // })
  },[])
  const logout = () => {
    auth.signOut().then(()=>{
      console.log("signed out")
    })
  }
  const signin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    auth
    .signInWithPopup(provider)
    .then((result) => {
      // /** @type {firebase.auth.OAuthCredential} */
      // var credential = result.credential;

      // // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = credential && credential.accessToken;
      // // The signed-in user info.
      // var user = result.user;
      // ...
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
      })
      // check if this email exists in database if not create a new user.

    }).catch((error) => {
      console.log(error)
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
  return (
    <div className="App">
      <h1>Invester</h1>
      <button onClick={signin}>signin</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default App;
