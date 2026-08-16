'use strict';

// Zoom meeting IDs are 10-11 digits (10 for Personal Meeting ID, 11 for
// instant/scheduled/recurring meetings). See https://developers.zoom.us/docs/api/meetings/
const MEETING_ID_RE = /^\d{10,11}$/;

function isEnabled(toggle) {
  return toggle === undefined || toggle === true || toggle === 'true';
}

function getRedirectTarget(pathname, hostname, search) {
  const segments = pathname.split('/');
  const type = segments[1];
  const id   = segments[2];

  if (!MEETING_ID_RE.test(id)) return null;

  if (type === 'j') return `https://${hostname}/wc/join/${id}${search}`;
  if (type === 's') return `https://${hostname}/wc/${id}/start${search}`;
  return null;
}

if (typeof chrome !== 'undefined') {
  const target = getRedirectTarget(
    window.location.pathname,
    window.location.hostname,
    window.location.search
  );

  if (target) {
    chrome.storage.local.get('toggle', (items) => {
      // replace() keeps the original URL out of history.
      if (isEnabled(items.toggle)) window.location.replace(target);
    });
  }
}

if (typeof module !== 'undefined') {
  module.exports = { isEnabled, getRedirectTarget };
}
