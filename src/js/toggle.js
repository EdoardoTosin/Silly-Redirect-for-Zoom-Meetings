let storage = chrome.storage.sync || chrome.storage.local;

function setRedirectorOn() {
  storage.set({ 'toggle': "true" });
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

function setRedirectorOff() {
  storage.set({ 'toggle': "false" });
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

storage.get('toggle', function (items) {
  if (typeof items.toggle === "undefined") {
    setRedirectorOn();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  storage.get("toggle", function (items) {
    if (items.toggle !== 'undefined' && items.toggle === "false") {
      setRedirectorOff();
    } else {
      setRedirectorOn();
    }
  });
});

function saveOption() {
  let toggleElement = document.getElementById('toggle');
  if (toggleElement) {
    if (toggleElement.checked) {
      setRedirectorOn();
    } else {
      setRedirectorOff();
    }
  } else {
    console.error("Toggle element not found");
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let toggleElement = document.getElementById('toggle');
  if (toggleElement) {
    toggleElement.addEventListener('change', saveOption);
  } else {
    console.error("Toggle element not found");
  }
});
