const fs = require("fs");
//const path = require("path");
//const router = require("express");
const data = require('../db/db.json');
const router = require('express').Router();
const notes = require('../db/db.json');
const path = require('path');



router.get('/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        if (error) {
            console.log('file error', error);
            return;
        } 
        res.json(JSON.parse(data))
    });
});

router.post("/notes", (req, res) => {
    let newNote = req.body;
    notes.push(newNote);
    res.json(notes);
    fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(notes))
})


router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (error, data) => {
        if (error) {
            throw error;
        } else {
            let notes = [];
            if (data) {
                notes = JSON.parse(data);
            };
            let note = req.body;
            note.id = req.params.id;
            notes.splice(note.id, 1);
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notes, null, 2),
                (error, data) => {
                    if (error) {
                        throw error;
                    }
                    return res.json(notes);
                }
            );
        }
    });
    res.json(req.params.id);
});

module.exports = router;