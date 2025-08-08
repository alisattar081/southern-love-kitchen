document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.order-form');
  const modal = document.getElementById('cateringModal');
  const closeBtn = document.getElementById('modalClose');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (modal) {
        modal.style.display = 'flex';
      }
      form.reset();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) {
        modal.style.display = 'none';
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
});
