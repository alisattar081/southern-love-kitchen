document.addEventListener('DOMContentLoaded', () => {
  const STAR_PATH = "M10 15l-5.878 3.09 1.122-6.545L.487 6.91l6.563-.955L10 0l2.95 5.955 6.563.955-4.757 4.635 1.122 6.545z";

  function createStars(filled) {
    const container = document.createElement('div');
    container.className = 'stars';
    for (let i = 0; i < 5; i++) {
      const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      star.setAttribute('viewBox', '0 0 20 20');
      star.innerHTML = `<path d="${STAR_PATH}"/>`;
      if (i < filled) star.classList.add('filled');
      container.appendChild(star);
    }
    return container;
  }

  document.querySelectorAll('.reviews-list .review').forEach(review => {
    const top = document.createElement('div');
    top.className = 'review-top';
    top.appendChild(createStars(5));
    review.insertBefore(top, review.firstChild);
  });

  const ratingContainer = document.getElementById('reviewRating');
  const ratingInput = document.getElementById('rating');
  const ratingStars = ratingContainer.querySelectorAll('svg');

  function setRating(val) {
    ratingStars.forEach(star => {
      star.classList.toggle('filled', Number(star.dataset.value) <= val);
    });
    ratingInput.value = val;
  }

  ratingStars.forEach(star => {
    star.addEventListener('click', () => setRating(Number(star.dataset.value)));
  });
  setRating(0);

  const form = document.querySelector('.add-review-form form');
  const reviewsList = document.querySelector('.reviews-list');

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('reviewerName').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    const rating = Number(ratingInput.value);
    if (!name || !text || !rating) return;

    const review = document.createElement('div');
    review.className = 'review';

    const top = document.createElement('div');
    top.className = 'review-top';
    top.appendChild(createStars(rating));
    review.appendChild(top);

    const p = document.createElement('p');
    p.textContent = `“${text}”`;
    review.appendChild(p);

    const span = document.createElement('span');
    span.textContent = `- ${name}`;
    review.appendChild(span);

    reviewsList.prepend(review);
    form.reset();
    setRating(0);
  });
});
