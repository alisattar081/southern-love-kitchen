document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.querySelector('.toggle-password');
  const rememberMe = document.getElementById('rememberMe');
  const errorMsg = document.getElementById('loginError');

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (email === 'user@example.com' && password === 'password123') {
      const token = 'demo-token';
      if (rememberMe.checked) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
      window.location.href = '/profile';
    } else {
      errorMsg.textContent = 'Invalid email or password.';
    }
  });
});
