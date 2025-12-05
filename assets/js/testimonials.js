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
