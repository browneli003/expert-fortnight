const fs = require("fs");
//const path = require("path");
//const router = require("express");
const data = require('../db/db.json');
const router = require('express').Router();

router.get('/notes', function (req, res) {
    return res.json(data); 
});

router.post('/notes', function (req, res) {
    let newNote = res.body
        fs.appendFile('./db/db.json', newNote, function (err) {
            if (err) throw err;
            console.log('Updated!');
        });
        data.push(newNote);
        res.json(newNote);
});


module.exports = router