// questionnaire-modal.js
// Dynamically loads and mounts the React questionnaire app as a modal overlay

function loadReactQuestionnaire() {
  // Prevent multiple loads
  if (window.__questionnaireLoaded) return;
  window.__questionnaireLoaded = true;

  // Show the container
  const root = document.getElementById('questionnaire-root');
  if (root) root.style.display = 'block';

  // Add overlay style
  root.style.position = 'fixed';
  root.style.top = 0;
  root.style.left = 0;
  root.style.width = '100vw';
  root.style.height = '100vh';
  root.style.background = 'rgba(0,0,0,0.7)';
  root.style.zIndex = 9999;
  root.style.display = 'flex';
  root.style.justifyContent = 'center';
  root.style.alignItems = 'center';

  // Add close button
  if (!document.getElementById('questionnaire-close')) {
    const closeBtn = document.createElement('button');
    closeBtn.id = 'questionnaire-close';
    closeBtn.innerText = '×';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '32px';
    closeBtn.style.right = '32px';
    closeBtn.style.fontSize = '2rem';
    closeBtn.style.background = 'none';
    closeBtn.style.border = 'none';
    closeBtn.style.color = '#fff';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.zIndex = 10000;
    closeBtn.onclick = function() {
      root.style.display = 'none';
      root.innerHTML = '';
      window.__questionnaireLoaded = false;
    };
    root.appendChild(closeBtn);
  }

  // Dynamically load CSS if not already loaded
  if (!document.getElementById('questionnaire-css')) {
    const link = document.createElement('link');
    link.id = 'questionnaire-css';
    link.rel = 'stylesheet';
    link.href = '/PortfolioQuestion/dist/assets/index-fdc4e425.css';
    document.head.appendChild(link);
  }

  // Dynamically load JS bundle
  if (!document.getElementById('questionnaire-script')) {
    const script = document.createElement('script');
    script.id = 'questionnaire-script';
    script.type = 'module';
    script.src = '/PortfolioQuestion/dist/assets/index-9a3b0c57.js';
    root.appendChild(script);
  }
}

// Attach to all .get-started.w-button buttons
function attachQuestionnaireModal() {
  document.querySelectorAll('.get-started.w-button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Hide the old modal if open
      const oldModal = document.querySelector('.question-popup');
      if (oldModal) {
        oldModal.style.display = 'none';
        oldModal.style.opacity = 0;
      }
      loadReactQuestionnaire();
    });
  });
}

document.addEventListener('DOMContentLoaded', attachQuestionnaireModal);
