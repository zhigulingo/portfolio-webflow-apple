/**
 * Lightweight Webflow form handler — replaces the forms module from webflow-script.js.
 * Submits to the Webflow form API and handles success/error states.
 */
(function () {
  var WEBFLOW_API = 'https://webflow.com/api/v1/form/';

  document.querySelectorAll('.w-form').forEach(function (block) {
    var form = block.querySelector('form');
    if (!form) return;

    var done = block.querySelector('.w-form-done');
    var fail = block.querySelector('.w-form-fail');
    var btn = form.querySelector('[type="submit"]');
    var btnOrigText = btn ? btn.value : '';
    var waitText = btn ? btn.getAttribute('data-wait') : '';

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (done) done.style.display = 'none';
      if (fail) fail.style.display = 'none';

      // Loading state
      if (btn && waitText) btn.value = waitText;

      // Collect fields
      var fields = {};
      var inputs = form.querySelectorAll('input, select, textarea');
      inputs.forEach(function (el) {
        if (el.name && el.type !== 'submit') {
          fields[el.name] = el.value;
        }
      });

      // Get reCAPTCHA token if present
      var recaptchaResponse = '';
      if (typeof grecaptcha !== 'undefined') {
        recaptchaResponse = grecaptcha.getResponse();
      }

      // Build payload matching Webflow's format
      var siteId = document.documentElement.getAttribute('data-wf-site') || '';
      var payload = {
        name: form.getAttribute('data-name') || form.getAttribute('name') || '',
        pageId: form.getAttribute('data-wf-page-id') || document.documentElement.getAttribute('data-wf-page') || '',
        elementId: form.getAttribute('data-wf-element-id') || '',
        source: window.location.href,
        test: false,
        fields: fields,
        dolphin: false
      };
      if (recaptchaResponse) {
        payload['g-recaptcha-response'] = recaptchaResponse;
      }

      fetch(WEBFLOW_API + siteId, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          // Success
          form.style.display = 'none';
          if (done) done.style.display = 'block';
        })
        .catch(function () {
          if (fail) fail.style.display = 'block';
        })
        .finally(function () {
          if (btn) btn.value = btnOrigText;
          if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
        });
    });
  });
})();
