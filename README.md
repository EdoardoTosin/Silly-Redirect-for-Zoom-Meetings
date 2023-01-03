<h1 align="center">
  <sub>
    <img src="https://raw.githubusercontent.com/EdoardoTosin/ZooMeeting-Redirector/main/src/icons/256x256.png" height="38" width="38">
  </sub>
  ZooMeeting Redirector
</h1>

<p align="center">
  <a href="https://addons.mozilla.org/firefox/addon/zoomeeting-redirector">
    <img src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" alt="Get ZooMeeting Redirector for Firefox" height=80px></a>
  <!--a href="https://chrome.google.com/webstore/detail/zoom-web-client-redirecto/ommndciompclncigoffdnipifnfnaclj">
    <img src="https://storage.googleapis.com/chrome-gcs-uploader.appspot.com/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/HRs9MPufa1J1h5glNhut.png" alt="Get ZooMeeting Redirector for Chromium" height=80px></a-->
  <a href="https://microsoftedge.microsoft.com/addons/detail/kfpmepjfaolgcgabdmbpkfnicejbiggn">
    <img src="https://developer.microsoft.com/en-us/microsoft-store/badges/images/English_get-it-from-MS.png" alt="Get ZooMeeting Redirector for Microsoft Edge" height=80px></a>
</p>

<p align="center">
  <img alt="Firefox users" src="https://img.shields.io/amo/users/zoomeeting-redirector?label=Firefox%20Users&style=for-the-badge&logo=firefox"/>
  <!--img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/users/ommndciompclncigoffdnipifnfnaclj?color=007ec6&label=Chrome%20Users&logo=google-chrome&style=for-the-badge"-->
  <img alt="Edge users" src="https://img.shields.io/badge/dynamic/json?label=Edge%20Users&style=for-the-badge&logo=microsoft-edge&query=activeInstallCount&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fkfpmepjfaolgcgabdmbpkfnicejbiggn">
</p>
<p align="center">
  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/EdoardoTosin/ZooMeeting-Redirector?label=Latest%20Release&style=for-the-badge">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/EdoardoTosin/ZooMeeting-Redirector?style=for-the-badge"/>
  <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/EdoardoTosin/ZooMeeting-Redirector/total?style=for-the-badge"/>
</p>

## Table of contents

