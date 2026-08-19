# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [5.1.0](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/v5.1.0) - 2026-08-19

### Added

- Firefox: `data_collection_permissions` declared as `["none"]`, required by Firefox for all new extensions (and eventually all extensions).

### Changed

- Firefox: minimum version raised from 128.0 to 140.0 (142.0 on Android), the versions that added support for `data_collection_permissions`.

### Fixed

- Popup's title is meant to wrap onto two lines (every locale's `popup_title` message already has a line break baked in), but the popup had no width limit and `white-space: nowrap` suppressed it, so the popup just grew wide enough to fit the title on one line instead. The popup is now a fixed, compact width and the title wraps as intended.
- Clicking a footer link (changelog, issue tracker, source code) in the popup opened it in a new tab but didn't stop the popup's own default navigation, so the popup itself would also start navigating to that URL before closing. The click is now prevented before the new tab opens.

## [5.0.1](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/v5.0.1) - 2026-08-16

### Added

- Manifest source split into `src/manifests/base.json`, `chrome.json`, and `firefox.json` (shared permissions/config with per-browser overrides).
- Background script (`background.js`) that initialises the default toggle state on install and migrates legacy string values to booleans on update.
- Meeting ID format validation (10-11 decimal digits, matching [Zoom's documented meeting ID formats](https://developers.zoom.us/docs/api/meetings/)) before performing a redirect.

### Changed

- Upgraded Firefox build from Manifest V2 to Manifest V3.
- Minimum Firefox version raised from 79.0 to 128.0 (required for Manifest V3 support).
- `browser_action` replaced with `action` (MV3 API).
- `chrome.browserAction.setIcon` replaced with `chrome.action.setIcon` (MV3 API).
- Toggle state stored as a boolean instead of the legacy strings `"true"` / `"false"`.
- `toggle.js` and `getManifest.js` merged into a single `popup.js`.
- Content script now runs at `document_start` instead of `document_idle` for faster redirects.
- Redirect uses `window.location.replace()` instead of `window.location.assign()` to prevent a back-navigation loop to the original URL.
- `style.js` FOUC fallback uses `document.createElement` instead of `insertAdjacentHTML`.
- Extension's store description rewritten to describe the actual behaviour (automating Zoom's "Join from your browser" link) instead of the vaguer "redirects meetings to the web client" framing.
- `redirect.js` now checks the URL before touching `chrome.storage`, instead of the other way around: the content script runs on every Zoom page (not just join/start links), so most page loads no longer trigger a storage read at all.

### Removed

- Manifest V2 support.
- `activeTab` permission (was never required for the extension's functionality).

### Fixed

- Firefox: replaced `background.service_worker` with `background.scripts`, since Firefox MV3 does not support `service_worker` and requires `scripts` (array) for the background script declaration.
- `package-lock.json` was gitignored despite `npm ci` requiring it; the lockfile is now committed.
- `package-lock.json` was stale and only listed `archiver`, missing `eslint`, `@eslint/js`, `globals`, and `marked`; `npm ci` would have failed on a clean checkout. Regenerated to match `package.json`.
- Popup's version label (`#addon_version`) never received its intended styling: `style.css` targeted `#addon-version` (hyphen) while the markup used `addon_version` (underscore), so the rule silently never matched.
- Firefox: `zoom.us`/`zoomgov.com` match patterns were declared under `permissions` instead of `host_permissions`, which `addons-linter` rejects for `strict_min_version` 128.0+; moved to `host_permissions` to match the Chrome manifest.
- Redirect sometimes didn't fire on the first navigation to a meeting link in Chrome (only after a manual reload): `chrome.storage.sync` reads have a cold-start latency spike that could lose the race against the page's own script. Switched to `chrome.storage.local`, which doesn't have that round-trip.

## [4.0.0](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/v4.0.0) - 2023-10-03

### Changed

- Extension name due to trademark issue.
