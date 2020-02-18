import firebase from "firebase"

const firebaseApp  = {
    apiKey: "AIzaSyCZOdq8wYrEn5036Yzrmh-dTwE2odRTiXw",
    authDomain: "atlist-49ae0.firebaseapp.com",
    databaseURL: "https://atlist-49ae0.firebaseio.com",
    projectId: "atlist-49ae0",
    storageBucket: "atlist-49ae0.appspot.com",
    messagingSenderId: 576551457478,
  }

const db = firebaseApp.firestore()

export { db }