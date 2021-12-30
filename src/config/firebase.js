import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
// import '@react-native-firebase/auth';
// import storage from '@react-native-firebase/storage';
// import '@react-native-firebase/storage';
const firebaseConfig = {
    apiKey: "AIzaSyBz8D2GE15QykiWyRyaBcUA-tODRvnf0TA",
    authDomain: "remainder-app-2862a.firebaseapp.com",
    projectId: "remainder-app-2862a",
    storageBucket: "remainder-app-2862a.appspot.com",
    messagingSenderId: "1012445821514",
    appId: "1:1012445821514:web:54125019a3fdf2a60ac4b3",
    measurementId: "G-R2V2ZWVG2Y"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// const storage = firebase.storage();

export default () => {
  return {firebase, auth};
};
