// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyApldSzHRBQhMyKWxi-pycxdxCHiPlp2lY",
    authDomain: "book-and-go-5ff92.firebaseapp.com",
    projectId: "book-and-go-5ff92",
    storageBucket: "book-and-go-5ff92.appspot.com",
    messagingSenderId: "818044230834",
    appId: "1:818044230834:web:c9de23752e80eafb713dab",
    measurementId: "G-7HW1FCY06E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const auth = firebase.auth();
db.settings({ timestampsInSnapshots: true })

