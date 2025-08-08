// Client-side validation for the contact form

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const messageInput = document.getElementById('contactMessage');
  const status = document.getElementById('contactStatus');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  function clearErrors() {
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    status.textContent = '';
    status.className = 'form-message';
  }

  function showError(el, message) {
    el.textContent = message;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    let valid = true;

    if (nameInput.value.trim() === '') {
      showError(nameError, 'Name is required.');
      valid = false;
    }

    const emailPattern = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailError, 'Please enter a valid email.');
      valid = false;
    }

    if (messageInput.value.trim().length < 10) {
      showError(messageError, 'Message must be at least 10 characters.');
      valid = false;
    }

    if (valid) {
      status.textContent = 'Message sent!';
      status.classList.add('success');
      form.reset();
    } else {
      status.textContent = 'Please correct the errors above.';
      status.classList.add('error');
    }
  });
});
