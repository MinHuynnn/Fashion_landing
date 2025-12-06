(() => {
  const ns = window.Elegance;
  const { testimonialTrack, testimonialProgress } = ns.el;

  if (!testimonialTrack) return;

  let testimonialTimer = null;
  let testimonialProgressStart = null;
  let testimonialRaf = null;
  const testimonialDuration = 4500;
  let isAutoScrolling = false;

  const getCardWidth = () => {
    const first = testimonialTrack.querySelector('.testimonial-item:not(.is-visible)');
    if (!first) return testimonialTrack.clientWidth * 0.8;
    const styles = window.getComputedStyle(testimonialTrack);
    const gap = parseFloat(styles.gap || '24') || 24;
    return first.clientWidth + gap;
  };

  const resetProgress = () => {
    if (testimonialProgress) testimonialProgress.style.width = '0%';
    testimonialProgressStart = null;
    if (testimonialRaf) cancelAnimationFrame(testimonialRaf);
  };

  const animateProgress = () => {
    if (!testimonialProgress) return;
    const step = (ts) => {
      if (!testimonialProgressStart) testimonialProgressStart = ts;
      const ratio = Math.min(1, (ts - testimonialProgressStart) / testimonialDuration);
      testimonialProgress.style.width = `${ratio * 100}%`;
      if (testimonialTimer && ratio < 1) {
        testimonialRaf = requestAnimationFrame(step);
      }
    };
    testimonialRaf = requestAnimationFrame(step);
  };

  const autoScroll = () => {
    if (isAutoScrolling) return;
    isAutoScrolling = true;
    
    const cardWidth = getCardWidth();
    testimonialTrack.style.scrollBehavior = 'smooth';
    testimonialTrack.scrollLeft += cardWidth;
    
    setTimeout(() => {
      isAutoScrolling = false;
    }, 500);
  };

  const startAutoPlay = () => {
    if (testimonialTimer) return;
    
    resetProgress();
    animateProgress();
    
    testimonialTimer = setInterval(() => {
      testimonialProgressStart = null;
      animateProgress();
      autoScroll();
    }, testimonialDuration);
  };

  const stopAutoPlay = () => {
    if (!testimonialTimer) return;
    clearInterval(testimonialTimer);
    testimonialTimer = null;
    resetProgress();
  };

  // Clone items for infinite scroll effect
  const originalItems = Array.from(testimonialTrack.children);
  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    clone.removeAttribute('data-reveal');
    clone.classList.add('is-visible');
    testimonialTrack.appendChild(clone);
  });

  // Event listeners
  testimonialTrack.addEventListener('mouseenter', stopAutoPlay);
  testimonialTrack.addEventListener('mouseleave', startAutoPlay);

  // Handle testimonial form submission
  const testimonialForm = document.getElementById('testimonial-form');
  if (testimonialForm) {
    const testimonialNameInput = document.getElementById('testimonial-name');
    const testimonialMessageInput = document.getElementById('testimonial-message');

    testimonialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = testimonialNameInput?.value.trim() || 'Khách hàng';
      const message = testimonialMessageInput?.value.trim() || 'Sản phẩm rất tốt!';
      
      const article = document.createElement('article');
      article.className = 'testimonial-item flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(50%-16px)] max-w-[620px] snap-start';
      article.innerHTML = `
        <div class="testimonial-card relative h-full bg-white dark:bg-[#3c2a2f] p-8 rounded-2xl shadow-sm hover:shadow-md flex flex-col items-center text-center">
          <div class="w-20 h-20 rounded-full bg-center bg-cover mb-4 ring-2 ring-review-primary/20"
               style="background-image: url('https://images.unsplash.com/photo-1521572153540-262f4e95a07c?auto=format&fit=crop&w=160&q=80');"></div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">${name}</h3>
          <div class="testimonial-stars flex gap-1 text-review-primary my-2">
            <span class="material-symbols-outlined fill text-base">star</span>
            <span class="material-symbols-outlined fill text-base">star</span>
            <span class="material-symbols-outlined fill text-base">star</span>
            <span class="material-symbols-outlined fill text-base">star</span>
            <span class="material-symbols-outlined fill text-base">star</span>
          </div>
          <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-2">"${message}"</p>
        </div>`;
      
      testimonialTrack.appendChild(article);
      
      const clone = article.cloneNode(true);
      clone.classList.add('is-visible');
      testimonialTrack.appendChild(clone);
      
      testimonialForm.reset();
      stopAutoPlay();
      startAutoPlay();
    });
  }

  // Start autoplay
  startAutoPlay();
})();
