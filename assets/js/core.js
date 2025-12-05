(() => {
  const ns = (window.Elegance = window.Elegance || {});
  ns.el = {
    html: document.documentElement,
    themeButtons: Array.from(document.querySelectorAll('[data-toggle-theme]')),
    langButtons: Array.from(document.querySelectorAll('[data-toggle-lang]')),
    langLabels: Array.from(document.querySelectorAll('[data-lang-label]')),
    mobileToggle: document.querySelector('[data-mobile-toggle]'),
    mobileMenu: document.getElementById('mobile-menu'),
    scrollLinks: Array.from(document.querySelectorAll('[data-scroll]')),
    testimonialTrack: document.getElementById('testimonial-track'),
    testimonialProgress: document.getElementById('testimonial-progress'),
    newsletterForm: document.getElementById('newsletter-form'),
    productsTrack: document.getElementById('products-track'),
    revealItems: Array.from(document.querySelectorAll('[data-reveal]')),
    progressBar: document.getElementById('scroll-progress'),
    toast: document.getElementById('toast'),
    quickView: document.getElementById('quick-view'),
    quickImage: document.getElementById('quick-image'),
    quickTitle: document.getElementById('quick-title'),
    quickPrice: document.getElementById('quick-price'),
    quickDesc: document.getElementById('quick-desc'),
    quickviewAdd: document.querySelector('[data-quickview-add]'),
    quickviewCloseEls: Array.from(document.querySelectorAll('[data-quickview-close]'))
  };

  ns.translations = {
    title: { vi: 'Elegance - V? d?p vu?t th?i gian', en: 'Elegance - Timeless elegance' },
    nav_home: { vi: 'Trang ch?', en: 'Home' },
    nav_products: { vi: 'S?n ph?m', en: 'Products' },
    nav_collections: { vi: 'B? suu t?p', en: 'Collections' },
    nav_about: { vi: 'V? ch£ng t“i', en: 'About us' },
    nav_contact: { vi: 'Liˆn h?', en: 'Contact' },
    theme_toggle: { vi: 'D?i giao di?n', en: 'Toggle theme' },
    lang_toggle_text: { vi: 'Chuy?n ng“n ng?', en: 'Switch language' },

    hero_badge: { vi: 'B? suu t?p m?i 2024', en: 'New collection 2024' },
    hero_heading: { vi: 'V? d?p vu?t th?i gian', en: 'Timeless elegance' },
    hero_body: {
      vi: 'Kh m ph  s? thanh l?ch v… tinh t? trong t?ng thi?t k? m?i nh?t c?a ch£ng t“i.',
      en: 'Discover elegance and refinement in every new design from our latest collection.'
    },
    hero_cta: { vi: 'Kh m Ph  Ngay', en: 'Explore now' },
    hero_cta_secondary: { vi: 'Xem lookbook', en: 'View lookbook' },
    trust_shipping_title: { vi: 'Mi?n ph¡ giao h…ng', en: 'Free shipping' },
    trust_shipping_sub: { vi: 'Don t? 499k, 2-3 ng…y nh?n', en: 'Orders from 499k, 2-3 day delivery' },
    trust_return_title: { vi: 'D?i tr? 30 ng…y', en: '30-day returns' },
    trust_return_sub: { vi: 'Nh?n tu v?n ki?u d ng', en: 'Size/style advice on request' },
    trust_hotline_title: { vi: 'Hotline 1800 6868', en: 'Hotline 1800 6868' },
    trust_hotline_sub: { vi: '9:00 - 21:00 m?i ng…y', en: '9:00 - 21:00 daily' },

    products_heading: { vi: 'S?n ph?m n?i b?t', en: 'Featured products' },
    products_body: {
      vi: 'Kh m ph  nh?ng thi?t k? du?c yˆu th¡ch nh?t trong b? suu t?p m?i, noi s? thanh l?ch v… phong c ch hi?n d?i giao thoa.',
      en: 'Explore the most-loved designs from our new collection, where elegance meets modern style.'
    },
    product1_name: { vi: 'V y l?a Organza', en: 'Organza silk dress' },
    product2_name: { vi: 'Ao kho c d ng d…i', en: 'Longline coat' },
    product3_name: { vi: 'Qu?n tƒy ?ng r?ng', en: 'Wide-leg trousers' },
    product4_name: { vi: 'So mi l?a tay b?ng', en: 'Balloon-sleeve silk shirt' },
    product5_name: { vi: 'D?m satin l?ch vai', en: 'One-shoulder satin gown' },
    product6_name: { vi: 'D?m midi h?a ti?t', en: 'Patterned midi dress' },
    product7_name: { vi: 'Ao len c? l?ng', en: 'Turtleneck knit top' },
    product8_name: { vi: 'T£i da t?i gi?n', en: 'Minimal leather bag' },
    products_cta: { vi: 'Xem to…n b? b? suu t?p', en: 'View full collection' },

    promo_heading: { vi: 'D?nh hnh phong c ch c?a b?n', en: 'Define your style' },
    promo_body: {
      vi: 'Kh m ph  b? suu t?p Thu/D“ng m?i nh?t v… tm th?y nh?ng m?nh gh‚p ho…n h?o n¢i lˆn c  t¡nh c?a b?n.',
      en: 'Explore the latest Fall/Winter collection and find the perfect pieces that express your personality.'
    },
    promo_cta: { vi: 'Mua Ngay', en: 'Shop now' },

    testimonials_heading: { vi: 'Kh ch h…ng n¢i g v? ch£ng t“i?', en: 'What do our customers say?' },
    testimonials_cta: { vi: 'Xem t?t c? d nh gi ', en: 'View all reviews' },

    newsletter_heading: { vi: 'Dang ky nhan ban tin', en: 'Subscribe to our newsletter' },
    newsletter_body: {
      vi: 'Nhan thong tin cap nhat ve san pham moi va cac chuong trinh khuyen mai dac biet.',
      en: 'Get updates on new arrivals and exclusive promotions.'
    },
    newsletter_button: { vi: 'Dang ky', en: 'Subscribe' },
    newsletter_placeholder: { vi: 'Nhap dia chi email cua ban', en: 'Enter your email address' },
    newsletter_alert: { vi: 'Cam on ban da dang ky nhan ban tin!', en: 'Thanks for subscribing to our newsletter!' },
    quick_pick: { vi: 'Bo suu tap goi y', en: 'Editor pick' },
    quick_desc: { vi: 'Thiet ke gioi han, chat lieu cao cap, giao nhanh 2-3 ngay.', en: 'Limited-run design, premium fabric, ships in 2-3 days.' },
    quick_bullet_material: { vi: 'Chat lieu: Lua & satin', en: 'Fabric: Silk & satin' },
    quick_bullet_fit: { vi: 'Phom: Relaxed fit', en: 'Fit: Relaxed fit' },
    quick_bullet_warranty: { vi: 'Bao hanh: 12 thang', en: 'Warranty: 12 months' },
    quick_bullet_exchange: { vi: 'Doi size: 30 ngay', en: 'Exchange: 30 days' },
    quick_add: { vi: 'Them vao gio hang', en: 'Add to cart' },
    quick_close: { vi: 'Dong', en: 'Close' },

    brand_tagline: {
      vi: 'Phong c ch t?i gi?n, sang tr?ng v… hi?n d?i d?nh hnh nˆn v? d?p vu?t th?i gian.',
      en: 'Minimalist, refined, and modern style that defines timeless beauty.'
    },
    about_heading: { vi: 'V? ch£ng t“i', en: 'About us' },
    about_story: { vi: 'Cƒu chuy?n thuong hi?u', en: 'Our story' },
    about_store: { vi: 'C?a h…ng', en: 'Stores' },
    about_career: { vi: 'Co h?i ngh? nghi?p', en: 'Careers' },

    support_heading: { vi: 'H? tr?', en: 'Support' },
    support_products: { vi: 'S?n ph?m', en: 'Products' },
    support_tracking: { vi: 'Theo doi don h…ng', en: 'Track order' },
    support_faq: { vi: 'Cƒu h?i thu?ng g?p', en: 'FAQ' },
    support_contact: { vi: 'Liˆn h?', en: 'Contact' },

    policy_heading: { vi: 'Ch¡nh s ch', en: 'Policies' },
    policy_return: { vi: 'Ch¡nh s ch d?i tr?', en: 'Return policy' },
    policy_privacy: { vi: 'Ch¡nh s ch b?o m?t', en: 'Privacy policy' },
    policy_terms: { vi: 'Di?u kho?n d?ch v?', en: 'Terms of service' },

    rights: { vi: 'c 2024 Elegance Fashion. All rights reserved.', en: 'c 2024 Elegance Fashion. All rights reserved.' },
    footer_language: { vi: 'Ti?ng Vi?t', en: 'English' }
  };

  ns.storage = {
    get: (key) => {
      try { return localStorage.getItem(key); } catch (_) { return null; }
    },
    set: (key, value) => {
      try { localStorage.setItem(key, value); } catch (_) {}
    }
  };

  ns.state = { currentLang: 'vi' };
  ns.fn = ns.fn || {};
})();
