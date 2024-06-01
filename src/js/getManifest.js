// Get manifest details
const { homepage_url: homePage_URL, version, author } = chrome.runtime.getManifest();
const addonVersion = `v${version}`;
const changelog_URL = `${homePage_URL}/blob/main/CHANGELOG.md`;
const issue_tracker_URL = `${homePage_URL}/issues`;

// Load _locales and manifest data into popup.html when opened
function loadPopup() {
    // Helper function to set properties
    const setProperty = (selector, prop, value) => {
        const element = document.querySelector(selector);
        if (element) element[prop] = value;
    };

    // Helper function to set localized properties
    const setLocaleProperty = (selector, prop, msg) => {
        setProperty(selector, prop, chrome.i18n.getMessage(msg));
    };

    // Set head title
    setLocaleProperty('title', 'innerText', 'name');

    // Set meta tags
    setProperty("meta[name='author']", 'content', author);
    setLocaleProperty("meta[name='description']", 'content', 'description');

    // Set elements
    const elements = [
        { selector: '#title', prop: 'innerText', msg: 'popup_title' },
        { selector: '#changelog', prop: 'innerText', msg: 'popup_changelog' },
        { selector: '#changelog', prop: 'href', value: changelog_URL },
        { selector: '#changelog', prop: 'title', value: changelog_URL },
        { selector: '#issue_tracker', prop: 'innerText', msg: 'popup_issue_tracker' },
        { selector: '#issue_tracker', prop: 'href', value: issue_tracker_URL },
        { selector: '#issue_tracker', prop: 'title', value: issue_tracker_URL },
        { selector: '#source_code', prop: 'innerText', msg: 'popup_source_code' },
        { selector: '#source_code', prop: 'href', value: homePage_URL },
        { selector: '#source_code', prop: 'title', value: homePage_URL },
        { selector: '#addon_version', prop: 'title', msg: 'popup_addon_version' },
        { selector: '#addon_version', prop: 'innerText', value: addonVersion }
    ];

    elements.forEach(({ selector, prop, msg, value }) => {
        if (msg) {
            setLocaleProperty(selector, prop, msg);
        } else {
            setProperty(selector, prop, value);
        }
    });
}

document.addEventListener("DOMContentLoaded", loadPopup);

// Open clickable links in a new tab
window.addEventListener("click", (e) => {
    if (e.target.href) {
        chrome.tabs.create({ url: e.target.href });
        window.close();
    }
});
