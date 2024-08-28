const express = require('express')
const app = express();
const port = 3000;
const path = require('path');
const User = require('./js/login-schema')
const bcrypt = require('bcrypt')
const saltRounds = 10;



// Middleware
app.use(express.json());

// Use the built-in middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


// Home Page

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/css/home.css', (req, res) => {
    res.sendFile(path.join(__dirname, "./css", "home.css"));
});

app.get('/node_modules/hijrah-date/hijrah-date.js', (req, res) => {
    res.sendFile(path.join(__dirname, "./node_modules/hijrah-date", "hijrah-date.js"))
})


// login/register pages
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "./pages", "login.html"));
});

app.get('/register', (req,res) => {
    res.sendFile(path.join(__dirname, "./pages", "register.html"));
})

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, "./pages", "customHome.html"));
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ username }] });  // Check for existing username

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: 'Username already taken' });  // Send an error response for existing username
            }
        }
    }
    
    catch(err) {

    }
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) throw err;

        const newUser = new User({
            username: username,
            password: hash
        });

        newUser.save().then(res.send("User created 👍🏽"))
    })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    async function log() {
        const validUser = await User.findOne({ username: username })
        if(!validUser) {
            res.send("Invalid user or password ❌.")
        } else {
            bcrypt.compare(password, validUser.password, function(err, result) {
                if (err) throw err;
    
                if (result === true) {
                    module.exports = { username }
                    res.redirect('/home')
                } else {
                    res.send('Invalid username or password ❌');
                }
            });
        }
    }

    log()

});






// Run
app.listen(port, () => {
    console.log(`Server running on port ${port} Alhamdulilah.`);
});