const mongoose = require('mongoose');
const connection = require('../config/database');
const { Schema } = mongoose;

const habitSchema = new Schema({
    _id: {type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId() },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    lastUpdated: {
        type: Date
    },
    title: {type: String, required: true},
    description: String,
    habitCount: {
        type: Number,
        default: 0
    },
    habitLastCompleted: Date
});

habitSchema.pre('save', async function (next) {
    try {
        this.lastUpdated = new Date();
        next();
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = connection.model('habit', habitSchema);