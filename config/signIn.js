import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { delay } from "./load.js/main.js";


const res = await fetch('/auth', {
    method: 'GET'
})
// console.log(res)
const data = await res.json()
// console.log(data)
let firebaseConfig = data.auth.firebaseConfig
let app = initializeApp(firebaseConfig)
const auth = getAuth();


let username = document.getElementById('username')
let password = document.getElementById('password')


let btn = document.querySelector('.btn')


btn.addEventListener('click', async (e) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, username.value, password.value)
    .then(async (userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        // console.log(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })

})


await onAuthStateChanged(auth, async (user)=>{
    await delay(2)
    if(user){
        location.href = '/'
    }
})
// const respond = await fetch('/username', {
//         method: 'GET'
//     })
//     // console.log(res)
//     const datas = await respond.json()
//     if(datas){
//         location.reload()
//     }
