'use strict';

// If `prefers-color-scheme` is not supported, fall back to light mode.
if (window.matchMedia('(prefers-color-scheme: dark)').media === 'not all') {
  document.documentElement.style.display = 'none';

  const link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = '../css/light.css';
  link.addEventListener('load', () => {
    document.documentElement.style.display = '';
  });

  document.head.appendChild(link);
}
