/**
 * Lightweight lightbox — replaces the lightbox module from webflow-script.js.
 * Reads w-json config from .w-lightbox elements, opens fullscreen overlay.
 */
(function () {
  // Inject styles once
  var style = document.createElement('style');
  style.textContent =
    '.wl-overlay{position:fixed;inset:0;z-index:100000;background:rgba(0,0,0,.9);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s ease}' +
    '.wl-overlay.wl-active{opacity:1}' +
    '.wl-overlay img{max-width:90vw;max-height:90vh;object-fit:contain;border-radius:4px}' +
    '.wl-close{position:absolute;top:16px;right:16px;width:40px;height:40px;cursor:pointer;background:none;border:none;padding:0}' +
    '.wl-close::before,.wl-close::after{content:"";position:absolute;top:50%;left:50%;width:24px;height:2px;background:#fff;transform-origin:center}' +
    '.wl-close::before{transform:translate(-50%,-50%) rotate(45deg)}' +
    '.wl-close::after{transform:translate(-50%,-50%) rotate(-45deg)}' +
    '.wl-nav{position:absolute;top:50%;transform:translateY(-50%);width:44px;height:44px;cursor:pointer;background:none;border:none;color:#fff;font-size:28px;display:flex;align-items:center;justify-content:center;opacity:.7;transition:opacity .15s}' +
    '.wl-nav:hover{opacity:1}' +
    '.wl-prev{left:12px}' +
    '.wl-next{right:12px}';
  document.head.appendChild(style);

  var overlay = null;
  var imgEl = null;
  var items = [];
  var idx = 0;

  function show(i) {
    idx = i;
    if (!items[idx]) return;
    imgEl.src = items[idx].url;
    imgEl.alt = items[idx].fileName || items[idx].origFileName || '';
    // Toggle arrows
    var prev = overlay.querySelector('.wl-prev');
    var next = overlay.querySelector('.wl-next');
    if (prev) prev.style.display = items.length > 1 ? '' : 'none';
    if (next) next.style.display = items.length > 1 ? '' : 'none';
  }

  function open(newItems) {
    items = newItems;
    idx = 0;
    if (!overlay) buildOverlay();
    show(0);
    document.body.style.overflow = 'hidden';
    overlay.style.display = 'flex';
    // Force reflow then fade in
    overlay.offsetHeight; // eslint-disable-line no-unused-expressions
    overlay.classList.add('wl-active');
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('wl-active');
    document.body.style.overflow = '';
    setTimeout(function () {
      overlay.style.display = 'none';
    }, 250);
  }

  function buildOverlay() {
    overlay = document.createElement('div');
    overlay.className = 'wl-overlay';
    overlay.style.display = 'none';

    imgEl = document.createElement('img');
    overlay.appendChild(imgEl);

    var closeBtn = document.createElement('button');
    closeBtn.className = 'wl-close';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', close);
    overlay.appendChild(closeBtn);

    var prev = document.createElement('button');
    prev.className = 'wl-nav wl-prev';
    prev.innerHTML = '&#8249;';
    prev.setAttribute('aria-label', 'Previous');
    prev.addEventListener('click', function (e) {
      e.stopPropagation();
      show((idx - 1 + items.length) % items.length);
    });
    overlay.appendChild(prev);

    var next = document.createElement('button');
    next.className = 'wl-nav wl-next';
    next.innerHTML = '&#8250;';
    next.setAttribute('aria-label', 'Next');
    next.addEventListener('click', function (e) {
      e.stopPropagation();
      show((idx + 1) % items.length);
    });
    overlay.appendChild(next);

    // Close on backdrop click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    document.body.appendChild(overlay);
  }

  // Keyboard
  document.addEventListener('keydown', function (e) {
    if (!overlay || overlay.style.display === 'none') return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show((idx - 1 + items.length) % items.length);
    if (e.key === 'ArrowRight') show((idx + 1) % items.length);
  });

  // Bind lightbox triggers
  document.querySelectorAll('.w-lightbox').forEach(function (el) {
    var json = el.querySelector('script.w-json');
    if (!json) return;
    var data;
    try { data = JSON.parse(json.textContent); } catch (e) { return; }
    if (!data.items || !data.items.length) return;

    el.style.cursor = 'zoom-in';
    el.addEventListener('click', function (e) {
      e.preventDefault();
      open(data.items);
    });
  });
})();
