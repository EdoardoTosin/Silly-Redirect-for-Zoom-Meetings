'use strict';

const fs = require('fs');

function readJSON(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    throw new Error(`Failed to read JSON from "${filePath}": ${err.message}`, { cause: err });
  }
}

function fail(err) {
  console.error(err.message);
  if (err.cause) console.error(`Caused by: ${err.cause.message}`);
  process.exit(1);
}

// Runs `main` (sync or async) and routes any throw/rejection through the same clean fail() path.
function runMain(main) {
  Promise.resolve().then(main).catch(fail);
}

module.exports = { readJSON, fail, runMain };
