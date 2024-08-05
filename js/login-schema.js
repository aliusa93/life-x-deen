const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://lifexdeen:y2EdbHAx6kG9Ae2l@cluster0.map2rdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    streak : {
        type: Number,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;