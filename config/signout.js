import { auth, signOut, delay, username } from "./load.js/main.js"
// import { data } from "./load.js/products/ig.js"

const res = await fetch('/username', {
    method: 'GET'
})
// console.log(res)
const data = await res.json()

let btn = document.querySelector('button')
let user = document.querySelector('span')


user.innerHTML = data.username

btn.addEventListener('click', signOutUser)

async function signOutUser(e){
    e.preventDefault()
    await signOut(auth)
    await delay(1)
    location.reload()
}

