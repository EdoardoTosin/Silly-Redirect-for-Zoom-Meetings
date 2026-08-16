'use strict';

const ICONS_ON = {
  16:  '../icons/16x16.png',
  32:  '../icons/32x32.png',
  48:  '../icons/48x48.png',
  64:  '../icons/64x64.png',
  128: '../icons/128x128.png',
  256: '../icons/256x256.png',
};

const ICONS_OFF = {
  16:  '../icons/16x16-off.png',
  32:  '../icons/32x32-off.png',
  48:  '../icons/48x48-off.png',
  64:  '../icons/64x64-off.png',
  128: '../icons/128x128-off.png',
  256: '../icons/256x256-off.png',
};

function setProp(selector, prop, value) {
  const el = document.querySelector(selector);
  if (el) el[prop] = value;
}

function setLocale(selector, prop, msgKey) {
  setProp(selector, prop, chrome.i18n.getMessage(msgKey));
}

function applyState(enabled) {
  const switchEl = document.querySelector('.switch');
  const toggleEl = document.getElementById('toggle');

  if (switchEl) switchEl.title = chrome.i18n.getMessage(enabled ? 'enabled' : 'disabled');
  if (toggleEl) toggleEl.checked = enabled;

  chrome.action.setIcon({ path: enabled ? ICONS_ON : ICONS_OFF });
}

function saveState(enabled) {
  chrome.storage.local.set({ toggle: enabled });
  applyState(enabled);
}

function loadPopupContent() {
  const manifest     = chrome.runtime.getManifest();
  const homeURL      = manifest.homepage_url;
  const changelogURL = `${homeURL}/blob/main/CHANGELOG.md`;
  const issueURL     = `${homeURL}/issues`;

  setLocale('title', 'textContent', 'name');
  setProp("meta[name='author']",        'content', manifest.author);
  setLocale("meta[name='description']", 'content', 'description');

  setLocale('#title', 'textContent', 'popup_title');

  setLocale('#changelog',     'textContent', 'popup_changelog');
  setProp('#changelog',       'href',        changelogURL);
  setProp('#changelog',       'title',       changelogURL);

  setLocale('#issue-tracker', 'textContent', 'popup_issue_tracker');
  setProp('#issue-tracker',   'href',        issueURL);
  setProp('#issue-tracker',   'title',       issueURL);

  setLocale('#source-code',   'textContent', 'popup_source_code');
  setProp('#source-code',     'href',        homeURL);
  setProp('#source-code',     'title',       homeURL);

  setLocale('#addon-version', 'title',       'popup_addon_version');
  setProp('#addon-version',   'textContent', `v${manifest.version}`);
}

document.addEventListener('DOMContentLoaded', () => {
  loadPopupContent();

  chrome.storage.local.get('toggle', (items) => {
    const enabled =
      items.toggle === undefined ||
      items.toggle === true      ||
      items.toggle === 'true';

    applyState(enabled);
  });

  const toggleEl = document.getElementById('toggle');
  if (toggleEl) {
    toggleEl.addEventListener('change', (e) => saveState(e.target.checked));
  }
});

window.addEventListener('click', (e) => {
  if (e.target.href) {
    chrome.tabs.create({ url: e.target.href });
    window.close();
  }
});
