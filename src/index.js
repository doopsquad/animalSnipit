import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './Home';
import Collection from './Collection';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANjqQtZm7hPqmHl1ilgApWDRkRRqf5S-0",
  authDomain: "animal-snipet.firebaseapp.com",
  projectId: "animal-snipet",
  storageBucket: "animal-snipet.appspot.com",
  messagingSenderId: "137804291186",
  appId: "1:137804291186:web:f98ace37b6415e271c36eb",
  measurementId: "G-69WQ6RGC1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/app",
    element: <App/>
  },
  {
    path: "/collection",
    element: <Collection/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


