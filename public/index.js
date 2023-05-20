// Handle form submission
document.getElementById('emailForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('search-bar');
  const email = emailInput.value.trim();

  if (email) {
    // Send a POST request to the server with the email data
    fetch('/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        emailInput.value = '';
        emailInput.placeholder = data.message;
      })
      .catch((error) => {
        console.error('Error submitting email:', error);
      });
  }
});
