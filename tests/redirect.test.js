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
