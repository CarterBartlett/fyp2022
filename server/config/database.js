const mongoose = require('mongoose');

const DB_URI = process.env.MONGO_URI;
const connection = mongoose.createConnection(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = connection;