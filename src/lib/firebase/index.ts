import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC3wNty1ggE_qbrXTkFrhT0LKx_fu8vwZA",
    authDomain: "flow-be0c2.firebaseapp.com",
    databaseURL: "https://flow-be0c2-default-rtdb.firebaseio.com",
    projectId: "flow-be0c2",
    storageBucket: "flow-be0c2.appspot.com",
    messagingSenderId: "801156150850",
    appId: "1:801156150850:web:100e8d265acb0a24b39fdb"
  };

const app: FirebaseApp = initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)

export {app, auth}