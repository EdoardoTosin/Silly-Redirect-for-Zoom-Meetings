'use strict';

const fs       = require('fs');
const path     = require('path');
const archiver = require('archiver');
const { runMain } = require('./lib/cli.js');

const { build, version, resolveTargets } = require('./build.js');

const DIST_DIR     = path.resolve(__dirname, '..', 'dist');
const PROJECT_NAME = 'silly-redirect-for-zoom-meetings';

function zipDir(sourceDir, destFile) {
  return new Promise((resolve, reject) => {
    const output  = fs.createWriteStream(destFile);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', resolve);
    archive.on('error', reject);

    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
  });
}

async function pack(browser) {
  build(browser);

  const sourceDir = path.join(DIST_DIR, browser);
  const destFile  = path.join(DIST_DIR, `${PROJECT_NAME}-${version}-${browser}.zip`);

  await zipDir(sourceDir, destFile);
  console.log(`✓ Packed ${browser} → dist/${path.basename(destFile)}`);
}

function main() {
  const targets = resolveTargets(process.argv);
  return Promise.all(targets.map(pack));
}

if (require.main === module) {
  runMain(main);
}
