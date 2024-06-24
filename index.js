const express = require('express')
const app = express();
const port = 3000;
const path = require('path');

app.get('/life-x-deen', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log("Sent file.")
});

app.get('/css/home.css', (req, res) => {
    res.sendFile(path.join(__dirname, "./css", "home.css"));
    console.log("Sent file.")
});

app.get('/node_modules/hijrah-date/hijrah-date.js', (req, res) => {
    res.sendFile(path.join(__dirname, "./node_modules/hijrah-date", "hijrah-date.js"))
    console.log("Sent file.")
})






app.listen(port, () => {
    console.log(`Server running on port ${port} Alhamdulilah.`);
});