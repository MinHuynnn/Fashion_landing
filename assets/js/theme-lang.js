(() => {
  const ns = window.Elegance;
  ns.fn = ns.fn || {};
  const { html, themeButtons, langButtons, langLabels } = ns.el;
  const { translations, storage } = ns;
  const state = ns.state;

  const setTheme = (theme) => {
    html.classList.toggle('dark', theme === 'dark');
    storage.set('theme', theme);
  };

  const toggleTheme = () => setTheme(html.classList.contains('dark') ? 'light' : 'dark');

  const storedTheme = storage.get('theme');
  if (storedTheme) setTheme(storedTheme);
  themeButtons.forEach((btn) => btn.addEventListener('click', toggleTheme));

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

  const setLang = (lang) => {
    state.currentLang = lang;
    storage.set('lang', lang);
    html.lang = lang;
    updateLangLabels(lang);
    applyTranslations(lang);
  };

  const storedLang = storage.get('lang');
  setLang(storedLang === 'en' ? 'en' : 'vi');
  langButtons.forEach((btn) => btn.addEventListener('click', () => setLang(state.currentLang === 'vi' ? 'en' : 'vi')));

  ns.fn.applyTranslations = applyTranslations;
  ns.fn.setLang = setLang;
  ns.fn.setTheme = setTheme;
})();
