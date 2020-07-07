import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyB43BE9KHgDMi2k7PI_oLbl4TonrRUvnCs',
  authDomain: 'to-do-list-9e87e.firebaseapp.com',
  databaseURL: 'https://to-do-list-9e87e.firebaseio.com',
  projectId: 'to-do-list-9e87e',
  storageBucket: 'to-do-list-9e87e.appspot.com',
  messagingSenderId: '904409037553',
  appId: '1:904409037553:web:9568a1888fbea759244750',
  measurementId: 'G-MJBD4PYKL2',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const database = firebase.database();

export default database;
