const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const studentSchema = new Schema({
  studentNo: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  studentYear: { type: String, required: true },
  studentCourse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the model with the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
