var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var models = require("../models/models");


router.get("/", (req, res) => {
    res.render('login');
});

router.post("/", bodyParser.urlencoded({extended: true}), (req, res) => {
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

module.exports = router;