'use strict';

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.storage.local.set({ toggle: true });
    return;
  }

  if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    chrome.storage.local.get('toggle', (items) => {
      if (typeof items.toggle === 'string') {
        // Migrate old string values to booleans.
        chrome.storage.local.set({ toggle: items.toggle !== 'false' });
      } else if (typeof items.toggle === 'undefined') {
        chrome.storage.local.set({ toggle: true });
      }
    });
  }
});
