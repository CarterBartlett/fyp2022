const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const todoSchema = new Schema({
    _id: {type: String, default: uuidv4},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: String,
    description: String,
    due: Date,
    completed: Boolean,
    completedOn: Date
});

module.exports = mongoose.model('todos', todoSchema);