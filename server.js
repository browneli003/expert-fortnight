const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRoutes = require('./routes/apiRoutes.js');
const htmlRoutes = require('./routes/htmlRoutes.js');
const path = require('path');
const fs = require('fs');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
  
app.use(express.static('public'));

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
    });

    // Returning index.html page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Returning notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Returning the json file holding the notes
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Returns to index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Adds the new note to the json array
app.post("/api/notes", (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let newNote = req.body;

    savedNotes.push(newNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.json(newNote);
});

// Deletes a note by their id in the json array
app.delete("/api/notes/:id", (req, res) => {
    const removeNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    let x = req.params.id;

    const removeNote = removeNotes.findIndex( item => item.id === x );
    
    removeNotes.splice( removeNote, 1 );

    fs.writeFileSync("./db/db.json", JSON.stringify(removeNotes));
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
