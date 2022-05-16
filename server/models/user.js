const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const passport = require('passport');

const SALT_WORK_FACTOR = 10; // Number of times to hash a password

const userSchema = new Schema({
    _id: {type: String, default: uuidv4},
    username: String,
    password: {type: String, required: [true, 'Please provide a password']},
    firstName: String,
    lastName: String
});

userSchema.pre('save', async function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (err) {
        console.error(err);
        next(err);
    }
});

userSchema.methods.verifyPassword = async function (candidatePassword, done) {
    return await bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('users', userSchema);