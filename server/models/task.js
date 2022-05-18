const mongoose = require('mongoose');
const connection = require('../config/database');
const { Schema } = mongoose;

const taskSchema = new Schema({
    _id: {type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId() },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = connection.model('tasks', taskSchema);