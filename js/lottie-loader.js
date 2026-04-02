(function () {
  var LOTTIE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
  var FFLATE_CDN = 'https://cdn.jsdelivr.net/npm/fflate@0.8.2/umd/index.js';

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      if (src.indexOf('lottie') !== -1 && window.lottie) return resolve();
      if (src.indexOf('fflate') !== -1 && window.fflate) return resolve();
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  function parseDotLottie(buffer) {
    var decompressed = fflate.unzipSync(new Uint8Array(buffer));
    var manifestBytes = decompressed['manifest.json'];
    var manifest = JSON.parse(fflate.strFromU8(manifestBytes));
    var animId = manifest.animations[0].id;
    var animBytes = decompressed['animations/' + animId + '.json'];
    return JSON.parse(fflate.strFromU8(animBytes));
  }

  function observeElements(elements) {
    var count = 0;
    var animMap = new WeakMap(); // el → lottie animation instance

    // First observer: lazy-init animations when they scroll into view
    var initObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        initObserver.unobserve(entry.target);
        initAnimationTracked(entry.target).then(function () {
          count++;
          // After init, start watching for visibility to pause/play
          visibilityObserver.observe(entry.target);
          if (count === elements.length) {
            console.log('Lottie: initialized ' + count + ' animations');
          }
        });
      });
    }, { rootMargin: '200px' });

    // Second observer: pause off-screen animations to save CPU/GPU
    var visibilityObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var anim = animMap.get(entry.target);
        if (!anim) return;
        if (entry.isIntersecting) {
          anim.play();
        } else {
          anim.pause();
        }
      });
    }, { rootMargin: '50px' });

    function initAnimationTracked(el) {
      var src = el.getAttribute('data-src');
      var loop = el.getAttribute('data-loop') === '1';
      var autoplay = el.getAttribute('data-autoplay') === '1';
      var renderer = el.getAttribute('data-renderer') || 'svg';
      var isDotLottie = src.indexOf('.lottie') !== -1;

      if (!isDotLottie) {
        var anim = lottie.loadAnimation({
          container: el,
          renderer: renderer,
          loop: loop,
          autoplay: autoplay,
          path: src
        });
        animMap.set(el, anim);
        return Promise.resolve();
      }

      return fetch(src)
        .then(function (r) { return r.arrayBuffer(); })
        .then(function (buf) {
          var animationData = parseDotLottie(buf);
          var anim = lottie.loadAnimation({
            container: el,
            renderer: renderer,
            loop: loop,
            autoplay: autoplay,
            animationData: animationData
          });
          animMap.set(el, anim);
        });
    }

    elements.forEach(function (el) { initObserver.observe(el); });
  }

  var elements = document.querySelectorAll('[data-animation-type="lottie-custom"]');
  if (!elements.length) return;

  var needsFflate = Array.prototype.some.call(elements, function (el) {
    return el.getAttribute('data-src').indexOf('.lottie') !== -1;
  });

  var scripts = [loadScript(LOTTIE_CDN)];
  if (needsFflate) scripts.push(loadScript(FFLATE_CDN));

  Promise.all(scripts).then(function () {
    observeElements(Array.prototype.slice.call(elements));
  });
})();
