var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var Models = require("../models/models");
fs = require('fs-extra')

multer = require('multer')
util = require('util')
upload = multer({limits: {fileSize: 2000000 },dest:'../uploads'});

router.post('/', upload.single('picture'), bodyParser.urlencoded({extended: true}), function (req, res)
{
    if(req.file == null)
    {
        console.log("received no file from the front end")
        return res.redirect ("profile");
    }
    Models.user.findOne({email : req.session.name}, function(err, display){
            // reads the img file from tmp in-memory location
            var newImg = fs.readFileSync(req.file.path);
            // encodes the file as a base64 string
            var encImg = newImg.toString('base64');
            Models.user.findOneAndUpdate({email: req.session.name}, {"profile_pic": encImg}, function(err, val){
                console.log("saved main image");
            });
    });
    return res.redirect("profile");
});

module.exports = router;