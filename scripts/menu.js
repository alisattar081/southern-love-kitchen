document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.menu-filters .filter-btn');
  const sections = document.querySelectorAll('.menu-section');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      sections.forEach(section => {
        if (category === 'all' || section.dataset.category === category) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
});
