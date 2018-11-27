import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCV6T_qMIKOmRHkTepT3mvFLVdVcSOqDgA",
    authDomain: "todolxs.firebaseapp.com",
    databaseURL: "https://todolxs.firebaseio.com",
    projectId: "todolxs",
    storageBucket: "todolxs.appspot.com",
    messagingSenderId: "945676605396"
};

firebase.initializeApp(config);

export default { firebase };
