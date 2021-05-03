import {database} from '../../config/firebase'

// current user get from context api
export const getUserData = (email : string) => {
   database.collection('/users').where("email","==", email).get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        const user = doc.data()
        console.log(user)
        // console.log(user)
        user.crypto.forEach((cc:any) => {
          cc.get().then((snap:any) => {
            console.log(snap.data())
           })
        })
        user.stocks.forEach((cc:any) => {
          cc.get().then((snap:any) => {
            console.log(snap.data())
           })
        })
        user.mutualFunds.forEach((cc:any) => {
          cc.get().then((snap:any) => {
            console.log(snap.data())
           })
        })
      })
    })
}

