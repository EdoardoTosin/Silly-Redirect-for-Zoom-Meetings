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
    chrome.action.setIcon({
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
        console.log('Loaded to: ' + state);
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

// Replace */j/* or */s/* in the url with */wc/join/* or */wc/*/start/
(function redirect() {
    storage.get("toggle").then(function(items) {
        if (items.toggle == true) {
            const pathParts = window.location.pathname.split('/');
            const secondPart = pathParts[1];
            if (secondPart !== null && ['j', 's'].includes(secondPart)) {
                const substr = secondPart === 'j' ? ["/wc/join/", ""] : ["/wc/", "/start"];
                const newPath = "https://" + window.location.hostname + substr[0] + pathParts[2] + substr[1] + window.location.search;
                window.location.assign(newPath);
            }
        }
    });
})();