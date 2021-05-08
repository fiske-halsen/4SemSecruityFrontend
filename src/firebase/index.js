import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDYKAvrWm7cqBxwX5hJdBbXiI4pZD2yFEE",
  authDomain: "semsecurityfileupload.firebaseapp.com",
  projectId: "semsecurityfileupload",
  storageBucket: "semsecurityfileupload.appspot.com",
  messagingSenderId: "214360940377",
  appId: "1:214360940377:web:7a804abd5033ea75d47648",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
