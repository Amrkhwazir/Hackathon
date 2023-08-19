import { auth, createUserWithEmailAndPassword, setDoc, doc, db } from '../firebaseConfig.js';


const  firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phnNumber = document.getElementById('phnNumber');
const rigesterBtn = document.getElementById('rigesterBtn');
const dateTime = document.getElementById('dateTime');
// console.log(dateTime.value)


function signUpHandler(){

    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    addData(user.uid)
    alert("user signIn successfully")
    // console.log(dateTime.value)
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    // ..
});
}

async function addData(uId){
    console.log(uId)
    
    try {
     
    await setDoc(doc(db, "users", uId), {

       firstName: firstName.value,
       lastName: lastName.value,
       email: email.value,
       password: password.value,
       phnNumber: phnNumber.value,
       date: dateTime.value,
       userId: uId,
    });
    
    console.log("data added in database");

         firstName.value = "";
         lastName.value = "";
         email.value = "";
         password.value = "";
         phnNumber.value = "";
        dateTime.value = ""

         window.location.href = "../log-In/login.html";

    } catch (error) {
        console.log(error, "data is not added id database")
    }
}
rigesterBtn.addEventListener("click", signUpHandler);