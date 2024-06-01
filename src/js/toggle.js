// Determine which storage API to use: sync or local
let storage = chrome.storage.sync || chrome.storage.local;

// Function to turn the redirector feature on
function setRedirectorOn() {
  // Update storage to reflect that the toggle is set to "true"
  storage.set({ 'toggle': "true" });

  // Update UI elements to indicate that the feature is enabled
  let switchElement = document.querySelector(".switch");
  let toggleElement = document.getElementById('toggle');
  if (switchElement) {
    switchElement.title = chrome.i18n.getMessage("enabled");
  } else {
    console.error("Switch element not found");
  }
  if (toggleElement) {
    toggleElement.setAttribute("checked", "");
  } else {
    console.error("Toggle element not found");
  }

  // Update extension icon
  if (chrome.action && chrome.action.setIcon) {
    chrome.action.setIcon({
      path: {
        "16": "../icons/16x16.png",
        "32": "../icons/32x32.png",
        "48": "../icons/48x48.png",
        "64": "../icons/64x64.png",
        "128": "../icons/128x128.png",
        "256": "../icons/256x256.png"
      }
    });
  } else {
    console.error("chrome.action.setIcon is not available");
  }
}

// Function to turn the redirector feature off
function setRedirectorOff() {
  // Update storage to reflect that the toggle is set to "false"
  storage.set({ 'toggle': "false" });

  // Update UI elements to indicate that the feature is disabled
  let switchElement = document.querySelector(".switch");
  let toggleElement = document.getElementById('toggle');
  if (switchElement) {
    switchElement.title = chrome.i18n.getMessage("disabled");
  } else {
    console.error("Switch element not found");
  }
  if (toggleElement) {
    toggleElement.removeAttribute("checked");
  } else {
    console.error("Toggle element not found");
  }

  // Update extension icon
  if (chrome.action && chrome.action.setIcon) {
    chrome.action.setIcon({
      path: {
        "16": "../icons/16x16-off.png",
        "32": "../icons/32x32-off.png",
        "48": "../icons/48x48-off.png",
        "64": "../icons/64x64-off.png",
        "128": "../icons/128x128-off.png",
        "256": "../icons/256x256-off.png"
      }
    });
  } else {
    console.error("chrome.action.setIcon is not available");
  }
}

// Check storage for the current state of the toggle when the DOM is loaded
storage.get('toggle', function (items) {
  // If the toggle state is undefined, default to turning the redirector on
  if (typeof items.toggle === "undefined") {
    setRedirectorOn();
  }
});

// When the DOM content is loaded, check the toggle state and initialize the extension
document.addEventListener('DOMContentLoaded', function () {
  storage.get("toggle", function (items) {
    // If the toggle is off, set the redirector off; otherwise, set it on
    if (items.toggle !== 'undefined' && items.toggle === "false") {
      setRedirectorOff();
    } else {
      setRedirectorOn();
    }
  });
});

// Function to save the selected option when the toggle button is changed
function saveOption() {
  let toggleElement = document.getElementById('toggle');
  if (toggleElement) {
    // If the toggle is checked, turn the redirector on; otherwise, turn it off
    if (toggleElement.checked) {
      setRedirectorOn();
    } else {
      setRedirectorOff();
    }
  } else {
    console.error("Toggle element not found");
  }
}

// When the DOM content is loaded, add an event listener to the toggle button
document.addEventListener('DOMContentLoaded', function () {
  let toggleElement = document.getElementById('toggle');
  if (toggleElement) {
    toggleElement.addEventListener('change', saveOption);
  } else {
    console.error("Toggle element not found");
  }
});
