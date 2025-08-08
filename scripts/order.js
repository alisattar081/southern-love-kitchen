// Client-side validation for the order form

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');
  if (!form) return;

  const nameInput = document.getElementById('orderName');
  const phoneInput = document.getElementById('orderPhone');
  const emailInput = document.getElementById('orderEmail');
  const itemsInput = document.getElementById('orderItems');
  const dateInput = document.getElementById('orderDate');
  const timeInput = document.getElementById('orderTime');
  const status = document.getElementById('orderStatus');

  const nameError = document.getElementById('nameError');
  const phoneError = document.getElementById('phoneError');
  const emailError = document.getElementById('emailError');
  const itemsError = document.getElementById('itemsError');
  const dateError = document.getElementById('dateError');
  const timeError = document.getElementById('timeError');

  function clearErrors() {
    nameError.textContent = '';
    phoneError.textContent = '';
    emailError.textContent = '';
    itemsError.textContent = '';
    dateError.textContent = '';
    timeError.textContent = '';
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

    const phonePattern = /^[\d\s()+-]{7,}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
      showError(phoneError, 'Please enter a valid phone number.');
      valid = false;
    }

    const emailPattern = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailError, 'Please enter a valid email.');
      valid = false;
    }

    if (itemsInput.value.trim().length < 5) {
      showError(itemsError, 'Order details must be at least 5 characters.');
      valid = false;
    }

    if (dateInput.value === '') {
      showError(dateError, 'Date is required.');
      valid = false;
    }

    if (timeInput.value === '') {
      showError(timeError, 'Time is required.');
      valid = false;
    }

    if (valid) {
      status.textContent = 'Order submitted!';
      status.classList.add('success');
      form.reset();
    } else {
      status.textContent = 'Please correct the errors above.';
      status.classList.add('error');
    }
  });
});

