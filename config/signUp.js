import { getDatabase,  ref, child, set, get, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// import { database } from "../auth";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { app } from "../auth";
// import { database } from "../auth";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// import { delay } from "./signout.js";
import { delay } from "./load.js/main.js";


let username = document.getElementById('username')
let signUpBtn = document.getElementById('signup')
let email = document.getElementById('email')
let password = document.getElementById('password')


const res = await fetch('/auth', {
    method: 'GET'
})
// console.log(res)
const data = await res.json()
// console.log(data)
let firebaseConfig = data.auth.firebaseConfig
const users = data.auth.user

let app = initializeApp(firebaseConfig)
const auth = getAuth();
let database = getDatabase(app)
const stt = ref(database)
const date = new Date()
let idNo = 0;
let balance = 0.00;



signUpBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    // const auth = data.auth.auth
    // console.log(gets)
    // console.log(app)
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then( async (userCredential) => {
        const user = userCredential.user;
        // ...
        await update(ref(database, users + user.uid),{
          email: email.value,
          username: username.value.toLowerCase(),
          userDetails: {
              tbody: '',
              balance: parseFloat(balance.toFixed(2)),
              idNo,
          },
          last_login: date,
        });
        
        await delay(100)
        // delay()
        // location.href = '/'
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)
    })
    

    // await get(child(ref(database), 'users/')).then( async (snapshot) => {
    //     let usd = Object.values(snapshot.val())
    // })
})

await onAuthStateChanged(auth, async (user)=>{
    await delay(4)
    if(user){
        location.href = '/'
    }
})


export { data }