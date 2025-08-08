document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.add-review-form form');
  const textarea = document.getElementById('reviewText');
  const charCount = document.getElementById('charCount');
  const thankYou = document.getElementById('thankYouMessage');
  const MAX = 250;

  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    charCount.textContent = `${len}/${MAX}`;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!textarea.value.trim()) {
      alert('Please enter your review.');
      return;
    }
    thankYou.hidden = false;
    form.reset();
    charCount.textContent = `0/${MAX}`;
  });

  document.querySelectorAll('.share-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const reviewText = btn.closest('.review').querySelector('p').textContent;
      const shareData = {
        title: 'Southern Love Kitchen Review',
        text: reviewText,
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(err => console.error('Share failed', err));
      } else {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(reviewText)}%20${encodeURIComponent(window.location.href)}`;
        window.open(url, '_blank');
      }
    });
  });
});
