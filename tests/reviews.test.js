/**
 * @jest-environment jsdom
 */

describe('reviews', () => {
  let stars, ratingInput, form, reviewsList;

  beforeEach(() => {
    document.body.innerHTML = `
      <div class="reviews-list"></div>
      <div id="reviewRating">
        <svg data-value="1"></svg>
        <svg data-value="2"></svg>
        <svg data-value="3"></svg>
        <svg data-value="4"></svg>
        <svg data-value="5"></svg>
      </div>
      <input id="rating" value="0" />
      <div class="add-review-form">
        <form>
          <input id="reviewerName" />
          <textarea id="reviewText"></textarea>
        </form>
      </div>
    `;
    jest.resetModules();
    require('../scripts/reviews.js');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    stars = document.querySelectorAll('#reviewRating svg');
    ratingInput = document.getElementById('rating');
    form = document.querySelector('.add-review-form form');
    reviewsList = document.querySelector('.reviews-list');
  });

  test('sets rating on star click', () => {
    stars[2].dispatchEvent(new Event('click'));
    expect(ratingInput.value).toBe('3');
    expect(stars[0].classList.contains('filled')).toBe(true);
    expect(stars[2].classList.contains('filled')).toBe(true);
    expect(stars[3].classList.contains('filled')).toBe(false);
  });

  test('does not add review when fields missing', () => {
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(reviewsList.children.length).toBe(0);
  });

  test('adds review with valid input and resets rating', () => {
    document.getElementById('reviewerName').value = 'Alice';
    document.getElementById('reviewText').value = 'Great!';
    stars[3].dispatchEvent(new Event('click'));
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(reviewsList.children.length).toBe(1);
    expect(ratingInput.value).toBe('0');
  });
});
