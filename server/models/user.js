const mongoose = require('mongoose');
const connection = require('../config/database');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const uniqueValidator = require('mongoose-unique-validator');

const SALT_WORK_FACTOR = 10; // Number of times to hash a password

const userSchema = new Schema({
    _id: {type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId() },
    username: {type: String, unique: true, required: true},
    password: {type: String, required: [true, 'Please provide a password'], select: false},
    firstName: String,
    lastName: String,
    createdOn: {type: Date, default: new Date()}
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
    const user = await User.findById(this.id).select('password');
    return await bcrypt.compare(candidatePassword, user.password);
}

userSchema.plugin(uniqueValidator);

const User = connection.model('users', userSchema);
module.exports = User;