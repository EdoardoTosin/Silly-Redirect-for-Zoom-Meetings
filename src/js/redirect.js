// Retrieve the "toggle" value from the synchronized storage
chrome.storage.sync.get("toggle", function(items) {
    // Check if the "toggle" value is set to "true" and the current URL path is not null
    if (items.toggle === "true" && window.location.pathname) {
        // Split the URL path into its components
        let pathParts = window.location.pathname.split('/');
        
        // Ensure that pathParts has the expected number of components
        if (pathParts.length > 2) {
            // Check if the second component of the path is either 'j' or 's'
            if (['j', 's'].includes(pathParts[1])) {
                // Determine the substitution parts based on the path component
                let substr = (pathParts[1] === 'j') ? ["/wc/join/", ""] : ["/wc/", "/start"];
                
                // Construct the new URL
                let newUrl = "https://" + window.location.hostname + substr[0] + pathParts[2] + substr[1] + window.location.search;
                
                // Redirect the browser to the new URL
                window.location.assign(newUrl);
            }
        }
    }
});
