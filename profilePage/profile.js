import { 
    auth,
    app,
    db,
    doc,
    getDoc,
    onAuthStateChanged,
    storage,
    ref,
    getDownloadURL,
    uploadBytesResumable,
    updateDoc,

     } from "../firebaseConfig.js";
  
const userName = document.querySelector('.userName');
const imgInput  = document.querySelector('#img-input');
const updatFirstName = document.getElementById('firstName');
const updateLastName = document.getElementById('lastName');
const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const updateProfileBtn = document.getElementById('updateProfileBtn');
const profileImg = document.querySelector('.userImg');

console.log(profileImg.src)
 
let currentUserActive;

updateProfileBtn.addEventListener("click",  updateProfileHandler)

onAuthStateChanged(auth, (activeUser) => {
  if (activeUser) {
      // User is signed in, see docs for a list of available properties
    
      const uid = activeUser.uid;
      getUserData(uid)
      console.log(uid)
      currentUserActive = uid;
      

  } else {
      console.log("sign out")
      window.location.href = './log-In/login.html'
  }
});



function updateProfileHandler(){
  

    console.log(imgInput.files[0].name)

const file = imgInput.files[0]
const metadata = {
  contentType: 'image/jpeg'
};

const storageRef = ref(storage, 'images/' + file.name);
const uploadTask = uploadBytesResumable(storageRef, file, metadata);

uploadTask.on('state_changed',
  (snapshot) => {

       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
   console.log(error)
    switch (error.code) {
      case 'storage/unauthorized':

        break;
      case 'storage/canceled':

        break;


      case 'storage/unknown':

        break;
    }
  }, 
  () => {
 
    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      console.log('File available at', downloadURL);

console.log(currentUserActive)      
const washingtonRef = doc(db, "users", currentUserActive );


await updateDoc(washingtonRef, {
  firstName: updatFirstName.value,
  lastName: updateLastName.value,
  Password: newPassword.value,
  url: downloadURL,
});
});
});
}

    async function getUserData(uid){
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await  getDoc(docRef);
    
    if (docSnap.exists()) {
    
      const {firstName,lastName,url} = docSnap.data();
      console.log(firstName,lastName,url)
    
    
    userName.innerHTML = `${firstName} ${lastName}`;
    profileImg.src = url

    } else {
    
      console.log("No such document!");
    }
      } catch (error) {
        console.log(error, "error is get in data")
    
    }};
    
