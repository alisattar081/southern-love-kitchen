// scripts/order.js
// Builds dynamic menu options, shows order summary and handles submission

document.addEventListener('DOMContentLoaded', () => {
  const menuItems = [
    'Fried Chicken',
    'Mac and Cheese',
    'Collard Greens',
    'Cornbread'
  ];

  const menuContainer = document.getElementById('menuItems');
  if (!menuContainer) return;

  menuItems.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.className = 'menu-option';
    const label = document.createElement('label');
    label.textContent = item;
    const select = document.createElement('select');
    select.name = item.toLowerCase().replace(/\s+/g, '_');
    for (let i = 0; i <= 5; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = i;
      select.appendChild(opt);
    }
    wrapper.appendChild(label);
    wrapper.appendChild(select);
    menuContainer.appendChild(wrapper);
  });

  const form = document.getElementById('orderForm');
  const reviewStep = document.getElementById('reviewStep');
  const summaryDiv = document.getElementById('orderSummary');
  const submitBtn = document.getElementById('submitBtn');
  const messageDiv = document.getElementById('orderMessage');
  const sendEmail = document.getElementById('sendEmail');

  let reviewMode = false;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageDiv.textContent = '';
    if (!reviewMode) {
      const summary = buildSummary();
      if (!summary.items.length) {
        messageDiv.textContent = 'Please select at least one menu item.';
        messageDiv.className = 'error';
        return;
      }
      renderSummary(summary);
      reviewStep.style.display = 'block';
      submitBtn.textContent = 'Submit Order';
      reviewMode = true;
      reviewStep.scrollIntoView({ behavior: 'smooth' });
    } else {
      const order = buildSummary();
      try {
        const res = await fetch('/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        });
        if (!res.ok) throw new Error('Network response was not ok');
        messageDiv.textContent = sendEmail.checked ? 'Order submitted! Confirmation email sent.' : 'Order submitted!';
        messageDiv.className = 'success';
        form.reset();
        submitBtn.textContent = 'Review Order';
        reviewStep.style.display = 'none';
        summaryDiv.innerHTML = '';
        reviewMode = false;
      } catch (err) {
        messageDiv.textContent = 'There was a problem submitting your order.';
        messageDiv.className = 'error';
      }
    }
  });

  function buildSummary() {
    const items = [];
    menuContainer.querySelectorAll('select').forEach(sel => {
      const qty = parseInt(sel.value, 10);
      if (qty > 0) {
        const itemName = sel.parentElement.querySelector('label').textContent;
        items.push({ name: itemName, quantity: qty });
      }
    });
    const name = document.getElementById('orderName').value;
    const phone = document.getElementById('orderPhone').value;
    const email = document.getElementById('orderEmail').value;
    const date = document.getElementById('orderDate').value;
    const time = document.getElementById('orderTime').value;
    return { name, phone, email, date, time, items };
  }

  function renderSummary(data) {
    summaryDiv.innerHTML = '';
    const ul = document.createElement('ul');
    data.items.forEach(it => {
      const li = document.createElement('li');
      li.textContent = `${it.quantity} x ${it.name}`;
      ul.appendChild(li);
    });
    summaryDiv.appendChild(ul);
    const p = document.createElement('p');
    p.textContent = `Pickup/Delivery: ${data.date} at ${data.time}`;
    summaryDiv.appendChild(p);
  }
});
