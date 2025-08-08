const orderForm = document.querySelector('.order-form form');

if (orderForm) {
  const success = document.createElement('p');
  success.className = 'form-success';
  orderForm.appendChild(success);

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = orderForm.querySelectorAll('[required]');
    const allFilled = Array.from(fields).every(field => field.value.trim());

    if (!allFilled) {
      alert('Please fill out all fields.');
      return;
    }

    success.textContent = 'Order sent successfully!';
    orderForm.reset();
    setTimeout(() => {
      success.textContent = '';
    }, 4000);
  });
}
