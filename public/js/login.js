const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        // If response is not ok, display an error message
        const responseData = await response.json();
        alert(responseData.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const username = document.querySelector('#username-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && password) {
    try {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the dashboard
        document.location.replace('/dashboard');
      } else {
        // If response is not ok, display an error message
        const responseData = await response.json();
        alert(responseData.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
