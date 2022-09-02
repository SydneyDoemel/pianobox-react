
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyCaPdgPiLY5kgDFsg0UqI2TuhsnbiA6XFk",
  authDomain: "capstone-project-78383.firebaseapp.com",
  databaseURL: "https://capstone-project-78383-default-rtdb.firebaseio.com",
  projectId: "capstone-project-78383",
  storageBucket: "capstone-project-78383.appspot.com",
  messagingSenderId: "662513003719",
  appId: "1:662513003719:web:666b5401c8ee8286dfe2e2"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)