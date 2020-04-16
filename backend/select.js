var express = require('express');
var router = express.Router();
var models = require("../models/models");

router.get("/", (req, res) => {
    res.render('select');
});

module.exports = router;