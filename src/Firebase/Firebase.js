import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
<<<<<<< HEAD
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
=======

const firebaseConfig = {
  apiKey: "AIzaSyCZOdq8wYrEn5036Yzrmh-dTwE2odRTiXw",
  authDomain: "atlist-49ae0.firebaseapp.com",
  databaseURL: "https://atlist-49ae0.firebaseio.com",
  projectId: "atlist-49ae0",
  storageBucket: "atlist-49ae0.appspot.com",
  messagingSenderId: 576551457478,
}
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.db = app.database()
  }
  
<<<<<<< HEAD
=======
  // listAllUsers(nextPageToken) {
  //   // List batch of users, 10 at a time.
  //   admin.auth().listUsers(10, nextPageToken)
  //     .then(function(listUsersResult) {
  //       listUsersResult.users.forEach(function(userRecord) {
  //         console.log('user', userRecord.toJSON());
  //       });
  //       if (listUsersResult.pageToken) {
  //         // List next batch of users.
  //         this.listAllUsers(listUsersResult.pageToken);
  //       }
  //     })
  //     .catch(function(error) {
  //       console.log('Error listing users:', error);
  //     });
  // }
  // Start listing users from the beginning, 10 at a time.
  
>>>>>>> 22dd207cfbe0bcca819cd08b276bd4dcf0be79f2
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