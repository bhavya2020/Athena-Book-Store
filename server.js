const express= require('express');
const session=require('express-session');
const nodemailer = require("nodemailer");
const usernames=require("./usernames.js");

const passport=require("./passport.js");
const path=require('path');
const bodyParser=require('body-parser');
const cp=require('cookie-parser');
const app=express();
app.use(cp('somesecret'));
app.use(session({
    secret:'somesecret',
    resave:false,
    saveUninitialized:true
}))
const routes={
    admin:require('./routes/admin').route,
    users:require('./routes/users').route
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
    console.log('check logged in');
    if (req.user) {
        next();
    } else {
        res.redirect("/login")
        // res.status(404).send('Unauthorised')
    }
}
var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'nodemailertry@gmail.com',
        pass: 'nodemailer'
    },
    tls: {rejectUnauthorized: false},
    debug:true
});
app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.touser,
        subject : "forgot password",
        text : usernames[0].password
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            res.end("error");
        }else{
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});
app.use('/frontend',(req,res)=>{
    res.redirect("./index.html")
});
app.use('/private',checkLoggedIn,(req,res)=>{
    res.redirect("./admin.html")
});
app.use('/login',express.static(path.join(__dirname,"frontend/adminform.html")));
app.post('/login', passport.authenticate('local', {
        failureRedirect: '/frontend',
        successRedirect: "/private"
    })
);
app.get('/logout', function (req, res){
    req.session.destroy(function (err) {
        res.redirect('/frontend');
    });
});
app.use('/admin', routes.admin);
app.use('/users', routes.users);
app.use('/',express.static(path.join(__dirname,"frontend")));
app.listen(4646,()=> {console.log("server started at http://localhost:4646")});