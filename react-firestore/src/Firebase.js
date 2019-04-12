import * as firebase from 'firebase';
// import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAwou20VX1sJAXux1q5n2WZnZQOkGeD4Vk",
    authDomain: "telephonebook-dff21.firebaseapp.com",
    databaseURL: "https://telephonebook-dff21.firebaseio.com",
    projectId: "telephonebook-dff21",
    storageBucket: "telephonebook-dff21.appspot.com",
    messagingSenderId: "712661674649"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;