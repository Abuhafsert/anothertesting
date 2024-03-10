import { firebaseConfig, user,
    balance,
    body,
    idNo  } from "./auth.js";
// import { userFalse } from "../../authUsers.js";

import express from "express";
const router = express.Router()
import jwt from 'jsonwebtoken'


const secretKey = 'my first project'

function calling(i){
    return 'hello' + i;
}

// let p = createUserWithEmailAndPassword(auth, 'highdar70@gmail.com', 'musana')

router.get('/auth', (req, res) => {
    res.json({
        auth: {
            firebaseConfig,
            user,
            balance,
            body,
            idNo
        }
    })
})

router.get('/username', (req, res)=>{
    const uid = req.cookies.uid
    jwt.verify(uid, secretKey, (err, decoded) => {
        if(err){
            res.json(undefined)
        }
        res.json(
            {username: decoded.username,
             balance: decoded.balance
            })
    })
})


export default router;