'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { resolveInstalledToggle } = require('../src/js/background.js');

describe('resolveInstalledToggle - install', () => {
  it('enables on a fresh install regardless of any pre-existing value', () => {
    assert.equal(resolveInstalledToggle('install', undefined), true);
  });
  it('enables on install even if a stale value is somehow already present', () => {
    assert.equal(resolveInstalledToggle('install', false), true);
  });
});

describe('resolveInstalledToggle - update, legacy string migration', () => {
  it('migrates legacy string "true" to boolean true', () => {
    assert.equal(resolveInstalledToggle('update', 'true'), true);
  });
  it('migrates legacy string "false" to boolean false', () => {
    assert.equal(resolveInstalledToggle('update', 'false'), false);
  });
  it('migrates any other legacy string to boolean true', () => {
    assert.equal(resolveInstalledToggle('update', 'yes'), true);
  });
  it('migrates an empty legacy string to boolean true', () => {
    assert.equal(resolveInstalledToggle('update', ''), true);
  });
});

describe('resolveInstalledToggle - update, missing value', () => {
  it('initializes an undefined toggle to true', () => {
    assert.equal(resolveInstalledToggle('update', undefined), true);
  });
});

describe('resolveInstalledToggle - update, already-migrated value', () => {
  it('leaves boolean true untouched (returns null, meaning no write needed)', () => {
    assert.equal(resolveInstalledToggle('update', true), null);
  });
  it('leaves boolean false untouched (returns null, meaning no write needed)', () => {
    assert.equal(resolveInstalledToggle('update', false), null);
  });
  it('takes no action for null (not "string" or "undefined", returns null)', () => {
    assert.equal(resolveInstalledToggle('update', null), null);
  });
  it('takes no action for a number (returns null)', () => {
    assert.equal(resolveInstalledToggle('update', 0), null);
    assert.equal(resolveInstalledToggle('update', 1), null);
  });
});

describe('resolveInstalledToggle - other reasons', () => {
  it('takes no action for "chrome_update" (returns null)', () => {
    assert.equal(resolveInstalledToggle('chrome_update', undefined), null);
  });
  it('takes no action for "shared_module_update" (returns null)', () => {
    assert.equal(resolveInstalledToggle('shared_module_update', undefined), null);
  });
  it('takes no action for an undefined reason (returns null)', () => {
    assert.equal(resolveInstalledToggle(undefined, undefined), null);
  });
  it('takes no action for an empty-string reason (returns null)', () => {
    assert.equal(resolveInstalledToggle('', undefined), null);
  });
});
