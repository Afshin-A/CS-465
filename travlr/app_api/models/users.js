const mongoose = require('mongoose');

// for cryptography
const crypto = require('crypto');
// for json web tokens
const jwt = require('jsonwebtoken');

// Define the user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    hash: { type: String },
    salt: { type: String }
});

userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
}

// Method to compare entered password against stored hash
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

// Method to generate a JSON Web Token for the current record
userSchema.methods.generateJWT = function () {
    return jwt.sign(
        { // Payload for our JSON Web Token
            _id: this._id,
            email: this.email,
            name: this.name,
        },
        process.env.JWT_SECRET, //SECRET stored in .env file
        { expiresIn: '1h' }); //Token expires an hour from creation
};

// creating a database model by compiling the schema
const User = mongoose.model('users', userSchema);
module.exports = User;