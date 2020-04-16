var express = require('express');
var router = express.Router();


router.post("/", (req, res) => {
    delete req.session.name;
    res.redirect('/');
});

module.exports = router;