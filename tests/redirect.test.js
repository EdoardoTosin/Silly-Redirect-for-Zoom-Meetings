'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { isEnabled, getRedirectTarget } = require('../src/js/redirect.js');

describe('isEnabled (re-exported from toggle.js)', () => {
  it('is the same function toggle.js exports', () => {
    assert.equal(isEnabled, require('../src/js/toggle.js').isEnabled);
  });
});

describe('getRedirectTarget - join', () => {
  it('redirects 10-digit ID', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890', 'zoom.us', ''),
      'https://zoom.us/wc/join/1234567890'
    );
  });
  it('redirects 11-digit ID', () => {
    assert.equal(
      getRedirectTarget('/j/12345678901', 'zoom.us', ''),
      'https://zoom.us/wc/join/12345678901'
    );
  });
  it('preserves search params', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890', 'zoom.us', '?pwd=abc123XYZ'),
      'https://zoom.us/wc/join/1234567890?pwd=abc123XYZ'
    );
  });
  it('works for zoomgov.com', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890', 'example.zoomgov.com', ''),
      'https://example.zoomgov.com/wc/join/1234567890'
    );
  });
  it('uses the full hostname as-is', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890', 'us02web.zoom.us', ''),
      'https://us02web.zoom.us/wc/join/1234567890'
    );
  });
});

describe('getRedirectTarget - start', () => {
  it('redirects 10-digit ID', () => {
    assert.equal(
      getRedirectTarget('/s/1234567890', 'zoom.us', ''),
      'https://zoom.us/wc/1234567890/start'
    );
  });
  it('redirects 11-digit ID', () => {
    assert.equal(
      getRedirectTarget('/s/12345678901', 'zoom.us', ''),
      'https://zoom.us/wc/12345678901/start'
    );
  });
  it('preserves search params', () => {
    assert.equal(
      getRedirectTarget('/s/1234567890', 'zoom.us', '?pwd=abc123XYZ'),
      'https://zoom.us/wc/1234567890/start?pwd=abc123XYZ'
    );
  });
  it('works for zoomgov.com', () => {
    assert.equal(
      getRedirectTarget('/s/1234567890', 'example.zoomgov.com', ''),
      'https://example.zoomgov.com/wc/1234567890/start'
    );
  });
});

describe('getRedirectTarget - Vanity URL subdomain (examples per KB0061540)', () => {
  it('works for a lettered subdomain (join)', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890', 'hooli.zoom.us', ''),
      'https://hooli.zoom.us/wc/join/1234567890'
    );
  });
  it('works for a hyphenated subdomain (join)', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890', 'hooli-org.zoom.us', ''),
      'https://hooli-org.zoom.us/wc/join/1234567890'
    );
  });
  it('works for a numeric subdomain (join)', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890', '1234.zoom.us', ''),
      'https://1234.zoom.us/wc/join/1234567890'
    );
  });
  it('works for a lettered subdomain (start)', () => {
    assert.equal(
      getRedirectTarget('/s/1234567890', 'hooli.zoom.us', ''),
      'https://hooli.zoom.us/wc/1234567890/start'
    );
  });
  it('preserves search params', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890', 'hooli.zoom.us', '?pwd=abc123XYZ'),
      'https://hooli.zoom.us/wc/join/1234567890?pwd=abc123XYZ'
    );
  });
  it('still returns null for an invalid ID', () => {
    assert.equal(getRedirectTarget('/j/123', 'hooli.zoom.us', ''), null);
  });
});

describe('getRedirectTarget - path structure edge cases', () => {
  it('keeps a leading zero in the ID', () => {
    assert.equal(
      getRedirectTarget('/j/0123456789', 'zoom.us', ''),
      'https://zoom.us/wc/join/0123456789'
    );
  });
  it('ignores a trailing slash after the ID', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890/', 'zoom.us', ''),
      'https://zoom.us/wc/join/1234567890'
    );
  });
  it('ignores extra path segments after the ID', () => {
    assert.equal(
      getRedirectTarget('/j/1234567890/extra', 'zoom.us', ''),
      'https://zoom.us/wc/join/1234567890'
    );
  });
  it('returns null for a doubled leading slash (type segment shifts to empty)', () => {
    assert.equal(getRedirectTarget('//j/1234567890', 'zoom.us', ''), null);
  });
  it('returns null when the ID has an embedded space', () => {
    assert.equal(getRedirectTarget('/j/ 1234567890', 'zoom.us', ''), null);
  });
});

describe('getRedirectTarget - type is case-sensitive', () => {
  it('returns null for uppercase /J/', () => {
    assert.equal(getRedirectTarget('/J/1234567890', 'zoom.us', ''), null);
  });
  it('returns null for uppercase /S/', () => {
    assert.equal(getRedirectTarget('/S/1234567890', 'zoom.us', ''), null);
  });
});

describe('getRedirectTarget - digit matching is ASCII-only', () => {
  it('returns null for full-width Unicode digits', () => {
    assert.equal(getRedirectTarget('/j/１２３４５６７８９０', 'zoom.us', ''), null);
  });
});

describe('getRedirectTarget - invalid ID', () => {
  it('returns null for 8-digit ID (too short)', () => {
    assert.equal(getRedirectTarget('/j/12345678', 'zoom.us', ''), null);
  });
  it('returns null for 9-digit ID (too short)', () => {
    assert.equal(getRedirectTarget('/j/123456789', 'zoom.us', ''), null);
  });
  it('returns null for 12-digit ID (too long)', () => {
    assert.equal(getRedirectTarget('/j/123456789012', 'zoom.us', ''), null);
  });
  it('returns null for alphabetic ID', () => {
    assert.equal(getRedirectTarget('/j/abcdefghi', 'zoom.us', ''), null);
  });
  it('returns null for alphanumeric ID', () => {
    assert.equal(getRedirectTarget('/j/123abc456', 'zoom.us', ''), null);
  });
  it('returns null for ID with hyphens', () => {
    assert.equal(getRedirectTarget('/j/123-456-789', 'zoom.us', ''), null);
  });
  it('returns null for empty ID', () => {
    assert.equal(getRedirectTarget('/j/', 'zoom.us', ''), null);
  });
  it('returns null when ID segment is missing', () => {
    assert.equal(getRedirectTarget('/j', 'zoom.us', ''), null);
  });
});

describe('getRedirectTarget - unknown type', () => {
  it('returns null for unknown type /w/', () => {
    assert.equal(getRedirectTarget('/w/1234567890', 'zoom.us', ''), null);
  });
  it('returns null for /wc/ paths (already on web client)', () => {
    assert.equal(getRedirectTarget('/wc/join/1234567890', 'zoom.us', ''), null);
  });
  it('returns null for root path', () => {
    assert.equal(getRedirectTarget('/', 'zoom.us', ''), null);
  });
  it('returns null for empty path', () => {
    assert.equal(getRedirectTarget('', 'zoom.us', ''), null);
  });
  it('returns null for /profile path', () => {
    assert.equal(getRedirectTarget('/profile', 'zoom.us', ''), null);
  });
});
