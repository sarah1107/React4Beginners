import Rebase from 're-base';
import firebase from 'firebase';

 // Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqLUdvzqwbUWO31AbcyfdoGOoJCyFIflM",
  authDomain: "catch-of-the-day-sarah-bee.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-sarah-bee-default-rtdb.firebaseio.com",
  projectId: "catch-of-the-day-sarah-bee",
  storageBucket: "catch-of-the-day-sarah-bee.appspot.com",
  messagingSenderId: "852223399707",
  appId: "1:852223399707:web:d786844d1568b0bf2f65be"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base; 