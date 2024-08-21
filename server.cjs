const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Student = require('./src/models/Student.cjs'); // Adjust the file extension if needed
const Log = require('./src/models/Log.cjs'); // Adjust the file extension if needed

const app = express();
app.use(express.json()); // Replacing bodyParser.json() with express.json()

// Use CORS middleware
app.use(cors({
  origin: 'https://192.168.1.42:5173', // Allow requests from this origin
}));

mongoose.connect('mongodb://localhost:27017/qr-id');

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

app.post('/api/scan', async (req, res) => {
  const { studentInfo, logAt } = req.body;

  if (!studentInfo || !logAt) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newLog = new Log({
      studentInfo,
      logAt
    })

    await newLog.save();

    res.status(201).json(newLog)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }

})

app.get('/api/admin/', async (req, res) => {
  try {
    const data = await Log.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/users/:studentNo', async (req, res) => {
  const { studentNo } = req.params;
  try {
    const data = await Student.find({ studentNo });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const port = 8000; // Your backend server port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
