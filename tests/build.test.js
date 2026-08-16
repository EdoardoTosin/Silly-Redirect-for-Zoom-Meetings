'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { deepMerge } = require('../scripts/build.js');

describe('deepMerge', () => {
  it('overrides a scalar value', () => {
    assert.deepEqual(deepMerge({ a: 1 }, { a: 2 }), { a: 2 });
  });
  it('keeps base key when override does not include it', () => {
    assert.deepEqual(deepMerge({ a: 1, b: 2 }, { a: 3 }), { a: 3, b: 2 });
  });
  it('adds new key from override', () => {
    assert.deepEqual(deepMerge({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
  });

  it('concatenates arrays', () => {
    assert.deepEqual(
      deepMerge({ a: [1, 2] }, { a: [3, 4] }),
      { a: [1, 2, 3, 4] }
    );
  });
  it('concatenates permission arrays (core use-case)', () => {
    assert.deepEqual(
      deepMerge({ permissions: ['storage'] }, { permissions: ['*://*.zoom.us/*'] }),
      { permissions: ['storage', '*://*.zoom.us/*'] }
    );
  });
  it('does not mutate the base array', () => {
    const base = { a: [1] };
    deepMerge(base, { a: [2] });
    assert.deepEqual(base.a, [1]);
  });

  it('deep-merges nested objects', () => {
    assert.deepEqual(
      deepMerge({ a: { x: 1, y: 2 } }, { a: { y: 9, z: 3 } }),
      { a: { x: 1, y: 9, z: 3 } }
    );
  });
  it('does not mutate the base object', () => {
    const base = { a: { x: 1 } };
    deepMerge(base, { a: { x: 2 } });
    assert.equal(base.a.x, 1);
  });
  it('override scalar replaces base object', () => {
    assert.deepEqual(deepMerge({ a: { x: 1 } }, { a: 'flat' }), { a: 'flat' });
  });
  it('override object replaces base scalar', () => {
    assert.deepEqual(deepMerge({ a: 'flat' }, { a: { x: 1 } }), { a: { x: 1 } });
  });
  it('override array replaces base object', () => {
    assert.deepEqual(deepMerge({ a: { x: 1 } }, { a: [1, 2] }), { a: [1, 2] });
  });

  it('override null replaces base value', () => {
    assert.deepEqual(deepMerge({ a: 1 }, { a: null }), { a: null });
  });
  it('base null is replaced by override object', () => {
    assert.deepEqual(deepMerge({ a: null }, { a: { x: 1 } }), { a: { x: 1 } });
  });

  it('returns base unchanged when override is empty', () => {
    assert.deepEqual(deepMerge({ a: 1 }, {}), { a: 1 });
  });
  it('returns override when base is empty', () => {
    assert.deepEqual(deepMerge({}, { a: 1 }), { a: 1 });
  });
  it('returns empty object when both are empty', () => {
    assert.deepEqual(deepMerge({}, {}), {});
  });

  it('produces a correct chrome-style merged manifest', () => {
    const base = {
      manifest_version: 3,
      permissions: ['storage'],
      action: { default_title: 'Test' },
    };
    const chrome = {
      host_permissions: ['*://*.zoom.us/*'],
      background: { service_worker: 'js/background.js' },
    };
    const result = deepMerge(base, chrome);
    assert.equal(result.manifest_version, 3);
    assert.deepEqual(result.permissions, ['storage']);
    assert.deepEqual(result.host_permissions, ['*://*.zoom.us/*']);
    assert.equal(result.background.service_worker, 'js/background.js');
    assert.equal(result.action.default_title, 'Test');
  });

  it('produces a correct firefox-style merged manifest', () => {
    const base = {
      manifest_version: 3,
      permissions: ['storage'],
    };
    const firefox = {
      permissions: ['*://*.zoom.us/*'],
      background: { scripts: ['js/background.js'] },
      browser_specific_settings: { gecko: { id: '{abc}', strict_min_version: '128.0' } },
    };
    const result = deepMerge(base, firefox);
    assert.deepEqual(result.permissions, ['storage', '*://*.zoom.us/*']);
    assert.deepEqual(result.background.scripts, ['js/background.js']);
    assert.equal(result.background.service_worker, undefined);
    assert.equal(result.browser_specific_settings.gecko.strict_min_version, '128.0');
  });
});
