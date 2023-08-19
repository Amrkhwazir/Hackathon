import {auth, db, onAuthStateChanged, getDoc, doc, collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, updateDoc, } from './firebaseConfig.js'

const activeUserName = document.getElementById('activeUserName');
const loggedBtn = document.getElementById('loggedBtn');
const postBtn = document.getElementById('postBtn');
const postInputArea = document.getElementById('postInputArea');
const postInputBlog = document.getElementById('postInputBlog');
const ContentBox = document.getElementById('ContentBox');
const postBox = document.querySelector(".postBox");


let currentActiveUser;
let globalDataId;  

getPost()


  async function getPost(){
    ContentBox.innerHTML = ""
    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy("time", "desc")));
  querySnapshot.forEach(async(doc) => {
    
    // console.log(doc.id, " => ", doc.data());
    // console.log(doc.id)
    let postId = doc.id;
    const {postTitle,postPersonId,postData, time} = doc.data()
    
    console.log(postData)
    
    const activeAuthrDetail = await getPostUserData(postPersonId)
    // console.log(activeAuthrDetail);
    
    // ContentBox.innerHTML = "";
    
  let div = document.createElement('div');
    div.setAttribute('class', 'postArea mb-3 position-relative' )
  
    div.innerHTML = ` <div class="postContent container-fluid py-2 rounded-2 d-flex direction-column">
    <p id="postTitle" class="mx-2">${postTitle}</p> 
    <img class="userImg " src="../assets/profileImage.jpg" alt="" height="45px">
    <p class="usrName mt-2 mx-2">${activeAuthrDetail?.firstName} ${activeAuthrDetail?.lastName}</p>
    <p id="postTime" class="mx-2">${new Date(time.seconds * 1000).toLocaleString()}</p> 
    <p class="postText mt-4">${postData}</p>
  </div>`
  
    ContentBox.appendChild(div)
  });
  }

  async function getPostUserData(authUid){
  
    const docRef = doc(db, "users", authUid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
      // console.log(firstName,lastName)
      
    } else {
      
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    }

   