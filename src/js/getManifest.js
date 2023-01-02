const homePage_URL = chrome.runtime.getManifest().homepage_url;
const addonVersion = "v" + chrome.runtime.getManifest().version;
const author = chrome.runtime.getManifest().author;
const changelog_URL = homePage_URL + "/blob/main/CHANGELOG.md";
const issue_tracker_URL = homePage_URL + "/issues";

// Load _locales and manifest data into popup.html when opened.
function loadPopup() {
	
	function setLocaleProperty(selector, prop, msg) {
		document.querySelector(selector)[prop] = chrome.i18n.getMessage(msg);
	}
	
	function setProperty(selector, prop, msg) {
		document.querySelector(selector)[prop] = msg;
	}
	
	// Set head title
	setLocaleProperty('title', 'innerText', 'name');
	
	// Set meta tags
	setProperty("meta[name='author']", 'content', author);
	setLocaleProperty("meta[name='description']", 'content', 'description');
	
	// Set title element
	setLocaleProperty('#title', 'innerText', 'popup_title');
	
	// Set changelog element
	setLocaleProperty('#changelog', 'innerText', 'popup_changelog');
	setProperty('#changelog', 'href', changelog_URL);
	setProperty('#changelog', 'title', changelog_URL);
	
	// Set issue_tracker element
	setLocaleProperty('#issue_tracker', 'innerText', 'popup_issue_tracker');
	setProperty('#issue_tracker', 'href', issue_tracker_URL);
	setProperty('#issue_tracker', 'title', issue_tracker_URL);
	
	// Set source_code element
	setLocaleProperty('#source_code', 'innerText', 'popup_source_code');
	setProperty('#source_code', 'href', homePage_URL);
	setProperty('#source_code', 'title', homePage_URL);
	
	// Set addon_version element
	setLocaleProperty('#addon_version', 'title', 'popup_addon_version');
	setProperty('#addon_version', 'innerText', addonVersion);
	
}

document.addEventListener("DOMContentLoaded", function () {
	loadPopup();
});

// Open clickable links
window.addEventListener("click", function (e) {
    if (e.target.href !== undefined) {
        chrome.tabs.create({ url: e.target.href });
        window.close();
    }
});