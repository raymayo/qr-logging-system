const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Student = require('./src/models/Student.cjs'); // Adjust the file extension if needed

const app = express();
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
}));

mongoose.connect('mongodb://localhost:27017/qr-id', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/api/users', async (req, res) => {
  const { studentNo, studentName, studentYear, studentCourse } = req.body;

  try {
    const newUser = new Student({ studentNo, studentName, studentYear, studentCourse });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = 8000; // Your backend server port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
