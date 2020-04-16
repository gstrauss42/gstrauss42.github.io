var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var models = require("../models/models");


router.get("/", (req, res) => {
    res.render('create');
});


router.post("/", bodyParser.urlencoded({extended: true}), (req, res) => {
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


module.exports = router;