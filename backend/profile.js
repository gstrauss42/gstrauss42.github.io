var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var models = require("../models/models");


router.get("/", (req, res) => {
    models.user.findOne({"email": req.session.name}, function(err, doc){
        if(doc)
           res.render('profile', {"username": doc.username, "field1": doc.field1, "field2": doc.field2, "field3": doc.field3, "profile_pic": doc.profile_pic});        
        else
            res.redirect('/');
    })
});

router.post("/", bodyParser.urlencoded({extended: true}), (req, res) => {
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

module.exports = router;








