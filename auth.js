import { initializeApp } from 'firebase/app'
import { getDatabase, ref, child, set, get, remove, update } from 'firebase/database'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth'
import dotenv from 'dotenv'

dotenv.config()


const apiKey=process.env.apiKey
const authDomain=process.env.authDomain
const databaseURL=process.env.databaseURL
const projectId=process.env.projectId
const storageBucket=process.env.storageBucket
const messagingSenderId=process.env.messagingSenderId
const appId=process.env.appId



const firebaseConfig = {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
  };

const app = initializeApp(firebaseConfig);
//   const analytics = getAnalytics(app);
const database = getDatabase(app)
const stt = ref(database)
const auth = getAuth();

const user = process.env.user
const balance = process.env.balance
const body = process.env.body
const idNo = process.env.idno



export {
    firebaseConfig,
    app,
    stt,
    ref,
    child,
    set,
    get,
    remove,
    update,
    database,
    auth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    user, 
    balance,
    body,
    idNo
}
  


