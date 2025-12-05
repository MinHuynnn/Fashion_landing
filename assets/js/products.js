(() => {
  const ns = window.Elegance;
  ns.fn = ns.fn || {};
  const { productsTrack, quickView, quickImage, quickTitle, quickPrice, quickDesc, quickviewCloseEls } = ns.el;
  const { translations } = ns;
  const state = ns.state;

  const extractBg = (el) => {
    if (!el) return '';
    const bg = el.style.backgroundImage || '';
    const m = bg.match(/url\(["']?(.*?)["']?\)/i);
    return m?.[1] ?? '';
  };

  const closeQuickView = () => {
    quickView?.classList.add('hidden');
    quickView?.classList.remove('show');
    document.body.style.removeProperty('overflow');
  };

  const openQuickView = (card) => {
    if (!quickView) return;
    const name = card.querySelector('h3')?.textContent?.trim() ?? 'San pham';
    const price = card.querySelector('p')?.textContent?.trim() ?? '';
    const image = extractBg(card.querySelector('.bg-cover'));
    const desc = translations.quick_desc?.[state.currentLang] ?? translations.quick_desc?.vi ?? '';
    if (quickTitle) quickTitle.textContent = name;
    if (quickPrice) quickPrice.textContent = price;
    if (quickDesc) quickDesc.textContent = desc;
    if (quickImage) { quickImage.src = image; quickImage.alt = name; }
    quickView.classList.remove('hidden');
    quickView.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  quickviewCloseEls.forEach((el) => el.addEventListener('click', closeQuickView));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeQuickView(); });
  quickView?.addEventListener('click', (e) => { if (e.target === quickView) closeQuickView(); });

  if (productsTrack) {
    const originals = Array.from(productsTrack.children);
    originals.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.removeAttribute('data-reveal');
      clone.classList.add('is-visible');
      productsTrack.appendChild(clone);
    });

    const isSmallScreen = () => window.matchMedia('(max-width: 768px)').matches;
    const attachTilt = () => {
      const cards = Array.from(productsTrack.querySelectorAll('.product-card'));
      cards.forEach((card) => {
        const reset = () => {
          card.style.setProperty('--tilt-x', '0deg');
          card.style.setProperty('--tilt-y', '0deg');
        };
        card.addEventListener('pointermove', (e) => {
          if (e.pointerType === 'touch' || isSmallScreen()) { reset(); return; }
          const rect = card.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          card.style.setProperty('--tilt-x', `${-py * 8}deg`);
          card.style.setProperty('--tilt-y', `${px * 8}deg`);
        });
        card.addEventListener('pointerleave', reset);
        card.addEventListener('pointerup', reset);
        card.addEventListener('click', () => openQuickView(card));
      });
    };
    attachTilt();

    const halfWidth = () => productsTrack.scrollWidth / 2;
    const normalize = () => {
      const half = halfWidth();
      if (!half) return;
      if (productsTrack.scrollLeft >= half) productsTrack.scrollLeft -= half;
      else if (productsTrack.scrollLeft <= 0) productsTrack.scrollLeft += half;
    };

    let isHovering = false;
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;
    let lastX = 0;
    let lastTs = 0;
    let velocity = 0;
    let rafId = null;
    let momentumId = null;
    let lastTimestamp = null;
    const pixelsPerMs = 0.6;
    let heartbeatId = null;
    let fallbackId = null;

    const setBehaviorAuto = () => { productsTrack.style.scrollBehavior = 'auto'; };
    const setBehaviorSmooth = () => { productsTrack.style.scrollBehavior = 'smooth'; };
    const stopMomentum = () => { if (momentumId) cancelAnimationFrame(momentumId); momentumId = null; };
    const stopAuto = () => { if (rafId) cancelAnimationFrame(rafId); rafId = null; lastTimestamp = null; };
    const autoStep = (ts) => {
      if (!lastTimestamp) lastTimestamp = ts;
      const delta = ts - lastTimestamp;
      lastTimestamp = ts;
      productsTrack.scrollLeft += delta * pixelsPerMs;
      normalize();
      rafId = requestAnimationFrame(autoStep);
    };
    const startAuto = () => { if (!rafId && !isHovering && !isDragging && !momentumId) rafId = requestAnimationFrame(autoStep); };
    const fallbackStep = Math.max(6, pixelsPerMs * 16);
    const fallbackTick = () => {
      if (rafId || isHovering || isDragging || momentumId) return;
      productsTrack.scrollLeft += fallbackStep;
      normalize();
    };
    const startFallback = () => { if (!fallbackId) fallbackId = setInterval(fallbackTick, 32); };

    const handlePointerDown = (e) => {
      isDragging = true;
      startX = e.pageX;
      lastX = e.pageX;
      lastTs = performance.now();
      velocity = 0;
      startScrollLeft = productsTrack.scrollLeft;
      stopAuto();
      stopMomentum();
      setBehaviorAuto();
      productsTrack.style.scrollSnapType = 'none';
      productsTrack.classList.add('dragging');
      productsTrack.setPointerCapture?.(e.pointerId);
    };
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const delta = startX - e.pageX;
      productsTrack.scrollLeft = startScrollLeft + delta;
      normalize();
      const now = performance.now();
      const dx = lastX - e.pageX;
      const dt = now - lastTs || 1;
      velocity = dx / dt;
      lastX = e.pageX;
      lastTs = now;
    };
    const startMomentum = () => {
      stopMomentum();
      const friction = 0.92;
      const step = () => {
        velocity *= friction;
        if (Math.abs(velocity) < 0.02) {
          stopMomentum();
          productsTrack.style.scrollSnapType = 'x mandatory';
          if (!isHovering && !isDragging) startAuto();
          return;
        }
        productsTrack.scrollLeft += velocity * 16;
        normalize();
        momentumId = requestAnimationFrame(step);
      };
      momentumId = requestAnimationFrame(step);
    };

    const handlePointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      productsTrack.classList.remove('dragging');
      productsTrack.releasePointerCapture?.(e.pointerId);
      setBehaviorAuto();
      startMomentum();
    };

    productsTrack.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') e.preventDefault(); handlePointerDown(e); });
    productsTrack.addEventListener('pointermove', handlePointerMove);
    productsTrack.addEventListener('pointerup', handlePointerUp);
    productsTrack.addEventListener('pointercancel', handlePointerUp);
    productsTrack.addEventListener('pointerleave', handlePointerUp);
    productsTrack.addEventListener('mouseenter', () => { isHovering = true; stopAuto(); setBehaviorSmooth(); });
    productsTrack.addEventListener('mouseleave', () => { isHovering = false; setBehaviorAuto(); startAuto(); });

    const manualScroll = (direction) => {
      stopAuto();
      setBehaviorSmooth();
      const amount = productsTrack.clientWidth * 0.65;
      productsTrack.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
      setTimeout(() => {
        normalize();
        if (!isHovering && !isDragging) startAuto();
      }, 450);
    };

    window.addEventListener('resize', normalize);
    setBehaviorAuto();
    productsTrack.scrollLeft = Math.max(1, halfWidth() * 0.25);
    startAuto();
    startFallback();

    const restartAutoIfStopped = () => { if (!rafId && !isHovering && !isDragging) startAuto(); };
    heartbeatId = setInterval(restartAutoIfStopped, 2000);
    window.addEventListener('beforeunload', () => {
      if (heartbeatId) clearInterval(heartbeatId);
      if (fallbackId) clearInterval(fallbackId);
    });
  }

  ns.fn.closeQuickView = closeQuickView;
  ns.fn.openQuickView = openQuickView;
})();
