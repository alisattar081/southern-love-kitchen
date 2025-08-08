document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name');
  const contactInput = document.getElementById('contact');
  const channelSelect = document.getElementById('notificationChannel');
  const form = document.getElementById('profileForm');

  fetch('/users/me')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch profile');
      return res.json();
    })
    .then((data) => {
      nameInput.value = data.name || '';
      contactInput.value = data.contact || '';
      channelSelect.value = data.notificationChannel || 'email';
    })
    .catch((err) => alert('Update failed'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const payload = {
      name: nameInput.value,
      contact: contactInput.value,
      notificationChannel: channelSelect.value,
    };

    fetch('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      })
      .then((data) => {
        alert('Profile updated');
      })
      .catch((err) => alert('Update failed'));
  });
});
