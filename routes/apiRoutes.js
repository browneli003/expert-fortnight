const fs = require("fs");
//const path = require("path");
//const router = require("express");
//const data = require('../db/db.json');
const router = require('express').Router();
//const notes = require('../db/db.json');
const path = require('path');


// reads notes in db
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

router.post('/notes', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let newNote = req.body;

    savedNotes.push(newNote);
    fs.writeFileSync("../db/db.json", JSON.stringify(savedNotes));
    res.json(newNote);
});


module.exports = router;