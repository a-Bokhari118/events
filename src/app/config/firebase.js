import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyB8-YtxSDp0iGaXRB0aZOLY4oUH9kpIZjA',
  authDomain: 'revents-app-e0a45.firebaseapp.com',
  databaseURL: 'https://revents-app-e0a45.firebaseio.com',
  projectId: 'revents-app-e0a45',
  storageBucket: 'revents-app-e0a45.appspot.com',
  messagingSenderId: '435862739522',
  appId: '1:435862739522:web:af9cf13edc88ab5af7abdb',
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
