'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { handleFooterLinkClick } = require('../src/js/popup.js');

describe('handleFooterLinkClick', () => {
  it('does nothing when the click target has no href', () => {
    let prevented = false;
    let opened = null;
    let closed = false;

    const handled = handleFooterLinkClick(
      {},
      {
        preventDefault: () => { prevented = true; },
        openTab: (url) => { opened = url; },
        closeWindow: () => { closed = true; },
      }
    );

    assert.equal(handled, false);
    assert.equal(prevented, false);
    assert.equal(opened, null);
    assert.equal(closed, false);
  });

  it('prevents the default navigation before opening the link in a new tab', () => {
    const calls = [];

    const handled = handleFooterLinkClick(
      { href: 'https://example.com/changelog' },
      {
        preventDefault: () => calls.push('preventDefault'),
        openTab: (url) => calls.push(`openTab:${url}`),
        closeWindow: () => calls.push('closeWindow'),
      }
    );

    assert.equal(handled, true);
    assert.deepEqual(calls, [
      'preventDefault',
      'openTab:https://example.com/changelog',
      'closeWindow',
    ]);
  });

  it('does nothing when the click target itself is null', () => {
    let called = false;

    const handled = handleFooterLinkClick(null, {
      preventDefault: () => { called = true; },
      openTab: () => { called = true; },
      closeWindow: () => { called = true; },
    });

    assert.equal(handled, false);
    assert.equal(called, false);
  });

  it('does nothing when href is an empty string', () => {
    let called = false;

    const handled = handleFooterLinkClick(
      { href: '' },
      {
        preventDefault: () => { called = true; },
        openTab: () => { called = true; },
        closeWindow: () => { called = true; },
      }
    );

    assert.equal(handled, false);
    assert.equal(called, false);
  });
});
