'use strict';

function resolveInstalledToggle(reason, currentToggle) {
  if (reason === 'install') return true;

  if (reason === 'update') {
    if (typeof currentToggle === 'string') return currentToggle !== 'false';
    if (typeof currentToggle === 'undefined') return true;
  }

  return null;
}

if (typeof chrome !== 'undefined') {
  chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.storage.local.set({ toggle: resolveInstalledToggle('install') });
      return;
    }

    if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
      chrome.storage.local.get('toggle', (items) => {
        const next = resolveInstalledToggle('update', items.toggle);
        if (next !== null) chrome.storage.local.set({ toggle: next });
      });
    }
  });
}

if (typeof module !== 'undefined') {
  module.exports = { resolveInstalledToggle };
}
