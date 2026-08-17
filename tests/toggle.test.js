'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { isEnabled } = require('../src/js/toggle.js');

describe('isEnabled', () => {
  it('returns true when toggle is undefined (default on)', () => {
    assert.equal(isEnabled(undefined), true);
  });

  it('returns true for boolean true', () => {
    assert.equal(isEnabled(true), true);
  });
  it('returns false for boolean false', () => {
    assert.equal(isEnabled(false), false);
  });

  it('returns true for legacy string "true"', () => {
    assert.equal(isEnabled('true'), true);
  });
  it('returns false for legacy string "false"', () => {
    assert.equal(isEnabled('false'), false);
  });

  it('returns false for null', () => {
    assert.equal(isEnabled(null), false);
  });
  it('returns false for 0', () => {
    assert.equal(isEnabled(0), false);
  });
  it('returns false for 1', () => {
    assert.equal(isEnabled(1), false);
  });
  it('returns false for empty string', () => {
    assert.equal(isEnabled(''), false);
  });
  it('returns false for arbitrary string', () => {
    assert.equal(isEnabled('yes'), false);
  });

  it('returns false for NaN', () => {
    assert.equal(isEnabled(NaN), false);
  });
  it('returns false for an array', () => {
    assert.equal(isEnabled([]), false);
  });
  it('returns false for a plain object', () => {
    assert.equal(isEnabled({}), false);
  });
  it('is case-sensitive: "TRUE" is not "true"', () => {
    assert.equal(isEnabled('TRUE'), false);
  });
  it('does not trim whitespace: " true" is not "true"', () => {
    assert.equal(isEnabled(' true'), false);
  });
});
