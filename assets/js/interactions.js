(() => {
  const ns = window.Elegance;
  const { quickviewAdd, newsletterForm, quickTitle } = ns.el;
  const { translations } = ns;
  const state = ns.state;
  const { showToast, closeQuickView } = ns.fn;
  const cursorDot = document.getElementById('cursor-dot');
  const rippleLayer = document.getElementById('ripple-layer');

  quickviewAdd?.addEventListener('click', () => {
    const name = quickTitle?.textContent ?? 'San pham';
    const msg = state.currentLang === 'en' ? `Added ${name} to cart.` : `Da them ${name} vao gio hang.`;
    showToast?.(msg);
    closeQuickView?.();
  });

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = translations.newsletter_alert[state.currentLang] ?? translations.newsletter_alert.vi;
    showToast?.(message);
    newsletterForm.reset();
  });

  // Enable click + drag scroll for horizontal lists (fallback for desktop)
  const dragContainers = Array.from(document.querySelectorAll('[data-drag-scroll]'));
  dragContainers.forEach((el) => {
    let isDown = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e) => {
      isDown = true;
      startX = e.pageX;
      startScroll = el.scrollLeft;
      el.classList.add('dragging');
      el.setPointerCapture?.(e.pointerId);
      e.preventDefault();
    };
    const onPointerMove = (e) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      el.scrollLeft = startScroll - dx;
    };
    const onPointerUp = (e) => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove('dragging');
      el.releasePointerCapture?.(e.pointerId);
    };

    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointerleave', onPointerUp);
  });

  // Hero ripple trail (water-like)
  if (rippleLayer && window.matchMedia('(pointer:fine)').matches) {
    let lastTime = 0;
    const throttle = 50; // ms - tăng tần suất ripple
    const spawnRipple = (x, y) => {
      const drop = document.createElement('span');
      drop.className = 'ripple';
      drop.style.left = `${x}px`;
      drop.style.top = `${y}px`;
      rippleLayer.appendChild(drop);
      drop.addEventListener('animationend', () => drop.remove());
    };
    rippleLayer.addEventListener('pointermove', (e) => {
      const now = performance.now();
      if (now - lastTime < throttle) return;
      lastTime = now;
      const rect = rippleLayer.getBoundingClientRect();
      spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
    });
  }

  // Custom cursor dot
  if (cursorDot && window.matchMedia('(pointer:fine)').matches) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const animate = () => {
      currentX += (targetX - currentX) * 0.25; // tăng từ 0.2 lên 0.25 để mượt hơn
      currentY += (targetY - currentY) * 0.25;
      cursorDot.style.transform = `translate(${currentX}px, ${currentY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    const showCursor = () => cursorDot.classList.add('is-active');
    const hideCursor = () => cursorDot.classList.remove('is-active', 'is-pressing');

    window.addEventListener('pointermove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!rafId) animate();
      showCursor();
    });
    window.addEventListener('pointerdown', () => cursorDot.classList.add('is-pressing'));
    window.addEventListener('pointerup', () => cursorDot.classList.remove('is-pressing'));
    window.addEventListener('pointerleave', hideCursor);
  }
})();
