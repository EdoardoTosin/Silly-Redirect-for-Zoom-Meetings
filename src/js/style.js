'use strict';

function needsColorSchemeFallback(mediaType) {
  return mediaType === 'not all';
}

if (typeof window !== 'undefined') {
  if (needsColorSchemeFallback(window.matchMedia('(prefers-color-scheme: dark)').media)) {
    document.documentElement.style.display = 'none';

    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = '../css/light.css';
    link.addEventListener('load', () => {
      document.documentElement.style.display = '';
    });

    document.head.appendChild(link);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { needsColorSchemeFallback };
}
