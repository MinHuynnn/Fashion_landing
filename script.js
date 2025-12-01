(() => {
  const html = document.documentElement;
  const themeButtons = Array.from(document.querySelectorAll('[data-toggle-theme]'));
  const langButtons = Array.from(document.querySelectorAll('[data-toggle-lang]'));
  const langLabels = Array.from(document.querySelectorAll('[data-lang-label]'));
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');
  const scrollLinks = Array.from(document.querySelectorAll('[data-scroll]'));
  const testimonialTrack = document.getElementById('testimonial-track');
  const testimonialPrev = document.getElementById('testimonial-prev');
  const testimonialNext = document.getElementById('testimonial-next');
  const testimonialProgress = document.getElementById('testimonial-progress');
  const newsletterForm = document.getElementById('newsletter-form');
  const productsTrack = document.getElementById('products-track');
  const productsPrev = document.getElementById('products-prev');
  const productsNext = document.getElementById('products-next');
  const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
  const progressBar = document.getElementById('scroll-progress');
  const toast = document.getElementById('toast');
  const quickView = document.getElementById('quick-view');
  const quickImage = document.getElementById('quick-image');
  const quickTitle = document.getElementById('quick-title');
  const quickPrice = document.getElementById('quick-price');
  const quickDesc = document.getElementById('quick-desc');
  const quickviewAdd = document.querySelector('[data-quickview-add]');
  const quickviewCloseEls = Array.from(document.querySelectorAll('[data-quickview-close]'));

  const translations = {
    title: { vi: 'Elegance - Vẻ đẹp vượt thời gian', en: 'Elegance - Timeless elegance' },
    nav_home: { vi: 'Trang chủ', en: 'Home' },
    nav_products: { vi: 'Sản phẩm', en: 'Products' },
    nav_collections: { vi: 'Bộ sưu tập', en: 'Collections' },
    nav_about: { vi: 'Về chúng tôi', en: 'About us' },
    nav_contact: { vi: 'Liên hệ', en: 'Contact' },
    theme_toggle: { vi: 'Đổi giao diện', en: 'Toggle theme' },
    lang_toggle_text: { vi: 'Chuyển ngôn ngữ', en: 'Switch language' },

    hero_badge: { vi: 'Bộ sưu tập mới 2024', en: 'New collection 2024' },
    hero_heading: { vi: 'Vẻ đẹp vượt thời gian', en: 'Timeless elegance' },
    hero_body: {
      vi: 'Khám phá sự thanh lịch và tinh tế trong từng thiết kế mới nhất của chúng tôi.',
      en: 'Discover elegance and refinement in every new design from our latest collection.'
    },
    hero_cta: { vi: 'Khám Phá Ngay', en: 'Explore now' },

    products_heading: { vi: 'Sản phẩm nổi bật', en: 'Featured products' },
    products_body: {
      vi: 'Khám phá những thiết kế được yêu thích nhất trong bộ sưu tập mới, nơi sự thanh lịch và phong cách hiện đại giao thoa.',
      en: 'Explore the most-loved designs from our new collection, where elegance meets modern style.'
    },
    product1_name: { vi: 'Váy lụa Organza', en: 'Organza silk dress' },
    product2_name: { vi: 'Áo khoác dáng dài', en: 'Longline coat' },
    product3_name: { vi: 'Quần tây ống rộng', en: 'Wide-leg trousers' },
    product4_name: { vi: 'Sơ mi lụa tay bồng', en: 'Balloon-sleeve silk shirt' },
    product5_name: { vi: 'Đầm satin lệch vai', en: 'One-shoulder satin gown' },
    product6_name: { vi: 'Đầm midi họa tiết', en: 'Patterned midi dress' },
    product7_name: { vi: 'Áo len cổ lửng', en: 'Turtleneck knit top' },
    product8_name: { vi: 'Túi da tối giản', en: 'Minimal leather bag' },
    products_cta: { vi: 'Xem toàn bộ bộ sưu tập', en: 'View full collection' },

    promo_heading: { vi: 'Định hình phong cách của bạn', en: 'Define your style' },
    promo_body: {
      vi: 'Khám phá bộ sưu tập Thu/Đông mới nhất và tìm thấy những mảnh ghép hoàn hảo nói lên cá tính của bạn.',
      en: 'Explore the latest Fall/Winter collection and find the perfect pieces that express your personality.'
    },
    promo_cta: { vi: 'Mua Ngay', en: 'Shop now' },

    testimonials_heading: { vi: 'Khách hàng nói gì về chúng tôi?', en: 'What do our customers say?' },
    testimonials_cta: { vi: 'Xem tất cả đánh giá', en: 'View all reviews' },

    newsletter_heading: { vi: 'Đăng ký nhận bản tin', en: 'Subscribe to our newsletter' },
    newsletter_body: {
      vi: 'Nhận thông tin cập nhật về sản phẩm mới và các chương trình khuyến mại đặc biệt.',
      en: 'Get updates on new arrivals and exclusive promotions.'
    },
    newsletter_button: { vi: 'Đăng ký', en: 'Subscribe' },
    newsletter_placeholder: { vi: 'Nhập địa chỉ email của bạn', en: 'Enter your email address' },
    newsletter_alert: { vi: 'Cảm ơn bạn đã đăng ký nhận bản tin!', en: 'Thanks for subscribing to our newsletter!' },

    brand_tagline: {
      vi: 'Phong cách tối giản, sang trọng và hiện đại định hình nên vẻ đẹp vượt thời gian.',
      en: 'Minimalist, refined, and modern style that defines timeless beauty.'
    },
    about_heading: { vi: 'Về chúng tôi', en: 'About us' },
    about_story: { vi: 'Câu chuyện thương hiệu', en: 'Our story' },
    about_store: { vi: 'Cửa hàng', en: 'Stores' },
    about_career: { vi: 'Cơ hội nghề nghiệp', en: 'Careers' },

    support_heading: { vi: 'Hỗ trợ', en: 'Support' },
    support_products: { vi: 'Sản phẩm', en: 'Products' },
    support_tracking: { vi: 'Theo dõi đơn hàng', en: 'Track order' },
    support_faq: { vi: 'Câu hỏi thường gặp', en: 'FAQ' },
    support_contact: { vi: 'Liên hệ', en: 'Contact' },

    policy_heading: { vi: 'Chính sách', en: 'Policies' },
    policy_return: { vi: 'Chính sách đổi trả', en: 'Return policy' },
    policy_privacy: { vi: 'Chính sách bảo mật', en: 'Privacy policy' },
    policy_terms: { vi: 'Điều khoản dịch vụ', en: 'Terms of service' },

    rights: { vi: '© 2024 Elegance Fashion. All rights reserved.', en: '© 2024 Elegance Fashion. All rights reserved.' },
    footer_language: { vi: 'Tiếng Việt', en: 'English' }
  };

  const storage = {
    get: (key) => {
      try { return localStorage.getItem(key); } catch (_) { return null; }
    },
    set: (key, value) => {
      try { localStorage.setItem(key, value); } catch (_) {}
    }
  };

  const setTheme = (theme) => {
    html.classList.toggle('dark', theme === 'dark');
    storage.set('theme', theme);
  };
  const toggleTheme = () => setTheme(html.classList.contains('dark') ? 'light' : 'dark');
  const storedTheme = storage.get('theme');
  if (storedTheme) setTheme(storedTheme);
  themeButtons.forEach((btn) => btn.addEventListener('click', toggleTheme));

  const closeMobileMenu = () => mobileMenu?.classList.add('hidden');
  mobileToggle?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  scrollLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.scroll;
      if (target) scrollToId(target);
      closeMobileMenu();
    });
  });

  if (revealItems.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -5%' });
    revealItems.forEach((el) => io.observe(el));
  }

  const updateProgress = () => {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  };
  updateProgress();
  window.addEventListener('scroll', () => requestAnimationFrame(updateProgress));

  const applyTranslations = (lang) => {
    document.title = translations.title?.[lang] ?? document.title;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const entry = translations[key];
      if (entry) el.textContent = entry[lang] ?? entry.vi;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      const entry = translations[key];
      if (entry?.[lang]) el.setAttribute('placeholder', entry[lang]);
    });
  };

  const updateLangLabels = (lang) => {
    langLabels.forEach((el) => { el.textContent = lang === 'en' ? 'ENG' : 'VIE'; });
  };

  let currentLang = 'vi';
  const setLang = (lang) => {
    currentLang = lang;
    storage.set('lang', lang);
    html.lang = lang;
    updateLangLabels(lang);
    applyTranslations(lang);
  };
  const storedLang = storage.get('lang');
  setLang(storedLang === 'en' ? 'en' : 'vi');
  langButtons.forEach((btn) => btn.addEventListener('click', () => setLang(currentLang === 'vi' ? 'en' : 'vi')));

  const showToast = (message) => {
    if (!toast) { alert(message); return; }
    toast.textContent = message;
    toast.classList.remove('hidden');
    toast.classList.add('show');
    clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => {
      toast.classList.remove('show');
      showToast.timer = window.setTimeout(() => toast.classList.add('hidden'), 220);
    }, 2600);
  };

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
    const name = card.querySelector('h3')?.textContent?.trim() ?? 'Sản phẩm';
    const price = card.querySelector('p')?.textContent?.trim() ?? '';
    const image = extractBg(card.querySelector('.bg-cover'));
    const desc = 'Thiết kế độc quyền, chất liệu cao cấp, giao trong 2-3 ngày.';
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

  if (productsTrack) {
    const originals = Array.from(productsTrack.children);
    originals.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.removeAttribute('data-reveal');
      clone.classList.add('is-visible');
      productsTrack.appendChild(clone);
    });

    const attachTilt = () => {
      const cards = Array.from(productsTrack.querySelectorAll('.product-card'));
      cards.forEach((card) => {
        const reset = () => {
          card.style.setProperty('--tilt-x', '0deg');
          card.style.setProperty('--tilt-y', '0deg');
        };
        card.addEventListener('pointermove', (e) => {
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
    let rafId = null;
    let lastTimestamp = null;
    const pixelsPerMs = 0.6;
    let heartbeatId = null;
    let fallbackId = null;

    const setBehaviorAuto = () => { productsTrack.style.scrollBehavior = 'auto'; };
    const setBehaviorSmooth = () => { productsTrack.style.scrollBehavior = 'smooth'; };
    const stopAuto = () => { if (rafId) cancelAnimationFrame(rafId); rafId = null; lastTimestamp = null; };
    const autoStep = (ts) => {
      if (!lastTimestamp) lastTimestamp = ts;
      const delta = ts - lastTimestamp;
      lastTimestamp = ts;
      productsTrack.scrollLeft += delta * pixelsPerMs;
      normalize();
      rafId = requestAnimationFrame(autoStep);
    };
    const startAuto = () => { if (!rafId && !isHovering && !isDragging) rafId = requestAnimationFrame(autoStep); };
    const fallbackStep = Math.max(6, pixelsPerMs * 16);
    const fallbackTick = () => {
      if (rafId || isHovering || isDragging) return;
      productsTrack.scrollLeft += fallbackStep;
      normalize();
    };
    const startFallback = () => { if (!fallbackId) fallbackId = setInterval(fallbackTick, 32); };

    const handlePointerDown = (e) => {
      isDragging = true;
      startX = e.pageX;
      startScrollLeft = productsTrack.scrollLeft;
      stopAuto();
      setBehaviorAuto();
      productsTrack.classList.add('dragging');
      productsTrack.setPointerCapture?.(e.pointerId);
    };
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const delta = startX - e.pageX;
      productsTrack.scrollLeft = startScrollLeft + delta;
      normalize();
    };
    const handlePointerUp = (e) => {
      if (!isDragging) return;
      isDragging = false;
      productsTrack.classList.remove('dragging');
      productsTrack.releasePointerCapture?.(e.pointerId);
      setBehaviorAuto();
      if (!isHovering) startAuto();
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
    productsPrev?.addEventListener('click', () => manualScroll('left'));
    productsNext?.addEventListener('click', () => manualScroll('right'));

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

  let testimonialTimer;
  let testimonialProgressStart = null;
  let testimonialRaf;
  const testimonialDuration = 4500;

  const scrollTestimonials = (direction) => {
    if (!testimonialTrack) return;
    const amount = testimonialTrack.clientWidth * 0.8;
    testimonialTrack.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
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
  testimonialPrev?.addEventListener('click', () => { stopTestimonials(); scrollTestimonials('left'); startTestimonials(); });
  testimonialNext?.addEventListener('click', () => { stopTestimonials(); scrollTestimonials('right'); startTestimonials(); });
  startTestimonials();

  quickviewAdd?.addEventListener('click', () => {
    const name = quickTitle?.textContent ?? 'Sản phẩm';
    showToast(`Đã thêm ${name} vào giỏ hàng.`);
    closeQuickView();
  });

  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = translations.newsletter_alert[currentLang] ?? translations.newsletter_alert.vi;
    showToast(message);
    newsletterForm.reset();
  });
})();
