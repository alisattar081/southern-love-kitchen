document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('ordersList');
  if (!list) return;
  const token = localStorage.getItem('token');
  try {
    const res = await fetch('/orders/mine', {
      headers: token ? { 'Authorization': `Bearer ${token}` } : {}
    });
    if (!res.ok) {
      const msg = await res.text();
      list.innerHTML = `<li>${msg}</li>`;
      return;
    }
    const orders = await res.json();
    if (!orders.length) {
      list.innerHTML = '<li>No orders found.</li>';
      return;
    }
    list.innerHTML = orders
      .map(o => `<li>\n        <strong>${o.date} ${o.time}</strong><br>\n        <span>${o.items}</span>\n      </li>`)
      .join('');
  } catch (err) {
    console.error(err);
    list.innerHTML = '<li>Error loading orders</li>';
  }
});
