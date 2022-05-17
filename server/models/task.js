const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');

const taskSchema = new Schema({
    _id: {type: String, default: uuidv4},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = mongoose.model('tasks', taskSchema);