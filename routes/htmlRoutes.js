const path = require("path");
const router = require('express').Router();
const apiRoutes = require('./apiRoutes');

router.use(apiRoutes);

router.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
  
router.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

router.get('*', (req, res) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
        }
    else {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    }
    });

module.exports = router