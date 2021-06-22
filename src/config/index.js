import firebase from 'firebase/app';

export  let firebaseConfig = {
  apiKey: "AIzaSyCvXUAr8RqmznRS6RJonOUNCYQvu191Gmg",
  authDomain: "eaglechat-f8d1a.firebaseapp.com",
  databaseURL: "https://eaglechat-f8d1a-default-rtdb.firebaseio.com",
  projectId: "eaglechat-f8d1a",
  storageBucket: "eaglechat-f8d1a.appspot.com",
  messagingSenderId: "69310581848",
  appId: "1:69310581848:web:be20a51e7d7ad146188e2d",
  measurementId: "G-QR7CJSG76S"
};

firebase.default.initializeApp(firebaseConfig)
