document.addEventListener('DOMContentLoaded', function() {
  lucide.createIcons();

  const urlInput = document.getElementById('urlInput');
  const formatSelect = document.getElementById('formatSelect');
  const qualitySelect = document.getElementById('qualitySelect');
  const convertBtn = document.getElementById('convertBtn');
  const progressFill = document.getElementById('progressFill');
  const statusText = document.getElementById('statusText');
  const progressPercent = document.getElementById('progressPercent');
  const pasteBtn = document.getElementById('pasteBtn');
  const clearBtn = document.getElementById('clearBtn');
  const darkToggle = document.getElementById('darkToggle');

  let dark = false;
  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    dark = !dark;
    darkToggle.innerHTML = dark ? '<i data-lucide="sun" style="width:18px;height:18px;"></i><span>Light</span>' : '<i data-lucide="moon" style="width:18px;height:18px;"></i><span>Theme</span>';
    lucide.createIcons();
  });

  pasteBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      urlInput.value = text;
    } catch { statusText.textContent = 'Unable to paste'; }
  });
  clearBtn.addEventListener('click', () => { urlInput.value = ''; statusText.textContent = 'Ready'; progressFill.style.width = '0%'; progressPercent.textContent = '0%'; });

  function simulateConversion() {
    const url = urlInput.value.trim();
    if (!url || !url.includes('youtube.com') && !url.includes('youtu.be')) {
      statusText.textContent = 'Please enter a valid YouTube URL';
      return;
    }
    statusText.textContent = 'Converting...';
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 3;
      if (progress > 100) progress = 100;
      progressFill.style.width = progress + '%';
      progressPercent.textContent = progress + '%';
      if (progress === 100) {
        clearInterval(interval);
        statusText.textContent = 'Done! Download ready.';
        setTimeout(() => {
          progressFill.style.width = '0%';
          progressPercent.textContent = '0%';
          statusText.textContent = 'Ready';
        }, 2400);
      }
    }, 200);
  }

  convertBtn.addEventListener('click', simulateConversion);
  urlInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') simulateConversion(); });

  document.addEventListener('dragover', e => e.preventDefault());
  document.addEventListener('drop', e => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain') || e.dataTransfer.getData('text/uri-list');
    if (data) urlInput.value = data;
  });

  function createSparkle() {
    const spark = document.createElement('div');
    spark.className = 'sparkle';
    spark.style.left = Math.random() * 90 + 'vw';
    spark.style.top = Math.random() * 90 + 'vh';
    spark.style.width = spark.style.height = (Math.random() * 10 + 4) + 'px';
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 2000);
  }
  setInterval(createSparkle, 2200);
  for (let i=0; i<5; i++) setTimeout(createSparkle, i*300);

  const statusLive = document.createElement('div');
  statusLive.setAttribute('aria-live', 'polite');
  statusLive.className = 'sr-only';
  document.body.appendChild(statusLive);
  const origStatus = statusText.textContent;
  Object.defineProperty(statusText, 'textContent', {
    set: function(v) {
      this.innerText = v;
      statusLive.textContent = v;
    },
    get: function() { return this.innerText; }
  });
});