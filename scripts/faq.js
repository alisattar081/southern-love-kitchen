document.addEventListener('DOMContentLoaded', () => {
  const questions = document.querySelectorAll('.faq-question');
  questions.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const answer = document.getElementById(btn.getAttribute('aria-controls'));
      if (answer) {
        answer.hidden = expanded;
      }
    });
  });
});
