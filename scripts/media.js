// Handles lazy loading and lightbox functionality for images and videos

document.addEventListener('DOMContentLoaded', () => {
  // Lazy load videos using IntersectionObserver
  const lazyVideos = document.querySelectorAll('video[preload="none"]');
  if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.load();
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px' });
    lazyVideos.forEach(video => videoObserver.observe(video));
  }

  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = '<span class="lightbox-close">&times;</span>';
  const lightboxImg = document.createElement('img');
  const lightboxVideo = document.createElement('video');
  lightboxVideo.controls = true;
  lightbox.appendChild(lightboxImg);
  lightbox.appendChild(lightboxVideo);
  document.body.appendChild(lightbox);

  function openLightbox(src, type, alt = '') {
    if (type === 'image') {
      lightboxImg.src = src;
      lightboxImg.alt = alt;
      lightboxImg.style.display = 'block';
      lightboxVideo.pause();
      lightboxVideo.src = '';
      lightboxVideo.style.display = 'none';
    } else {
      lightboxVideo.src = src;
      lightboxVideo.style.display = 'block';
      lightboxImg.style.display = 'none';
      lightboxVideo.play();
    }
    lightbox.classList.add('show');
  }

  // Bind click events for images
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, 'image', img.alt));
  });

  // Bind click events for videos
  document.querySelectorAll('video').forEach(video => {
    video.addEventListener('click', () => {
      const source = video.querySelector('source');
      const src = source ? source.src : video.src;
      openLightbox(src, 'video');
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('show');
    lightboxImg.src = '';
    lightboxVideo.pause();
    lightboxVideo.src = '';
  }

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
      closeLightbox();
    }
  });
});
