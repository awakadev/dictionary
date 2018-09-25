import * as firebase from 'firebase'
import 'firebase/firestore'

const FIREBASE_CONFIG = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID
}

export default function firebaseInit () {
  const app = firebase.initializeApp(FIREBASE_CONFIG)
  app.auth()
}
