import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAO-VQJdlDvb-_wAQlPnwqMdlUfsr0vi0c",
  authDomain: "genz-blackbox.firebaseapp.com",
  databaseURL: "https://genz-blackbox-default-rtdb.firebaseio.com",
  projectId: "genz-blackbox",
  storageBucket: "genz-blackbox.appspot.com",
  messagingSenderId: "864985561847",
  appId: "1:864985561847:web:b01ab5013de9ffb91cb1f2",
  measurementId: "G-4N12SCZZVR",
};
let app;
try {
  app = firebase.initializeApp(firebaseConfig);
  console.log("FB APP", app);
} catch (e) {
  console.log("BASE ERROR", e);
}

export default app;
