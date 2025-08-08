document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login';
    return;
  }

  const nameInput = document.getElementById('name');
  const contactInput = document.getElementById('contact');
  const channelSelect = document.getElementById('notificationChannel');
  const form = document.getElementById('profileForm');
  const spinner = document.getElementById('spinner');
  const message = document.getElementById('formMessage');
  const saveBtn = form.querySelector('button');

  fetch('/users/me', {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch profile');
      return res.json();
    })
    .then((data) => {
      nameInput.value = data.name || '';
      contactInput.value = data.contact || '';
      channelSelect.value = data.notificationChannel || 'email';
      form.style.display = 'block';
    })
    .catch(() => {
      message.textContent = 'Failed to load profile';
      message.className = 'form-message error';
    })
    .finally(() => {
      spinner.style.display = 'none';
    });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    message.textContent = '';
    if (!nameInput.value.trim() || !contactInput.value.trim()) {
      message.textContent = 'Please fill out all fields.';
      message.className = 'form-message error';
      return;
    }
    const payload = {
      name: nameInput.value,
      contact: contactInput.value,
      notificationChannel: channelSelect.value,
    };

    saveBtn.disabled = true;
    fetch('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      })
      .then(() => {
        message.textContent = 'Profile updated successfully';
        message.className = 'form-message success';
      })
      .catch(() => {
        message.textContent = 'Update failed';
        message.className = 'form-message error';
      })
      .finally(() => {
        saveBtn.disabled = false;
      });
  });
});
