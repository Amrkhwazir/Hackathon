import {auth, db, onAuthStateChanged, getDoc, doc, collection, addDoc, serverTimestamp, getDocs, query, orderBy, deleteDoc, updateDoc, } from '../firebaseConfig.js'

const activeUserName = document.getElementById('activeUserName');
const loggedBtn = document.getElementById('loggedBtn');
const postBtn = document.getElementById('postBtn');
const postInputArea = document.getElementById('postInputArea');
const postInputBlog = document.getElementById('postInputBlog');
const ContentBox = document.getElementById('ContentBox');
const postBox = document.querySelector(".postBox");

getPost()
// console.log(postBtn)
let currentActiveUser;
let globalDataId;

onAuthStateChanged(auth, (activeUser) => {
    if (activeUser) {  
        const uid = activeUser.uid
        getUserData(uid)
        currentActiveUser = uid
    } else{
        window.location.href = "../log-In/login.html"
    }
  });

async  function getUserData(uId){
    console.log(uId)

    const docRef = doc(db, "users", uId);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
    const {firstName, lastName,} = docSnap.data()
    activeUserName.innerHTML = `${firstName} ${lastName}`
    // console.log(firstName, lastName)


  console.log("Document data:", docSnap.data());

} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}
  };
  
 async function postHandler () {

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        postPersonId: currentActiveUser,
        postTitle: postInputArea.value,
        postData: postInputBlog.value,
        time: serverTimestamp()
      });

      getPost()
      postInputArea.value ="";
      postInputBlog.value = ""
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    
  };

  postBtn.addEventListener('click', postHandler)
  async function getPost(){
    ContentBox.innerHTML = ""
    const querySnapshot = await getDocs(query(collection(db, "posts"), orderBy("time", "desc")));
    console.log(querySnapshot);

  querySnapshot.forEach(async(doc) => {
    
    // console.log(doc.id, " => ", doc.data());
    // console.log(doc.id)
    let postId = doc.id;
    const {postTitle,postPersonId,postData, time} = doc.data()
    
    console.log(postData)
    
    const activeAuthrDetail = await getPostUserData(postPersonId)
    console.log(activeAuthrDetail.url);
    
    // ContentBox.innerHTML = "";
    if(postPersonId == currentActiveUser){
        let div = document.createElement('div');
        div.setAttribute('class', 'postArea mb-3 position-relative' )
      
        div.innerHTML = ` <div class="postContent container-fluid py-2 rounded-2 d-flex direction-column">
        <p id="postTitle" class="mx-2">${postTitle}</p> 
        <img class="userImg" src="${activeAuthrDetail.url} || ../assets/profileImage.jpg" alt="" height="45px">
        <p class="usrName mt-2 mx-2">${activeAuthrDetail?.firstName} ${activeAuthrDetail?.lastName}</p>
        <p id="postTime">${new Date(time.seconds * 1000).toLocaleString()}</p> 
        <p class="postText mt-4">${postData}</p>
          <a href="#" onclick="deletePostHandler('${postId}')" id="delete">Delete</a>
          <a href="#" onclick="editPostHandler('${postId}','${postData}','${postTitle}')" id="edit">Edit</a>
      </div>`
      
        ContentBox.appendChild(div)
        postInputArea.value ="";
        postInputBlog.value = ""; 
       
    }
   
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

    // update post

    async function updateHandler(){

      console.log("updateHandler working");
      try {
        
        const washingtonRef = doc(db, "posts", globalDataId);
        console.log(globalDataId);
        
        console.log(globalDataId, ">>> data id globally")
        
        await updateDoc(washingtonRef, {
          postData: postInputBlog.value,
          postTitle: postInputArea.value
        });
        
        window.location.reload()
        inputBar.value = '';
      } catch (error) {
        
        console.log(error, ">>> updateHandler not working")  
       
    }}
    
// Edit post

    async function editPostHandler(postId, postData, postTitle) {
      console.log(postData, postTitle)
      postInputArea.value = postTitle ;
      postInputBlog.value = postData ;
      globalDataId = postId
      // console.log(globalDataId, postData, postTitle,"editHandler working")   
      
      postBtn.innerHTML = "update Blog"
      
      postBtn.removeEventListener("click", postHandler );
      postBtn.addEventListener("click", updateHandler)
      
      
  }

  // delete post
  
  async function  deletePostHandler(postId){
    console.log("working")
    console.log(postId)
  // 
   try {
     await deleteDoc(doc(db, "posts", postId));
     console.log("post delete") 
     getPost()

    } catch (error) {
     console.log(error, ">> deleteHandler not working")
   }
  }


window.editPostHandler = editPostHandler
window.deletePostHandler = deletePostHandler