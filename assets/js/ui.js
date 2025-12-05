(() => {
  const ns = window.Elegance;
  ns.fn = ns.fn || {};
  const { toast } = ns.el;

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

  ns.fn.showToast = showToast;
})();
