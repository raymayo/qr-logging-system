const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const logSchema = new Schema({
  studentInfo: {
    No: { type: String, required: true},
    Name: { type: String, required: true },
    Year: { type: String, required: true },
    Course: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  logAt: {type: Date, default: Date.now}
  
});

// Create the model with the schema
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
