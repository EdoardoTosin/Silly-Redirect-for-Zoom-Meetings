const manifest = chrome.runtime.getManifest();
const homePage_URL = manifest.homepage_url;
const addonVersion = "v" + manifest.version;
const author = manifest.author;
const changelog_URL = homePage_URL + "/blob/main/CHANGELOG.md";
const issue_tracker_URL = homePage_URL + "/issues";

// Load _locales and manifest data into popup.html when opened.
function loadPopup() {
    function setLocaleProperty(element, prop, msg) {
        element[prop] = chrome.i18n.getMessage(msg);
    }

    function setProperty(element, prop, msg) {
        element[prop] = msg;
    }

    let elements = {
        title: document.querySelector('title'),
        authorMeta: document.querySelector("meta[name='author']"),
        descriptionMeta: document.querySelector("meta[name='description']"),
        titleElement: document.querySelector('#title'),
        changelog: document.querySelector('#changelog'),
        issueTracker: document.querySelector('#issue_tracker'),
        sourceCode: document.querySelector('#source_code'),
        addonVersion: document.querySelector('#addon_version')
    };

    // Set head title
    setLocaleProperty(elements.title, 'innerText', 'name');

    // Set meta tags
    setProperty(elements.authorMeta, 'content', author);
    setLocaleProperty(elements.descriptionMeta, 'content', 'description');

    // Set title element
    setLocaleProperty(elements.titleElement, 'innerText', 'popup_title');

    // Set changelog element
    setLocaleProperty(elements.changelog, 'innerText', 'popup_changelog');
    setProperty(elements.changelog, 'href', changelog_URL);
    setProperty(elements.changelog, 'title', changelog_URL);

    // Set issue_tracker element
    setLocaleProperty(elements.issueTracker, 'innerText', 'popup_issue_tracker');
    setProperty(elements.issueTracker, 'href', issue_tracker_URL);
    setProperty(elements.issueTracker, 'title', issue_tracker_URL);

    // Set source_code element
    setLocaleProperty(elements.sourceCode, 'innerText', 'popup_source_code');
    setProperty(elements.sourceCode, 'href', homePage_URL);
    setProperty(elements.sourceCode, 'title', homePage_URL);

    // Set addon_version element
    setLocaleProperty(elements.addonVersion, 'title', 'popup_addon_version');
    setProperty(elements.addonVersion, 'innerText', addonVersion);
}

document.addEventListener("DOMContentLoaded", loadPopup);

// Open clickable links
window.addEventListener("click", function(e) {
    if (e.target.href !== undefined) {
        chrome.tabs.create({
            url: e.target.href
        });
        window.close();
    }
});