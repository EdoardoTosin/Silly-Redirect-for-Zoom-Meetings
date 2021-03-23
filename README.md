<h1 align="center">
<sub>
<img src="src/icons/48x48.png" vertical-align="bottom" width="32" height="32" alt="image">
</sub>
Zoom Web Client Redirector
<br><br>
<sup>
  <a href="https://addons.mozilla.org/firefox/addon/zoom-web-client-redirector" rel="nofollow">
    <img src="docs/firefox-widget.png" vertical-align="center" height="72" alt="image"></a>
  <a href=undefined rel="nofollow">
    <img src="docs/chrome-widget.png" vertical-align="center" height="72" alt="image"></a>
  <a href=undefined rel="nofollow">
    <img src="docs/edge-widget.png" vertical-align="center" height="72" alt="image"></a>
</sup>
</h1>

## Table of contents

* [Summary](#summary)
* [Description](#description)
* [Installation](#installation)
* [Dashboard](#dashboard)
* [Screen example](#screen-example)
* [Privacy policy](#privacy-policy)
* [Permissions](#permissions)
* [Release History](#release-history)
* [License](#license)

## Summary

A web extension that redirects zoom meetings to the web client version.

## Description

This project was intended to make it easier to redirect Zoom meetings links to the web client page.  
This browser addon works by replacing a portion of the url with `*/wc/join/*` so that it loads the meeting joining page. For example `https://zoom.us/j/0123456789` would be converted to `https://zoom.us/wc/join/0123456789`.  
The web client is preferable over the desktop app because of the restriction that web browsers places on web pages, protecting your computer against malicious attacks and unauthorized access of your machine.  
For more information about best practices for securing your Zoom meetings read this blog post: [10 tips for Zoom security and privacy](https://www.kaspersky.com/blog/zoom-security-ten-tips/34729).

## Installation

<dl>
  <dd><a href="https://addons.mozilla.org/firefox/addon/zoom-web-client-redirector" rel="nofollow">
    <img src="docs/firefox.png" align="bottom" width="12" height="12" alt="image">  Mozilla Firefox</dd></a>
  <dd><a href="undefined" rel="nofollow">
    <img src="docs/chrome.png" align="bottom" width="12" height="12" alt="image"> Google Chrome (in review phase)</dd></a>
  <dd><a href="undefined" rel="nofollow">
    <img src="docs/edge.png" align="bottom" width="12" height="12" alt="image"> Microsoft Edge (in review phase)</dd></a>
</dl>

## Dashboard

<p align="center">
  <img src="docs/popup.jpg" align="center" alt="image">
</p>

## Screen example

<p align="center">
  <a><img src="docs/screen.jpg" align="center" alt="image">
</p>

## Privacy policy

Zoom Web Client Redirector does **NOT** collect any data of any kind.

## Permissions

```
"permissions": [
  "storage",
  "*://*.zoom.us/*",
  "*://*.zoomgov.us/*"
],
```

- ``storage`` is used to save locally the state of the button placed in the popup user interface.  
- ``*://*.zoom.us/*`` and ``*://*.zoomgov.us/*`` are necessary to get the url and modify it to redirect to the web client page.

## Release History

See the [releases pages](https://github.com/EdoardoTosin/Zoom-Web-Client-Redirector/releases) for a history of releases and highlights for each release.

## License

This software is released under the terms of the GPL-3.0 License. See the [LICENSE](https://raw.githubusercontent.com/EdoardoTosin/Zoom-Web-Client-Redirector/main/LICENSE) file for further information.