* [Summary](#summary)
* [Description](#description)
* [Features](#features)
  * [Dark mode](#dark-mode)
  * [Extension toggle](#extension-toggle)
* [Installation](#installation)
* [Dashboard](#dashboard)
* [Redirect example](#redirect-example)
* [Privacy policy](#privacy-policy)
* [Permissions](#permissions)
* [Translation](#translation)
* [Changelog](#changelog)
* [Release History](#release-history)
* [Security Policy](#security-policy)
* [Contributing](#contributing)
* [License](#license)

## Summary

A web extension that redirects zoom meetings to the web client version.

## Description

This project was intended to make it easier to redirect Zoom meetings links to the web client page.  
This browser addon works by replacing a portion of the url with `*/wc/join/*` so that it loads the meeting joining page. For example `https://zoom.us/j/0123456789` would be converted to `https://zoom.us/wc/join/0123456789`.  
The web client is preferable over the desktop app because of the restriction that web browsers places on web pages, protecting your computer against malicious attacks and unauthorized access of your machine.  
For more information about best practices for securing your Zoom meetings read this blog post: [10 tips for Zoom security and privacy](https://www.kaspersky.com/blog/zoom-security-ten-tips/34729).

## Features

### Extension toggle

When opening the dashboard there is a toggle to enable/disable the extension to better control the behaviour whenever wanted.

### Dark mode

According to system settings the extension's dashboard has the corresponding background.

## Installation

<table>
    <thead align="center">
        <tr>
            <th>Mozilla Firefox Add-on</th>
            <th>Chromium*</th>
            <th>Microsoft Edge**</th>
        </tr>
    </thead>
    <tbody align="center">
        <tr>
          <td><a href="https://addons.mozilla.org/firefox/addon/zoomeeting-redirector">
         <img alt="Mozilla Firefox" src="https://img.shields.io/amo/v/zoomeeting-redirector?label=firefox&logo=Firefox&style=for-the-badge"></a></td>
          <td><a href="https://github.com/EdoardoTosin/ZooMeeting-Redirector/releases" href_x="https://chrome.google.com/webstore/detail/zoom-web-client-redirecto/ommndciompclncigoffdnipifnfnaclj">
          <img alt_x="Chromium" src_x="https://img.shields.io/chrome-web-store/v/ommndciompclncigoffdnipifnfnaclj?label=chrome&logo=google-chrome&style=for-the-badge">Only available here</a></td>
          <td><a href="https://microsoftedge.microsoft.com/addons/detail/kfpmepjfaolgcgabdmbpkfnicejbiggn">
       <img alt="Microsoft Edge" src="https://img.shields.io/badge/dynamic/json?label=Edge%09%09&logo=microsoft-edge&style=for-the-badge&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fkfpmepjfaolgcgabdmbpkfnicejbiggn"></a></td>
        </tr>
    </tbody>
</table>

\* Only compatible with Chromium-based browsers that support Manifest V2.

\*\* Manifest V2 addons cannot be published anymore. Lastest published version is currently 3.1.0.

## Dashboard

<table>
    <thead align="center">
        <tr>
            <th colspan=2>Light Mode</th>
            <th colspan=2>Dark Mode</th>
        </tr>
    </thead>
    <tbody align="center">
        <tr>
            <td>Toggle Off</td>
            <td>Toggle On<br>(Default)</td>
            <td>Toggle Off</td>
            <td>Toggle On<br>(Default)</td>
        </tr>
        <tr>
          <td><img alt="Toggle Off - Light Mode" src="https://raw.githubusercontent.com/EdoardoTosin/ZooMeeting-Redirector/main/assets/dashboard/off-light.png"></td>
          <td><img alt="Toggle On - Light Mode" src="https://raw.githubusercontent.com/EdoardoTosin/ZooMeeting-Redirector/main/assets/dashboard/on-light.png"></td>
          <td><img alt="Toggle Off - Dark Mode" src="https://raw.githubusercontent.com/EdoardoTosin/ZooMeeting-Redirector/main/assets/dashboard/off-dark.png"></td>
          <td><img alt="Toggle On - Dark Mode" src="https://raw.githubusercontent.com/EdoardoTosin/ZooMeeting-Redirector/main/assets/dashboard/on-dark.png"></td>
        </tr>
    </tbody>
</table>

## Redirect example

![Gif](https://raw.githubusercontent.com/EdoardoTosin/ZooMeeting-Redirector/main/assets/example/redirect_clip.gif)

## Privacy policy

ZooMeeting Redirector does **NOT** collect any data of any kind.

## Permissions

``` json
"permissions": [
  "activeTab",
  "storage",
  "*://*.zoom.us/*",
  "*://*.zoomgov.com/*"
],
```

- ``activeTab`` is necessary to be able to open hyperlinks in the dashboard.
- ``storage`` is used to store the status of the slide checkbox.  
- ``*://*.zoom.us/*`` and ``*://*.zoomgov.com/*`` are necessary to get the url and modify it to redirect to the web client page.

## Translation

Locales are hosted using [Crowdin](https://crowdin.com) to help the process of translation. To translate it, please follow these steps:
* Sign up on [Crowdin](https://accounts.crowdin.com/register) and Join the project [here](https://crowdin.com/project/zoomeeting-redirector).
* Make sure your locale exists there, if it does not exist, open an issue [here](https://github.com/EdoardoTosin/ZooMeeting-Redirector/issues) on Github and I'll add the language option.
* Get familiar with the Crowdin translation UI, as you will need to use it to translate JSON files.

For translation progress details see the [TRANSLATION](https://github.com/EdoardoTosin/ZooMeeting-Redirector/blob/main/TRANSLATION.md) file.

## Changelog

For more details see the [CHANGELOG](https://github.com/EdoardoTosin/ZooMeeting-Redirector/tree/main/CHANGELOG.md) file.

## Release History

See the [releases pages](https://github.com/EdoardoTosin/ZooMeeting-Redirector/releases) for a history of releases and highlights for each release.

## Security Policy

For more details see the [SECURITY](https://github.com/EdoardoTosin/ZooMeeting-Redirector/blob/main/SECURITY.md) file.

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg?style=for-the-badge)](https://github.com/EdoardoTosin/ZooMeeting-Redirector/tree/main/CODE_OF_CONDUCT.md)  
When contributing to this repository, please first discuss the change you wish to make via issue, discussion, or any other method with the owner of this repository before making a change.

**Read carefully the [contributing guidelines](https://github.com/EdoardoTosin/ZooMeeting-Redirector/tree/main/CONTRIBUTING.md).**

## License

This software is released under the terms of the GNU General Public License v3.0. See the [LICENSE](https://github.com/EdoardoTosin/ZooMeeting-Redirector/tree/main/LICENSE) file for further information.
