// Simple contact form validation
// Adds error class to empty or invalid fields and shows success alert on submit

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll('input, textarea').forEach((field) => {
      field.classList.remove('error');
      const isEmail = field.type === 'email';
      const value = field.value.trim();
      if (!value || (isEmail && !/^\S+@\S+\.\S+$/.test(value))) {
        field.classList.add('error');
        valid = false;
      }
    });

    if (valid) {
      alert('Thank you! Your message has been sent.');
      form.reset();
    }
  });
});
