/**
 * @jest-environment jsdom
 */

describe('login form', () => {
  let form, email, password, remember, error;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="loginForm">
        <input id="email" />
        <input id="password" type="password" />
        <span class="toggle-password">Show</span>
        <input type="checkbox" id="rememberMe" />
        <div id="loginError"></div>
      </form>
    `;
    localStorage.clear();
    sessionStorage.clear();
    jest.resetModules();
    require('../scripts/login.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    form = document.getElementById('loginForm');
    email = document.getElementById('email');
    password = document.getElementById('password');
    remember = document.getElementById('rememberMe');
    error = document.getElementById('loginError');
    delete window.location;
    window.location = { href: '' };
  });

  test('shows error for invalid credentials', () => {
    email.value = 'wrong@example.com';
    password.value = 'wrong';
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(error.textContent).toBe('Invalid email or password.');
  });

  test('stores token in localStorage when remember me checked', () => {
    email.value = 'user@example.com';
    password.value = 'password123';
    remember.checked = true;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(localStorage.getItem('token')).toBe('demo-token');
    expect(sessionStorage.getItem('token')).toBeNull();
  });
});
