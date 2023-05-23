// Handle form submission
document.getElementById('emailForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('search-bar');
  const email = emailInput.value.trim();

  if (email) {
    try {
      // Send a POST request to the server with the email data
      const response = await fetch('/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        emailInput.value = '';
        emailInput.placeholder = data.message;
      } else {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Request failed');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  }
});
