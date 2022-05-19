const mongoose = require('mongoose');
const connection = require('../config/database');
const { Schema } = mongoose;

const todoSchema = new Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    createdOn: {
        type: Date,
        default: new Date()
    },
    lastUpdated: Date,
    title: String,
    description: String,
    due: Date,
    completed: Boolean,
    completedOn: Date,
    priority: {type: Number, default: 0}
});

todoSchema.pre('save', async function (next) {
    try {
        this.lastUpdated = new Date();
        next();
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = connection.model('todos', todoSchema);