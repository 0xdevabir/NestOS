
    // DOM Elements
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const logoutButton = document.getElementById('logout-button');
    const showLoginButton = document.getElementById('show-login');
    const showSignupButton = document.getElementById('show-signup');
    const signupContainer = document.getElementById('signup-container');
    const loginContainer = document.getElementById('login-container');
    const logoutContainer = document.getElementById('logout-container');
    const welcomeMessage = document.getElementById('welcome-message');

    // Mock "database" using LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || {};

    // Event: Show Login Section
    showLoginButton.addEventListener('click', () => {
      signupContainer.classList.add('hidden');
      loginContainer.classList.remove('hidden');
    });

    // Event: Show Sign Up Section
    showSignupButton.addEventListener('click', () => {
      loginContainer.classList.add('hidden');
      signupContainer.classList.remove('hidden');
    });

    // Event: Handle Sign Up
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('signup-username').value;
      const password = document.getElementById('signup-password').value;

      if (users[username]) {
        alert('Username already exists! Please choose another.');
      } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Sign up successful! You can now log in.');
        signupContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
      }
    });

    // Event: Handle Login
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('login-username').value;
      const password = document.getElementById('login-password').value;

      if (users[username] && users[username] === password) {
        localStorage.setItem('loggedInUser', username);
        showLogoutContainer(username);
      } else {
        alert('Invalid username or password!');
      }
    });

    // Event: Handle Logout
    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('loggedInUser');
      showLoginContainer();
    });

    // Show Login Container
    function showLoginContainer() {
      loginContainer.classList.remove('hidden');
      logoutContainer.classList.add('hidden');
      signupContainer.classList.add('hidden');
    }

    // Show Logout Container
    function showLogoutContainer(username) {
    //   welcomeMessage.textContent = `Hello, ${username}!`;
      welcomeMessage.textContent = `${username}`;
      logoutContainer.classList.remove('hidden');
      loginContainer.classList.add('hidden');
      signupContainer.classList.add('hidden');
    }

    // Check Login State on Page Load
    window.addEventListener('DOMContentLoaded', () => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        showLogoutContainer(loggedInUser);
      } else {
        showLoginContainer();
      }
    });