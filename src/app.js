const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/previews', express.static('public/previews'));
const path = require('path');


app.get('/', (req, res) => {
  res.send('Resume Builder API is running');
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/resume', require('./routes/resume.route'));
app.use('/api/templates', require('./routes/template.routes'));

// Serve output files
app.use('/output', express.static(path.join(__dirname, '../output')));

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});


module.exports = app;
