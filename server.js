const express= require('express');
const app=express();
const path=require('path');
const bodyParser=require('body-parser');
const routes={
    admin:require('./routes/admin').route,
    users:require('./routes/users').route
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/admin', routes.admin);
app.use('/users', routes.users);
app.use('/',express.static(path.join(__dirname,"frontend")));
app.listen(4646,()=> {console.log("server started at http://localhost:4646")});