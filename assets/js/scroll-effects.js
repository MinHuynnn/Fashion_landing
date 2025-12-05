(() => {
  const ns = window.Elegance;
  const { mobileToggle, mobileMenu, scrollLinks, revealItems, progressBar } = ns.el;

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
})();
