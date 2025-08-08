document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('orderSubmit');
  if (!submitBtn) return;

  submitBtn.addEventListener('click', async () => {
    const body = {
      name: document.getElementById('orderName').value,
      phone: document.getElementById('orderPhone').value,
      email: document.getElementById('orderEmail').value,
      items: document.getElementById('orderItems').value,
      date: document.getElementById('orderDate').value,
      time: document.getElementById('orderTime').value,
    };
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) {
        const msg = await res.text();
        alert('Error submitting order: ' + msg);
        return;
      }
      alert('Order submitted successfully!');
    } catch (err) {
      console.error(err);
      alert('Network error submitting order');
    }
  });
});
