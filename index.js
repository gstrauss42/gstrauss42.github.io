const express   = require("express");
const app       = require('express')();
const path      = require("path");
var   http      = require('http').createServer(app);
var   session   = require('express-session');
var   mongoose  = require('mongoose');

app.set("view engine", "pug");
require('dotenv').config()
app.set("views", path.join(__dirname, "views"));
app.use(session({secret: process.env.secret, resave: true, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect('mongodb+srv://gstrauss:' + process.env.password +'@matcha-ch0yb.gcp.mongodb.net/shell?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connect('mongodb+srv://gstrauss:' + process.env.password +'@cluster0-ehrn2.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

const bodyParser = require('body-parser');
// var Models = require("../models/models");
// fs = require('fs-extra')
var models = require("./models/models");



// var index = require('./backend/index.js');
// var create = require('./backend/create.js');
// var login = require('./backend/login.js');
// var profile = require('./backend/profile.js');
// // var upload_photo = require('./backend/upload_photo');
// var select = require('./backend/select.js');
// var logout = require('./backend/logout.js');


// app.use('/', index);
// app.use('/create', create);
// app.use('/login', login);
// app.use('/profile', profile);
// // app.use('/upload_photo', upload_photo);
// app.use('/select', select);
// app.use('/logout', logout);

http.listen('4200', function(){
    console.log(`listening on port: 4200`);
});






app.get("/select", (req, res) => {
    res.render('select');
});



app.get("/profile", (req, res) => {
    models.user.findOne({"email": req.session.name}, function(err, doc){
        if(doc)
           res.render('profile', {"username": doc.username, "field1": doc.field1, "field2": doc.field2, "field3": doc.field3, "profile_pic": doc.profile_pic});        
        else
            res.redirect('/');
    })
});

app.post("/profile", bodyParser.urlencoded({extended: true}), (req, res) => {
    if(req.body.field1)
    {
        models.user.findOneAndUpdate({"email":req.session.name},{"field1":req.body.field1}, function(err, doc){
            console.log(doc)
        });
    }
    if(req.body.field2)
    {
        models.user.findOneAndUpdate({"email":req.session.name}, {"field2":req.body.field2}, function(err, doc){

            console.log(doc)
        });
    }
    if(req.body.field3)
    {
        models.user.findOneAndUpdate({"email":req.session.name}, {"field3":req.body.field3}, function(err, doc){

            console.log(doc)
        });
    }
    if(req.body.field1)
    {
        models.user.findOne({"email": req.session.name}, function(err, doc){
            res.render('profile', {"username": doc.username,"field1": req.body.field1, "field2": doc.field2, "field3": doc.field3, "profile_pic": doc.profile_pic});
        })
    }
    else if(req.body.field2)
    {
        models.user.findOne({"email": req.session.name}, function(err, doc){
            res.render('profile', {"username": doc.username,"field1": doc.field1, "field2": req.body.field2, "field3": doc.field3, "profile_pic": doc.profile_pic});
        })
    }
    else if(req.body.field3)
    {
        models.user.findOne({"email": req.session.name}, function(err, doc){
            res.render('profile', {"username": doc.username,"field1": doc.field1, "field2": doc.field2, "field3": req.body.field3, "profile_pic": doc.profile_pic});
        })
    }
    else
    {
        models.user.findOne({"email": req.session.name}, function(err, doc){
            res.render('profile', {"username": doc.username,"field1": doc.field1, "field2": doc.field2, "field3": doc.field3, "profile_pic": doc.profile_pic});
        })
    }
})









app.post("/logout", (req, res) => {
    delete req.session.name;
    res.redirect('/');
});


app.get("/login", (req, res) => {
    res.render('login');
});

app.post("/login", bodyParser.urlencoded({extended: true}), (req, res) => {
    models.user.findOne({"username": req.body.username}, function(err, doc){
        if(!doc)
            res.redirect("login");
        else
        {
            if(req.body.password == doc.password )
            {
                req.session.name = doc.email;
                res.redirect("profile");
            }
                else
                res.redirect("login");
        }
    })
})


app.get("/", (req, res) => {
    res.render('index');
});


app.get("/create", (req, res) => {
    res.render('create');
});


app.post("/create", bodyParser.urlencoded({extended: true}), (req, res) => {
    models.user.findOne({"email": req.body.email}, function(err, doc){
        if(!doc)
        {
            var _user = new models.user ({
                name: req.body.name,
                surname: req.body.surname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                bio: ""
             });
             _user.save(function(err){console.log("created user")});
             res.redirect("login");
        }
        else
        {
            console.log(doc)
            res.redirect("create");
        }
    })
})