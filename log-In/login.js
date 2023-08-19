import {auth, signInWithEmailAndPassword, } from "../firebaseConfig.js"

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');



function loginHandler(){

    signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      alert("user Logged In");
      window.location.href = "../userPostData/index.html"
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    });
  
  
}

loginBtn.addEventListener("click", loginHandler);