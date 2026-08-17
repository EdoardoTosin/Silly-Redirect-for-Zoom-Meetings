'use strict';

const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { needsColorSchemeFallback } = require('../src/js/style.js');

describe('needsColorSchemeFallback', () => {
  it('returns true when the browser reports the query as unsupported', () => {
    assert.equal(needsColorSchemeFallback('not all'), true);
  });
  it('returns false when the browser supports the media query', () => {
    assert.equal(needsColorSchemeFallback('all'), false);
  });
  it('returns false for an empty media string', () => {
    assert.equal(needsColorSchemeFallback(''), false);
  });
  it('returns false for an unrelated media type', () => {
    assert.equal(needsColorSchemeFallback('screen'), false);
  });
  it('returns false for undefined', () => {
    assert.equal(needsColorSchemeFallback(undefined), false);
  });
  it('is case-sensitive: "Not All" is not "not all"', () => {
    assert.equal(needsColorSchemeFallback('Not All'), false);
  });
  it('does not trim whitespace: " not all " is not "not all"', () => {
    assert.equal(needsColorSchemeFallback(' not all '), false);
  });
});
