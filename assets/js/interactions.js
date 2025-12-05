(() => {
  const ns = window.Elegance;
  const { quickviewAdd, newsletterForm, quickTitle } = ns.el;
  const { translations } = ns;
  const state = ns.state;
  const { showToast, closeQuickView } = ns.fn;

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
})();
