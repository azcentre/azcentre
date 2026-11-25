(function () {
  var header = document.querySelector('[data-azr-header]');
  if (!header) return;
  var toggle = header.querySelector('[data-azr-menu]');
  var dropdown = header.querySelector('[data-azr-dropdown]');

  function setMenu(open) {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.querySelector('.azr-menu-label').textContent = open ? 'Close' : 'Menu';
  }

  if (toggle) {
    toggle.addEventListener('click', function () { setMenu(!header.classList.contains('is-open')); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (dropdown && dropdown.open) { dropdown.open = false; dropdown.querySelector('summary').focus(); }
    else if (header.classList.contains('is-open')) { setMenu(false); toggle.focus(); }
  });

  document.addEventListener('click', function (e) {
    if (dropdown && dropdown.open && !dropdown.contains(e.target) && window.matchMedia('(min-width: 1081px)').matches) dropdown.open = false;
  });

  // Close the mobile menu after jumping to an on-page section.
  header.querySelectorAll('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });

  // Hairline shadow once the page scrolls under the sticky header.
  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
