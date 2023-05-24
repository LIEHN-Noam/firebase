import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAbWiXrrhdcvFy0CC26S2GRpFo_5hoEKiA",
    authDomain: "mon-projet-98267.firebaseapp.com",
    databaseURL: "https://mon-projet-98267-default-rtdb.firebaseio.com",
    projectId: "mon-projet-98267",
    storageBucket: "mon-projet-98267.appspot.com",
    messagingSenderId: "28338321457",
    appId: "1:28338321457:web:b552f0c0918a9e193bfd10",
    measurementId: "G-X9Q4B50JZP"
};

const app = initializeApp(firebaseConfig);
const fireDb = getDatabase(app);
const auth = getAuth(app)

export { fireDb };