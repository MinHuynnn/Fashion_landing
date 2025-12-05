(() => {
  const ns = window.Elegance;
  const { testimonialTrack, testimonialProgress } = ns.el;

  let testimonialTimer;
  let testimonialProgressStart = null;
  let testimonialRaf;
  const testimonialDuration = 4500;
  let normalizeTestimonials = null;
  let stopMomentumRef = null;

  const testimonialStep = () => {
    if (!testimonialTrack) return 0;
    const first = testimonialTrack.querySelector('.testimonial-item');
    const styles = window.getComputedStyle(testimonialTrack);
    const gap = parseFloat(styles.columnGap || styles.gap || '24') || 24;
    return (first?.clientWidth ?? testimonialTrack.clientWidth * 0.9) + gap;
  };

  const scrollTestimonials = (direction) => {
    if (!testimonialTrack) return;
    stopMomentumRef?.();
    normalizeTestimonials?.();
    const step = testimonialStep();
    if (!step) return;
    const currentIndex = Math.round(testimonialTrack.scrollLeft / step);
    const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    const target = targetIndex * step;
    testimonialTrack.style.scrollSnapType = 'none';
    testimonialTrack.style.scrollBehavior = 'smooth';
    testimonialTrack.scrollTo({ left: target, behavior: 'smooth' });
    window.setTimeout(() => {
      testimonialTrack.style.scrollSnapType = 'x mandatory';
      normalizeTestimonials?.();
    }, 420);
  };

  const resetTestimonialProgress = () => {
    if (testimonialProgress) testimonialProgress.style.width = '0%';
    testimonialProgressStart = null;
    if (testimonialRaf) cancelAnimationFrame(testimonialRaf);
  };

  const animateTestimonialProgress = () => {
    if (!testimonialProgress) return;
    const step = (ts) => {
      if (!testimonialProgressStart) testimonialProgressStart = ts;
      const ratio = Math.min(1, (ts - testimonialProgressStart) / testimonialDuration);
      testimonialProgress.style.width = `${ratio * 100}%`;
      if (testimonialTimer && ratio < 1) testimonialRaf = requestAnimationFrame(step);
    };
    testimonialRaf = requestAnimationFrame(step);
  };

  const startTestimonials = () => {
    if (testimonialTimer) return;
    resetTestimonialProgress();
    animateTestimonialProgress();
    testimonialTimer = window.setInterval(() => {
      testimonialProgressStart = null;
      animateTestimonialProgress();
      scrollTestimonials('right');
    }, testimonialDuration);
  };

  const stopTestimonials = () => {
    if (!testimonialTimer) return;
    window.clearInterval(testimonialTimer);
    testimonialTimer = null;
    resetTestimonialProgress();
  };

  testimonialTrack?.addEventListener('mouseenter', stopTestimonials);
  testimonialTrack?.addEventListener('mouseleave', startTestimonials);

  const testimonialForm = document.getElementById('testimonial-form');
  const testimonialNameInput = document.getElementById('testimonial-name');
  const testimonialMessageInput = document.getElementById('testimonial-message');

  const buildTestimonialCard = (name, message) => {
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
    return article;
  };

  const appendTestimonial = (article) => {
    if (!testimonialTrack) return;
    const clones = Array.from(testimonialTrack.querySelectorAll('.testimonial-item.is-visible'));
    const firstClone = clones[0];
    if (firstClone) testimonialTrack.insertBefore(article, firstClone);
    else testimonialTrack.appendChild(article);
    const clone = article.cloneNode(true);
    clone.classList.add('is-visible');
    if (clones.length) clones[clones.length - 1].after(clone);
    else testimonialTrack.appendChild(clone);
    normalizeTestimonials?.();
  };

  testimonialForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = testimonialNameInput?.value.trim() || 'Khách hàng';
    const message = testimonialMessageInput?.value.trim() || 'Sản phẩm rất tốt!';
    const card = buildTestimonialCard(name, message);
    appendTestimonial(card);
    testimonialForm.reset();
    stopTestimonials();
    startTestimonials();
  });

  if (testimonialTrack) {
    const tOriginals = Array.from(testimonialTrack.children);
    tOriginals.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.removeAttribute('data-reveal');
      clone.classList.add('is-visible');
      testimonialTrack.appendChild(clone);
    });

    const tHalfWidth = () => testimonialTrack.scrollWidth / 2;
    normalizeTestimonials = () => {
      const half = tHalfWidth();
      if (!half) return;
      if (testimonialTrack.scrollLeft >= half) testimonialTrack.scrollLeft -= half;
      else if (testimonialTrack.scrollLeft <= 0) testimonialTrack.scrollLeft += half;
    };

    testimonialTrack.addEventListener('scroll', () => normalizeTestimonials?.());
    window.addEventListener('resize', normalizeTestimonials);
    normalizeTestimonials?.();
    testimonialTrack.scrollLeft = 0;

    let tDragging = false;
    let tStartX = 0;
    let tStartScroll = 0;
    let tLastX = 0;
    let tLastTs = 0;
    let tVelocity = 0;
    let tMomentumId = null;

    const setSmooth = () => { testimonialTrack.style.scrollBehavior = 'smooth'; };
    const setAuto = () => { testimonialTrack.style.scrollBehavior = 'auto'; };
    const snapOff = () => { testimonialTrack.style.scrollSnapType = 'none'; };
    const snapOn = () => { testimonialTrack.style.scrollSnapType = 'x mandatory'; };
    setSmooth();

    const stopMomentum = () => { if (tMomentumId) cancelAnimationFrame(tMomentumId); tMomentumId = null; };
    stopMomentumRef = stopMomentum;
    const startMomentum = () => {
      stopMomentum();
      const friction = 0.92;
      const step = () => {
        tVelocity *= friction;
        if (Math.abs(tVelocity) < 0.02) {
          snapOn();
          setSmooth();
          stopMomentum();
          return;
        }
        testimonialTrack.scrollLeft += tVelocity * 16;
        normalizeTestimonials?.();
        tMomentumId = requestAnimationFrame(step);
      };
      tMomentumId = requestAnimationFrame(step);
    };

    testimonialTrack.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse') e.preventDefault();
      tDragging = true;
      tStartX = e.pageX;
      tStartScroll = testimonialTrack.scrollLeft;
      tLastX = e.pageX;
      tLastTs = performance.now();
      tVelocity = 0;
      stopTestimonials();
      setAuto();
      snapOff();
      stopMomentum();
      testimonialTrack.classList.add('dragging');
      testimonialTrack.setPointerCapture?.(e.pointerId);
    });

    testimonialTrack.addEventListener('pointermove', (e) => {
      if (!tDragging) return;
      const delta = tStartX - e.pageX;
      testimonialTrack.scrollLeft = tStartScroll + delta;
      normalizeTestimonials?.();
      const now = performance.now();
      const dx = tLastX - e.pageX;
      const dt = now - tLastTs || 1;
      tVelocity = dx / dt;
      tLastX = e.pageX;
      tLastTs = now;
    });

    const endDrag = (e) => {
      if (!tDragging) return;
      tDragging = false;
      testimonialTrack.classList.remove('dragging');
      testimonialTrack.releasePointerCapture?.(e.pointerId);
      setAuto();
      snapOn();
      stopTestimonials();
      normalizeTestimonials?.();
      startMomentum();
      startTestimonials();
    };

    testimonialTrack.addEventListener('pointerup', endDrag);
    testimonialTrack.addEventListener('pointercancel', endDrag);
    testimonialTrack.addEventListener('pointerleave', endDrag);
  }

  startTestimonials();
})();
