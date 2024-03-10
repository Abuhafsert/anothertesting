import express from "express";
const router = express.Router()
import jwt from 'jsonwebtoken'
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const secretKey = 'my first project'


router.get('/',authUser, (req, res, next)=>{
    next()
})


router.get('/igwithpost', authUser, (req, res)=>{
    res.sendFile(__dirname + '/config/load.js/products/igwithpost.html')
})


function authUser(req, res, next){
    const uid = req.cookies.uid
    if(!uid){
        return res.redirect('/signin')
    }else{
        jwt.verify(uid, secretKey, (err, decoded) => {
            if(err){
                return res.redirect('/signin')
            }else{
                next()
            }
        })
    }
}


export default router;
