/**
 * GSAP-based toggle selector for desktop (.toggle-wrapper) and mobile (.toggle-wrapper-mobile).
 * Replaces Webflow IX2 animations (a-4..a-10, a-50, a-51).
 *
 * Expects gsap to be loaded globally before this script runs.
 */
(function () {
  'use strict';

  var DURATION = 0.45;
  var EASE = 'power2.inOut';

  var containers = ['.brand-container', '.motion-container', '.web-container'];
  var textClasses = ['.text-block.brand', '.text-block.motion', '.text-block.web'];
  var COLOR_ACTIVE = '#ffffff';
  var COLOR_INACTIVE = '#000000';

  function initToggle(wrapperSelector) {
    var wrapper = document.querySelector(wrapperSelector);
    if (!wrapper) return;

    var indicator = wrapper.querySelector('.button-switch.active');
    var buttons = [
      wrapper.querySelector('.button-switch._1'),
      wrapper.querySelector('.button-switch._2'),
      wrapper.querySelector('.button-switch._3')
    ];

    if (!indicator || buttons.some(function (b) { return !b; })) return;

    var currentIndex = 0;

    function getTargetX(index) {
      var btn = buttons[index];
      if (!btn) return 0;
      // Position indicator to align with the clicked button
      return btn.offsetLeft - indicator.offsetLeft + (btn.offsetWidth - indicator.offsetWidth) / 2;
    }

    function activate(index) {
      if (index === currentIndex && gsap.getProperty(indicator, 'x') !== 0) return;
      currentIndex = index;

      // Slide indicator
      gsap.to(indicator, {
        x: getTargetX(index),
        duration: DURATION,
        ease: EASE,
        overwrite: true
      });

      // Toggle containers
      containers.forEach(function (sel, i) {
        var el = document.querySelector(sel);
        if (!el) return;
        el.style.display = i === index ? 'flex' : 'none';
      });

      // Text colors
      textClasses.forEach(function (sel, i) {
        document.querySelectorAll(sel).forEach(function (el) {
          gsap.to(el, {
            color: i === index ? COLOR_ACTIVE : COLOR_INACTIVE,
            duration: DURATION,
            ease: EASE,
            overwrite: true
          });
        });
      });
    }

    buttons.forEach(function (btn, i) {
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', function () {
        activate(i);
      });
    });

    // Set initial state (Brand Identity active, index 0)
    gsap.set(indicator, { x: 0 });
    activate(0);

    // Recalculate position on resize
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        gsap.set(indicator, { x: getTargetX(currentIndex) });
      }, 150);
    });
  }

  // Wait for GSAP to be available, then init
  function tryInit() {
    if (typeof gsap === 'undefined') {
      setTimeout(tryInit, 100);
      return;
    }
    initToggle('.toggle-wrapper');
    initToggle('.toggle-wrapper-mobile');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
})();
