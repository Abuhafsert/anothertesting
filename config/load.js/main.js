import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase,  ref, child, set, get, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";


function delay(sleep){
    return new Promise(resolve => setTimeout(resolve, sleep * 1000))
}

export { delay }




const res = await fetch('/auth', {
    method: 'GET'
})
// console.log(res)
const data = await res.json()
const users = data.auth.user

let firebaseConfig = data.auth.firebaseConfig
let app = initializeApp(firebaseConfig)
const auth = getAuth();
// console.log(auth)
let database = getDatabase(app)
const stt = ref(database)


let username = undefined;
let userBalance = null;
onAuthStateChanged(auth, async (user) => {
    
    if(user){
        const uid = user.uid;
        await get(child(stt, users + uid )).then(async  (snapshot) => {
            if(snapshot){
                let usernamed = await Object.values(snapshot.val())[3]
                let usernam = await Object.values(snapshot.val())[2].balance
                userBalance = parseFloat(usernam).toFixed(2)
                username = usernamed
            }
        })
        await fetch('/login-users',{
            method: 'post',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({
                user: user,
                username,
                userBalance
            })
        })
        // .then(res => res.json())
        // .then(data => {
        //     console.log(data)
        // })
    }else{
        // location.href = '/signin'        
        fetch('/login-users',{
            method: 'post',
            headers: new Headers({'Content-Type':'application/json'}),
            body: JSON.stringify({
                user: 'user not found'
            })
        })
        // .then(res => res.json())
        // .then(data => {
        //     // location.href = '/signin'
        //     console.log(data)
        // })
        // console.log('user not found')
    }
})

// window.onload = 'hello'

// const respond = await fetch('/username', {
//     method: 'GET'
// })
// // console.log(res)
// const datas = await respond.json()
// if(datas){
//     location.reload()
// }

export { signOut, auth, username }