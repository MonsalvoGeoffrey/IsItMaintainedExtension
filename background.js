chrome.runtime.onMessage.addListener(
    function(url, _sender, onSuccess) {
        fetch(url)
            .then(response => response.text())
            .then(responseText => onSuccess(responseText))
        
        return true;  // Will respond asynchronously.
    }
);