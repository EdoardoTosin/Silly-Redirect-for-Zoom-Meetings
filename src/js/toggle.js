var storage = chrome.storage.sync || chrome.storage.local;

function setRedirector(state) {
    const toggleState = state ? true : false;
    const title = state ? chrome.i18n.getMessage("enabled") : chrome.i18n.getMessage("disabled");
    const checked = state ? "" : null;
    const iconPaths = state ? {
        "16": "../icons/16x16.png",
        "32": "../icons/32x32.png",
        "48": "../icons/48x48.png",
        "64": "../icons/64x64.png",
        "128": "../icons/128x128.png",
        "256": "../icons/256x256.png"
    } : {
        "16": "../icons/16x16-off.png",
        "32": "../icons/32x32-off.png",
        "48": "../icons/48x48-off.png",
        "64": "../icons/64x64-off.png",
        "128": "../icons/128x128-off.png",
        "256": "../icons/256x256-off.png"
    };

    storage.set({
        'toggle': toggleState
    });
    document.getElementsByClassName("switch")[0].title = title;
    let toggleElement = document.getElementById('toggle');
    if (state) {
        toggleElement.setAttribute("checked", "");
    } else {
        toggleElement.removeAttribute("checked");
    }
    chrome.browserAction.setIcon({
        path: iconPaths
    });
};

// If toggle is not set, it creates it and load icon set.
chrome.storage.sync.get('toggle', function(items) {
    var toggle = items.toggle;
    if (typeof toggle === "undefined") {
        setRedirector(true);
    }
});

// On dashboard load it checks chrome.storage toggle value and set the switch button and icon set accordingly.
document.body.onload = function() {
    storage.get("toggle", function(items) {
        const state = items.toggle != false;
        setRedirector(state);
    });
}

// Change chrome.storage "toggle" value and extension icon when checkbox change state.
function saveOption() {
    const state = document.getElementById('toggle').checked ? true : false;
    setRedirector(state);
};

// If toggle change state it calls saveOption function.
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#toggle').addEventListener('change', saveOption);
});
