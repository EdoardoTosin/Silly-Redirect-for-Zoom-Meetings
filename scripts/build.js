'use strict';

const fs   = require('fs');
const path = require('path');
const { readJSON, runMain } = require('./lib/cli.js');

const BROWSERS     = ['chrome', 'firefox'];
const ROOT_DIR     = path.resolve(__dirname, '..');
const SRC_DIR      = path.join(ROOT_DIR, 'src');
const DIST_DIR     = path.join(ROOT_DIR, 'dist');
const MANIFEST_DIR = path.join(SRC_DIR, 'manifests');

const { version } = readJSON(path.join(ROOT_DIR, 'package.json'));

function deepMerge(base, override) {
  const result = Object.assign({}, base);

  for (const [key, value] of Object.entries(override)) {
    const baseValue = result[key];

    if (Array.isArray(value) && Array.isArray(baseValue)) {
      result[key] = [...baseValue, ...value];
    } else if (
      value !== null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      baseValue !== null &&
      typeof baseValue === 'object' &&
      !Array.isArray(baseValue)
    ) {
      result[key] = deepMerge(baseValue, value);
    } else {
      result[key] = value;
    }
  }

  return result;
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath  = path.join(src,  entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function build(browser) {
  const destDir = path.join(DIST_DIR, browser);

  if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
  }
  fs.mkdirSync(destDir, { recursive: true });

  const baseManifest    = readJSON(path.join(MANIFEST_DIR, 'base.json'));
  const browserManifest = readJSON(path.join(MANIFEST_DIR, `${browser}.json`));
  const merged          = deepMerge(baseManifest, browserManifest);

  merged.version = version;

  fs.writeFileSync(
    path.join(destDir, 'manifest.json'),
    JSON.stringify(merged, null, '\t'),
    'utf8'
  );

  for (const dir of ['icons', 'css', 'html', '_locales']) {
    const srcPath = path.join(SRC_DIR, dir);
    if (fs.existsSync(srcPath)) {
      copyDirSync(srcPath, path.join(destDir, dir));
    }
  }

  copyDirSync(path.join(SRC_DIR, 'js'), path.join(destDir, 'js'));

  console.log(`✓ Built ${browser} → dist/${browser}/`);
}

function resolveTargets(argv) {
  const target = argv[2];

  if (target !== undefined && !BROWSERS.includes(target)) {
    throw new Error(`Unknown browser target "${target}". Valid targets: ${BROWSERS.join(', ')}`);
  }

  return target ? [target] : BROWSERS;
}

function main() {
  for (const browser of resolveTargets(process.argv)) {
    build(browser);
  }
}

module.exports = { build, BROWSERS, version, deepMerge, resolveTargets };

if (require.main === module) {
  runMain(main);
}
