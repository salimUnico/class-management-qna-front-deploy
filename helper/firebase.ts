import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
// import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyBig8fHdh4fprD3Hm70zAo1ym5f1Lak7Ro",
    authDomain: "tpi-clms.firebaseapp.com",
    projectId: "tpi-clms",
    storageBucket: "tpi-clms.appspot.com",
    messagingSenderId: "247568148148",
    appId: "1:247568148148:web:ae9d991ae576751d48d9e1",
    measurementId: "G-XBY88EYWC9"
};
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage };