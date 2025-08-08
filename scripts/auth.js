document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const logoutBtn = document.getElementById('logoutBtn');

  async function handleAuth(url, form) {
    const formData = new FormData(form);
    const body = {
      username: formData.get('username'),
      password: formData.get('password')
    };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        alert('Success');
      } else {
        alert(data.error || 'Request failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  }

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleAuth('/auth/login', loginForm);
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleAuth('/auth/register', registerForm);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      alert('Logged out');
    });
  }
});
