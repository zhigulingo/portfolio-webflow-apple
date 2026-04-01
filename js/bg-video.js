/**
 * Background video play/pause control — replaces the bgVideo module from webflow-script.js.
 */
(function () {
  // Respect prefers-reduced-motion: pause videos and hide control
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.querySelectorAll('.w-background-video--control').forEach(function (btn) {
    var container = btn.closest('.w-background-video');
    if (!container) return;
    var video = container.querySelector('video');
    if (!video) return;

    var spans = btn.querySelectorAll('span');
    // First span = pause icon (visible when playing), second span = play icon (hidden when playing)
    var pauseSpan = spans[0];
    var playSpan = spans[1];

    function updateUI(playing) {
      if (pauseSpan) pauseSpan.hidden = !playing;
      if (playSpan) playSpan.hidden = playing;
    }

    btn.addEventListener('click', function () {
      if (video.paused) {
        video.play();
        updateUI(true);
      } else {
        video.pause();
        updateUI(false);
      }
    });

    // Handle prefers-reduced-motion
    function handleMotionPref() {
      if (reducedMotion.matches) {
        video.pause();
        updateUI(false);
      }
    }
    handleMotionPref();
    reducedMotion.addEventListener('change', handleMotionPref);
  });
})();
