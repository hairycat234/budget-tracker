document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;

        // Store registration data in local storage
        localStorage.setItem(username, password);
        alert('Registration successful!');
    });

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Check if stored password matches the provided password
        const storedPassword = localStorage.getItem(username);
        if (password === storedPassword) {
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Login failed. Invalid credentials.');
        }
    });
});
