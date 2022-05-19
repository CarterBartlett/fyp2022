const mongoose = require('mongoose');
const connection = require('../config/database');
const { Schema } = mongoose;

const taskSchema = new Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

module.exports = connection.model('tasks', taskSchema);