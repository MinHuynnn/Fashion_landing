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
    hero_cta_secondary: { vi: 'Xem lookbook', en: 'View lookbook' },
    trust_shipping_title: { vi: 'Miễn phí giao hàng', en: 'Free shipping' },
    trust_shipping_sub: { vi: 'Đơn từ 499k, nhận sau 2-3 ngày', en: 'Orders from 499k, 2-3 day delivery' },
    trust_return_title: { vi: 'Đổi trả 30 ngày', en: '30-day returns' },
    trust_return_sub: { vi: 'Nhận tư vấn size/kiểu dáng', en: 'Size/style advice on request' },
    trust_hotline_title: { vi: 'Hotline 1800 6868', en: 'Hotline 1800 6868' },
    trust_hotline_sub: { vi: '9:00 - 21:00 mỗi ngày', en: '9:00 - 21:00 daily' },

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
    product7_name: { vi: 'Áo len cổ lọ', en: 'Turtleneck knit top' },
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
      vi: 'Nhận thông tin cập nhật về sản phẩm mới và các chương trình khuyến mãi đặc biệt.',
      en: 'Get updates on new arrivals and exclusive promotions.'
    },
    newsletter_button: { vi: 'Đăng ký', en: 'Subscribe' },
    newsletter_placeholder: { vi: 'Nhập địa chỉ email của bạn', en: 'Enter your email address' },
    newsletter_alert: { vi: 'Cảm ơn bạn đã đăng ký nhận bản tin!', en: 'Thanks for subscribing to our newsletter!' },
    quick_pick: { vi: 'Gợi ý biên tập', en: 'Editor pick' },
    quick_desc: { vi: 'Thiết kế giới hạn, chất liệu cao cấp, giao nhanh 2-3 ngày.', en: 'Limited-run design, premium fabric, ships in 2-3 days.' },
    quick_bullet_material: { vi: 'Chất liệu: Lụa & satin', en: 'Fabric: Silk & satin' },
    quick_bullet_fit: { vi: 'Phom: Relaxed fit', en: 'Fit: Relaxed fit' },
    quick_bullet_warranty: { vi: 'Bảo hành: 12 tháng', en: 'Warranty: 12 months' },
    quick_bullet_exchange: { vi: 'Đổi size: 30 ngày', en: 'Exchange: 30 days' },
    quick_add: { vi: 'Thêm vào giỏ hàng', en: 'Add to cart' },
    quick_close: { vi: 'Đóng', en: 'Close' },

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

    rights: { vi: '© 2024 Elegance Fashion. Đã đăng ký bản quyền.', en: '© 2024 Elegance Fashion. All rights reserved.' },
    footer_language: { vi: 'Tiếng Việt', en: 'English' }
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
