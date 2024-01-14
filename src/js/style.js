// If `prefers-color-scheme` is not supported, fall back to light mode.
if (window.matchMedia('(prefers-color-scheme: dark)').media !== 'all') {
    document.documentElement.style.display = 'none';
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chrome.runtime.getURL('../css/light.css');
    document.head.appendChild(link);
    link.addEventListener('load', function() {
        document.documentElement.style.display = '';
    });
}
