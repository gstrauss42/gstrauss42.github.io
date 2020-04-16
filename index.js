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
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect('mongodb+srv://gstrauss:' + process.env.password +'@matcha-ch0yb.gcp.mongodb.net/shell?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// mongoose.connect('mongodb+srv://gstrauss:' + process.env.password +'@cluster0-ehrn2.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

var index = require('./backend/index.js');
var create = require('./backend/create.js');
var login = require('./backend/login.js');
var profile = require('./backend/profile.js');
// var upload_photo = require('./backend/upload_photo');
var select = require('./backend/select.js');
var logout = require('./backend/logout.js');


app.use('/', index);
app.use('/create', create);
app.use('/login', login);
app.use('/profile', profile);
// app.use('/upload_photo', upload_photo);
app.use('/select', select);
app.use('/logout', logout);

// http.listen('4200', function(){
//     console.log(`listening on port: 4200`);
// });