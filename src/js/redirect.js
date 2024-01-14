var storage = chrome.storage.sync || chrome.storage.local;

// Replace */j/* or */s/* in the url with */wc/join/* or */wc/*/start/
(function redirect() {
   storage.get("toggle").then(function(items) {
       if (items.toggle === "true") {
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
