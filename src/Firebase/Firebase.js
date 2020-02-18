import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyCZOdq8wYrEn5036Yzrmh-dTwE2odRTiXw",
  authDomain: "atlist-49ae0.firebaseapp.com",
  databaseURL: "https://atlist-49ae0.firebaseio.com",
  projectId: "atlist-49ae0",
  storageBucket: "atlist-49ae0.appspot.com",
  messagingSenderId: 576551457478,
}

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig)
    this.auth = app.auth()
    this.db = app.database()
  }
  
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