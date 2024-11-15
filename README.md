<h1 align="center">
  <sub>
    <img src="https://raw.githubusercontent.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/main/src/icons/256x256.png" height="38" width="38">
  </sub>
  Silly Redirect for Zoom Meetings
</h1>

<p align="center">
  <a href="https://addons.mozilla.org/firefox/addon/silly-redirect-for-zoom">
    <img src="https://blog.mozilla.org/addons/files/2020/04/get-the-addon-fx-apr-2020.svg" alt="Get Silly Redirect for Zoom Meetings for Firefox" height=80px></a>
  <a href="https://chrome.google.com/webstore/detail/dammgkhaofolinipgnjjiocadmmhidch">
    <img src="https://storage.googleapis.com/web-dev-uploads/image/WlD8wC6g8khYWPJUsQceQkhXSlv1/HRs9MPufa1J1h5glNhut.png" alt="Get Silly Redirect for Zoom Meetings for Chromium" height=80px></a>
  <a href="https://microsoftedge.microsoft.com/addons/detail/kfpmepjfaolgcgabdmbpkfnicejbiggn">
    <img src="https://developer.microsoft.com/en-us/microsoft-store/badges/images/English_get-it-from-MS.png" alt="Get Silly Redirect for Zoom Meetings for Microsoft Edge" height=80px></a>
</p>

<p align="center">
  <img alt="Firefox users" src="https://img.shields.io/amo/users/silly-redirect-for-zoom?label=Firefox%20Users&style=for-the-badge&logo=firefox"/>
  <img alt="Chrome Web Store" src="https://img.shields.io/chrome-web-store/users/dammgkhaofolinipgnjjiocadmmhidch?color=007ec6&label=Chrome%20Users&logo=google-chrome&style=for-the-badge">
  <img alt="Edge users" src="https://img.shields.io/badge/dynamic/json?label=Edge%20Users&style=for-the-badge&logo=microsoft-edge&query=activeInstallCount&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fkfpmepjfaolgcgabdmbpkfnicejbiggn">
</p>
<p align="center">
  <img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings?label=Latest%20Release&style=for-the-badge">
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings?style=for-the-badge"/>
  <img alt="GitHub all releases" src="https://img.shields.io/github/downloads/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/total?style=for-the-badge"/>
</p>

## Summary

A web extension that redirects zoom meetings to the web client version.

## Description

"Silly Redirect for Zoom Meetings" is a web extension designed to simplify the process of redirecting Zoom meeting links to the web client version. By replacing a portion of the URL with */wc/join/*, the extension automatically loads the meeting joining page in the web client. For instance, a link like `https://zoom.us/j/0123456789` would be converted to `https://zoom.us/wc/join/0123456789`.
This approach is aimed at leveraging the security features of web browsers and providing a seamless experience for joining Zoom meetings via the web browser. The extension also offers a toggle for easy enable/disable functionality and does not collect any user data, ensuring privacy and security.

## Features

### Extension toggle

When opening the dashboard there is a toggle to enable/disable the extension to better control the behaviour whenever wanted.

### Dark mode

According to system settings the extension's dashboard has the corresponding theme.

## Installation

<table>
    <thead align="center">
        <tr>
            <th>Mozilla Firefox Add-on</th>
            <th>Chrome (and<br>Chromium<br>based browsers)*</th>
            <th>Microsoft Edge*</th>
        </tr>
    </thead>
    <tbody align="center">
        <tr>
          <td><a href="https://addons.mozilla.org/firefox/addon/silly-redirect-for-zoom">
         <img alt="Mozilla Firefox" src="https://img.shields.io/amo/v/silly-redirect-for-zoom?label=firefox&logo=Firefox&style=for-the-badge"></a></td>
          <td><a href="https://chrome.google.com/webstore/detail/dammgkhaofolinipgnjjiocadmmhidch">
          <img alt="Chrome" src="https://img.shields.io/chrome-web-store/v/dammgkhaofolinipgnjjiocadmmhidch?label=chrome&logo=google-chrome&style=for-the-badge"></a></td>
          <td><a href="https://microsoftedge.microsoft.com/addons/detail/kfpmepjfaolgcgabdmbpkfnicejbiggn">
       <img alt="Microsoft Edge" src="https://img.shields.io/badge/dynamic/json?label=Edge%09%09&logo=microsoft-edge&style=for-the-badge&prefix=v&query=%24.version&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2Fkfpmepjfaolgcgabdmbpkfnicejbiggn"></a></td>
        </tr>
    </tbody>
</table>

\* Addon is based on branch [manifest-v3](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/manifest-v3)

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
          <td><img alt="Toggle Off - Light Mode" src="https://raw.githubusercontent.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/main/assets/dashboard/off-light.png"></td>
          <td><img alt="Toggle On - Light Mode" src="https://raw.githubusercontent.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/main/assets/dashboard/on-light.png"></td>
          <td><img alt="Toggle Off - Dark Mode" src="https://raw.githubusercontent.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/main/assets/dashboard/off-dark.png"></td>
          <td><img alt="Toggle On - Dark Mode" src="https://raw.githubusercontent.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/main/assets/dashboard/on-dark.png"></td>
        </tr>
    </tbody>
</table>

## Redirect example

![Gif](https://raw.githubusercontent.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/main/assets/example/redirect_clip.gif)

## Privacy policy

Silly Redirect for Zoom Meetings does **NOT** collect any data of any kind.

## Permissions

**Manifest V2** ([main](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/main) branch)

https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/blob/452ad56b6cab7e37dc38be18c635ca0d93dd1341/src/manifest.json#L17-L22

**Manifest V3** ([manifest-v3](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/manifest-v3) branch)

https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/blob/a4549aef606ce1278f129e1e062d4e0b9178d6b7/src/manifest.json#L17-L20

https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/blob/a4549aef606ce1278f129e1e062d4e0b9178d6b7/src/manifest.json#L66-L69

| Permission | Purpose |
|:----:|:----:|
| `activeTab` | Used to open hyperlinks in the dashboard |
| `storage` | Used to store the status of the slide checkbox |
| `*://*.zoom.us/*` and `*://*.zoomgov.com/*` | Used to run the extension only when a page matches one of these URLs |

## Translation

If you'd like to contribute translations for this project, please refer to the [Translation Guide](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/blob/main/TRANSLATION.md).

## Changelog

For more details see the [CHANGELOG](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/main/CHANGELOG.md) file.

## Release History

See the [releases pages](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/releases) for a history of releases and highlights for each release.

## Security Policy

For more details see the [SECURITY](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/blob/main/SECURITY.md) file.

## Contributing

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg?style=for-the-badge)](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/main/CODE_OF_CONDUCT.md)  
When contributing to this repository, please first discuss the change you wish to make via issue, discussion, or any other method with the owner of this repository before making a change.

**Read carefully the [contributing guidelines](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/main/CONTRIBUTING.md).**

## License

This software is released under the terms of the GNU General Public License v3.0. See the [LICENSE](https://github.com/EdoardoTosin/Silly-Redirect-for-Zoom-Meetings/tree/main/LICENSE) file for further information.
