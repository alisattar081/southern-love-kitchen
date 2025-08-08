document.addEventListener('DOMContentLoaded', () => {
  const loginLink = document.getElementById('loginLink');
  const logoutLink = document.getElementById('logoutLink');
  const profileLink = document.getElementById('profileLink');

  function updateNav() {
    const token = localStorage.getItem('token');
    if (token) {
      if (loginLink) loginLink.style.display = 'none';
      if (logoutLink) logoutLink.style.display = 'list-item';
      if (profileLink) profileLink.style.display = 'list-item';
    } else {
      if (loginLink) loginLink.style.display = 'list-item';
      if (logoutLink) logoutLink.style.display = 'none';
      if (profileLink) profileLink.style.display = 'none';
    }
  }

  if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      updateNav();
    });
  }

  updateNav();
});
