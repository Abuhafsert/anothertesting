import  authRouter  from "./authUser.js";
import authUser from './authentication.js'

import express from "express";
import bodyParser from "body-parser"
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import session from 'express-session';
import jwt from 'jsonwebtoken'
import { error } from "console";




const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config()

const app = express();
const port = process.env.PORT || 3000;
const secretKey = 'my first project'


app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


app.use((error, req, res, next)=>{
    console.log(error)
})
app.use('/', authUser)
// app.use(express.static('load.js/'))
app.use(express.static('config/load.js/products'))
app.use(express.static('config/'))

app.use('/', authRouter)



app.post('/login-users', async (req, res) => {
    if(req.body.user === 'user not found'){
        res.clearCookie('uid')

        res.status(200).send('user logOut')
    }else{
        const token = jwt.sign(
            {uid: req.body.user.uid,
             username: req.body.username,
              balance: req.body.userBalance
            }, secretKey)
        res.cookie('uid', token, {httpOnly: true, })
        res.status(200).send('user saved')
    }
})




app.get('/signin', authUid, (req, res)=>{
    res.sendFile(__dirname + '/config/signIn.html')
})

function authUid(req, res, next){


    const uid = req.cookies.uid
    if(!uid){
        next()
    }else{
        jwt.verify(uid, secretKey, (err, decoded) => {
            if(err){
                next()
            }else{
                return res.redirect('/')
            }
        })
    }

}



app.get('/signup',authUid, (req, res)=>{
    res.sendFile(__dirname + '/config/signUp.html')
})


app.use((req, res, next)=>{
        return res.status(404).send('<h1>Sorry cant find that!</h1><a href="/" class="signingup">Home Page</a>')
    // console.log(req.errored)
})
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('<h1>Something broke!</h1><a href="/" class="signingup">Home Page</a>')
  })














app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
  