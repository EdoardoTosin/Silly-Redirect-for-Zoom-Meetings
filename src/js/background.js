var storage = chrome.storage.sync;
if (!storage) storage = chrome.storage.local;

// Change Icon, Toggle and chrome.storage to true/on.
function setRedirectorOn(){
  storage.set({'toggle': "true"});
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
};

// Change Icon, Toggle and chrome.storage to false/off.
function setRedirectorOff(){
  storage.set({'toggle': "false"});
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
};

// If toggle is not set, it creates it and load icon set.
chrome.storage.sync.get('toggle', function(items) {
  var toggle = items.toggle;
  if (typeof toggle === "undefined") {
    setRedirectorOn();
  }
});

// Checks chrome.storage toggle value and set the switch button and icon set accordingly.
(function updateToggle() {
  storage.get("toggle", function(items) {
    //console.log('Load to: ' + items.toggle);
    if (items.toggle!='undefined' && items.toggle=="false")
      setRedirectorOff();
    else {
      setRedirectorOn();
    }
  });
})();

// Replace */j/* or */s/* in the url with */wc/join/* or */wc/*/start/
(function redirect(){
  storage.get("toggle", function(items) {
	  //console.log(items.toggle);
      if (items.toggle=="true" && window.location.pathname!=null && ['j','s'].indexOf(window.location.pathname.split('/')[1])+1!=0){
        var substr = (window.location.pathname.split('/')[1]=='j') ? ["/wc/join/",""] : ["/wc/","/start"];
        window.location.assign("https://" + window.location.hostname + substr[0] + window.location.pathname.split('/')[2] + substr[1] + window.location.search);
      }
  });
})();