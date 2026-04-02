/**
 * Toggle Selector — GSAP replacement for IX2 toggle animations
 * Handles .toggle-wrapper (desktop) and .toggle-wrapper-mobile (mobile)
 * Uses translateX percentages matching original IX2 action lists
 */
(function() {
  'use strict';

  // TranslateX values from IX2 action lists
  var DESKTOP_TX = ['0%', '106%', '204%'];   // a-7, a-50, a-51
  var MOBILE_TX  = ['0px', '98%', '192%'];   // a-7, a-5, a-6
  var MOBILE_BREAKPOINT = 479;

  var containers = ['.brand-container', '.motion-container', '.web-container'];

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function getTranslateValues(wrapper) {
    var mobile = wrapper.classList.contains('toggle-wrapper-mobile');
    return mobile ? MOBILE_TX : DESKTOP_TX;
  }

  function initToggleSelector() {
    var wrappers = document.querySelectorAll('.toggle-wrapper, .toggle-wrapper-mobile');

    wrappers.forEach(function(wrapper) {
      var indicator = wrapper.querySelector('.button-switch.active');
      var buttons = wrapper.querySelectorAll('.button-switch._1, .button-switch._2, .button-switch._3');

      if (!indicator || buttons.length === 0) return;

      var currentIndex = 0;

      function activate(index) {
        var btn = buttons[index];
        if (!btn) return;
        currentIndex = index;

        var txValues = getTranslateValues(wrapper);

        // Kill any existing tweens on the indicator to override IX2
        gsap.killTweensOf(indicator);

        // Animate indicator to target position using translateX
        gsap.to(indicator, {
          x: txValues[index],
          duration: 0.5,
          ease: 'power2.inOut'
        });

        // Update text colors: active = white, others = dark
        buttons.forEach(function(b, i) {
          var textEl = b.querySelector('.text-block');
          if (textEl) {
            gsap.killTweensOf(textEl);
            gsap.to(textEl, {
              color: i === index ? '#ffffff' : '#1b1b1b',
              duration: 0.5,
              ease: 'power2.inOut'
            });
          }
        });

        // Show the corresponding container, hide others
        containers.forEach(function(sel, i) {
          var el = document.querySelector(sel);
          if (!el) return;
          if (i === index) {
            el.style.display = 'flex';
            gsap.fromTo(el,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
          } else {
            gsap.to(el, {
              opacity: 0,
              duration: 0.2,
              onComplete: function() { el.style.display = 'none'; }
            });
          }
        });
      }

      // Bind click events
      buttons.forEach(function(btn, index) {
        btn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          activate(index);
        });
      });

      // Initialize: set indicator to first button position
      // NOTE: do NOT set height:'auto' — the indicator is an empty div;
      // its height comes from CSS top/bottom offsets on position:absolute.
      requestAnimationFrame(function() {
        gsap.set(indicator, {
          x: getTranslateValues(wrapper)[0]
        });
        // Set first button text to white
        var firstText = buttons[0].querySelector('.text-block');
        if (firstText) firstText.style.color = '#ffffff';
      });

      // On resize, recalculate indicator position for current selection
      var resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          var txValues = getTranslateValues(wrapper);
          gsap.set(indicator, { x: txValues[currentIndex] });
        }, 150);
      });
    });
  }

  // Wait for both DOM and GSAP to be available
  function waitForGSAP(callback) {
    if (typeof gsap !== 'undefined') {
      callback();
      return;
    }
    var check = setInterval(function() {
      if (typeof gsap !== 'undefined') {
        clearInterval(check);
        callback();
      }
    }, 50);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      waitForGSAP(initToggleSelector);
    });
  } else {
    waitForGSAP(initToggleSelector);
  }
})();
