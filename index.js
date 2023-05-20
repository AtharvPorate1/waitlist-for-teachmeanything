import firebase from 'firebase';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
  };

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Get the email form element from the HTML
const emailForm = document.getElementById('emailForm');

// Add an event listener to the form submission
emailForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Get the email input value
  const emailInput = document.getElementById('search-bar');
  const email = emailInput.value;

  // Store the email in the Firebase Realtime Database
  const waitlistRef = firebase.database().ref('waitlist');
  waitlistRef.push({ email: email }, (error) => {
    if (error) {
      console.log('Failed to add email to waitlist:', error);
    } else {
      console.log('Email added to waitlist successfully');
      document.getElementById('dtr').textContent = 'You have been added to the waitlist';
      emailInput.value = ''; // Clear the input field
    }
  });
});
