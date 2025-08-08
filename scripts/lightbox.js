document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a.lightbox');
  if (!links.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  const img = document.createElement('img');
  overlay.appendChild(img);

  overlay.addEventListener('click', () => {
    overlay.classList.remove('active');
    img.removeAttribute('src');
  });

  document.body.appendChild(overlay);

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      img.src = link.getAttribute('href');
      overlay.classList.add('active');
    });
  });
});
