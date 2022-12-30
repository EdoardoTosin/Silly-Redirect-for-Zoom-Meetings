var storage = chrome.storage.sync;
if (!storage) storage = chrome.storage.local;

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
