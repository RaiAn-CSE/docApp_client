// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: process.env.REACT_APP_apiKey,
  // authDomain: process.env.REACT_APP_authDomain,
  // projectId: process.env.REACT_APP_projectId,
  // storageBucket: process.env.REACT_APP_storageBucket,
  // messagingSenderId: process.env.REACT_APP_messagingSenderId,
  // appId: process.env.REACT_APP_appId,
  apiKey: "AIzaSyDOHs5yy0ujn9Ol-sKhwKsMESeuNDgZXes",
  authDomain: "docapp-cdb5c.firebaseapp.com",
  projectId: "docapp-cdb5c",
  storageBucket: "docapp-cdb5c.appspot.com",
  messagingSenderId: "255964875150",
  appId: "1:255964875150:web:f64c491efb7a9cec2dfcdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;