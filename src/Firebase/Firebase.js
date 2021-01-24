import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var firebaseConfig = {  

   apiKey: "AIzaSyCE7lLUYkpD1DEhTmit7JexenEgjLoMyD0",
   authDomain: "atlist-202a1.firebaseapp.com",
   databaseURL: "https://atlist-202a1.firebaseio.com",
   projectId: "atlist",
   storageBucket: "atlist.appspot.com",
   messagingSenderId: "863944990962",
   appId: "1:863944990962:web:9df63183e4c21bf079706b",
   measurementId: "G-LF6P82Q6NB"
 };

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.db = app.database()
  }
  
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)
  
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)

    user = uid => this.db.ref(`users/${uid}`)
    users = () => this.db.ref('users')
}

export default Firebase