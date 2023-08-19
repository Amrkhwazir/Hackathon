
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
  import {getFirestore, doc, setDoc, getDoc, collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, updateDoc, where,} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
  
  import {getStorage,ref, getDownloadURL, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
  

  const firebaseConfig = {
    apiKey: "AIzaSyAZKHA5-yV0J46Plt1MytU8p5qrGzI7Kk8",
    authDomain: "hackathon-d83d2.firebaseapp.com",
    projectId: "hackathon-d83d2",
    storageBucket: "hackathon-d83d2.appspot.com",
    messagingSenderId: "773821806140",
    appId: "1:773821806140:web:7f2f2008b992562d2cb539"
  };

 
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);


  export{
    app,
    auth,
    db,
    createUserWithEmailAndPassword,
    doc,
    setDoc,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    getDoc,
    collection,
    addDoc,
    serverTimestamp,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    updateDoc,
    storage,
    uploadBytesResumable,
    ref,
    getDownloadURL,
    where,
  }