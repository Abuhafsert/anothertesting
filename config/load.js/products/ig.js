let header = document.querySelector('h1')
let balance = document.querySelector('p')

const res = await fetch('/username', {
    method: 'GET'
})
// console.log(res)
const data = await res.json()

header.innerHTML = data.username
console.log(data.balance)
balance.innerHTML = data.balance

export { data }