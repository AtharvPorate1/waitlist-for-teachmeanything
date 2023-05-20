const express = require('express');
const path = require('path');
const firebase = require('firebase/compat/app');
require('firebase/compat/database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = firebase.database();
const waitlistRef = database.ref('waitlist');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route for serving the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route for handling the waitlist form submission
app.post('/waitlist', (req, res) => {
  const { email } = req.body;

  if (email) {
    // Push the email to the waitlist node in the database
    waitlistRef
      .push({ email })
      .then(() => {
        res.json({ message: 'Email submitted successfully' });
      })
      .catch((error) => {
        console.error('Error submitting email:', error);
        res.status(500).json({ message: 'Error submitting email' });
      });
  } else {
    res.status(400).json({ message: 'Email is required' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
