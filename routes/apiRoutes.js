const fs = require("fs");
//const path = require("path");
//const router = require("express");
//const data = require('../db/db.json');
const router = require('express').Router();
//const notes = require('../db/db.json');
const path = require('path');



router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

router.post("/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf-8"));
    let newNote = req.body;

    savedNotes.push(newNote);
    fs.writeFileSync("../db/db.json", JSON.stringify(savedNotes));
    res.json(newNote);
});


router.delete('/notes/:id', (req, res) => {
    const removeNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf-8"));
    let x = req.params.id;

    const removeNote = removeNotes.findIndex(item => item.id === x);

    removeNotes.splice(removeNote, 1);

    fs.writeFileSync("../db/db.json", JSON.stringify(removeNotes));
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;