'use strict';

function isEnabled(toggle) {
  return toggle === undefined || toggle === true || toggle === 'true';
}

if (typeof module !== 'undefined') {
  module.exports = { isEnabled };
}
