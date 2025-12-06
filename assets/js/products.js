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
    const masterCards = Array.from(productsTrack.children).map((item, idx) => {
      const copy = item.cloneNode(true);
      copy.dataset.uid = copy.dataset.uid || `prod-${idx}`;
      return copy;
    });
    productsTrack.innerHTML = '';

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
    const startAuto = () => {
      if (isSmallScreen()) { stopAuto(); return; }
      if (!rafId && !isHovering && !isDragging && !momentumId) rafId = requestAnimationFrame(autoStep);
    };
    const fallbackStep = Math.max(6, pixelsPerMs * 16);
    const fallbackTick = () => {
      if (rafId || isHovering || isDragging || momentumId) return;
      productsTrack.scrollLeft += fallbackStep;
      normalize();
    };
    const startFallback = () => {
      if (isSmallScreen()) { if (fallbackId) clearInterval(fallbackId); fallbackId = null; return; }
      if (!fallbackId) fallbackId = setInterval(fallbackTick, 32);
    };

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

    productsTrack.addEventListener('pointerdown', (e) => { handlePointerDown(e); });
    productsTrack.addEventListener('pointermove', handlePointerMove);
    productsTrack.addEventListener('pointerup', handlePointerUp);
    productsTrack.addEventListener('pointercancel', handlePointerUp);
    productsTrack.addEventListener('pointerleave', handlePointerUp);
    productsTrack.addEventListener('mouseenter', () => { isHovering = true; stopAuto(); setBehaviorSmooth(); });
    productsTrack.addEventListener('mouseleave', () => { isHovering = false; setBehaviorAuto(); startAuto(); });

    // Search & filter
    const searchInput = document.getElementById('product-search-input');
    const searchForm = document.getElementById('product-search-form');
    const filterSelect = document.getElementById('product-filter');
    const getVisibleCards = () => Array.from(productsTrack.querySelectorAll('.product-card')).filter((c) => !c.classList.contains('is-visible'));
    const stepSize = () => {
      const first = getVisibleCards()[0];
      if (!first) return productsTrack.clientWidth;
      const styles = window.getComputedStyle(productsTrack);
      const gap = parseFloat(styles.columnGap || styles.gap || '24') || 24;
      return first.clientWidth + gap;
    };
    const highlightCard = (card) => {
      card.classList.add('search-hit');
      setTimeout(() => card.classList.remove('search-hit'), 1400);
    };
    const attachTitleClicks = () => {
      getVisibleCards().forEach((card) => {
        const title = card.querySelector('h3');
        title?.addEventListener('click', (e) => {
          e.stopPropagation();
          scrollToCard(card, 'start');
        });
      });
    };
    const renderTrack = (items) => {
      productsTrack.innerHTML = '';
      items.forEach((card) => {
        const node = card.cloneNode(true);
        node.classList.remove('is-visible');
        node.removeAttribute('data-reveal');
        productsTrack.appendChild(node);
      });
      const base = getVisibleCards();
      base.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.classList.add('is-visible');
        clone.removeAttribute('data-reveal');
        productsTrack.appendChild(clone);
      });
      attachTilt();
      attachTitleClicks();
      productsTrack.scrollLeft = 0;
      normalize();
    };

    const resolveNearestLoop = (target) => {
      const half = halfWidth();
      if (!half) return target;
      const current = productsTrack.scrollLeft;
      const diff = target - current;
      const wraps = Math.round(diff / half);
      return target - wraps * half;
    };
    const scrollToCard = (card, align = 'center') => {
      const list = getVisibleCards();
      const index = list.indexOf(card);
      const step = stepSize();
      let target = index >= 0 ? index * step : card.offsetLeft;
      if (align === 'center') target = target - productsTrack.clientWidth / 2 + card.clientWidth / 2;
      target = resolveNearestLoop(target);
      stopAuto();
      stopMomentum();
      productsTrack.style.scrollSnapType = 'none';
      setBehaviorAuto();
      productsTrack.scrollLeft = Math.max(0, target);
      setBehaviorSmooth();
      productsTrack.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
      setTimeout(() => { productsTrack.style.scrollSnapType = 'x mandatory'; }, 400);
      highlightCard(card);
      setTimeout(() => { if (!isHovering && !isDragging) startAuto(); }, 700);
    };
    const normalizeText = (s = '') => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const handleSearch = (e) => {
      e.preventDefault();
      const q = normalizeText(searchInput?.value.trim());
      if (!q) return;
      const cards = getVisibleCards();
      const match = cards.find((card) => normalizeText(card.querySelector('h3')?.textContent || '').includes(q));
      if (match) scrollToCard(match, 'start');
    };
    searchForm?.addEventListener('submit', handleSearch);
    searchInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') e.preventDefault(); });
    const applyFilter = (value) => {
      const val = (value || 'all').toLowerCase();
      const filtered = masterCards.filter((card) => {
        const cat = (card.dataset.category || 'all').toLowerCase();
        return val === 'all' || cat === val;
      });
      renderTrack(filtered.length ? filtered : masterCards);
      stopAuto();
      startAuto();
    };
    filterSelect?.addEventListener('change', (e) => applyFilter(e.target.value));
    applyFilter(filterSelect?.value || 'all');
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

    window.addEventListener('resize', () => {
      normalize();
      if (isSmallScreen()) { stopAuto(); if (fallbackId) { clearInterval(fallbackId); fallbackId = null; } }
      else { startAuto(); startFallback(); }
    });
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
