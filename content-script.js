
function onRemove(element, onDetachCallback) {
    const observer = new MutationObserver(function () {
        function isDetached(el) {
            if (el.parentNode === document) {
                return false;
            } else if (el.parentNode === null) {
                return true;
            } else {
                return isDetached(el.parentNode);
            }
        }

        if (isDetached(element)) {
            observer.disconnect();
            onDetachCallback();
        }
    })

    observer.observe(document, {
         childList: true,
         subtree: true
    });
}



function main(){
    let branchElement = document.querySelector("[title='Switch branches or tags']")
    if(branchElement == null) return; // not a repo page


    // Get the url to the repository's root
    let re = /^https:\/\/github\.com\/[^\/]*\/[^\/]*/i
    let url = location.href
    let urlParsed = url.match(re)[0].replace("https://github.com/","")


    // Create each elements
    let container = document.createElement("div")
    let issueResolutionImage = document.createElement("div")
    let openIssueImage = document.createElement("div")
    container.appendChild(issueResolutionImage)
    container.appendChild(openIssueImage)

    // Grab the SVGs from isitmaintained.com
    chrome.runtime.sendMessage(
        "https://isitmaintained.com/badge/resolution/" + urlParsed + ".svg?no-cache",
        data => {
            issueResolutionImage.innerHTML = data
        }
    );

    chrome.runtime.sendMessage(
        "https://isitmaintained.com/badge/open/" + urlParsed + ".svg?no-cache",
        data => {
            openIssueImage.innerHTML = data
        }
    );
    
    // Add the elements to the DOM
    let insertPosition = branchElement.parentElement.parentElement
    let beforeThis = insertPosition.nextElementSibling
    insertPosition.parentElement.insertBefore(container,beforeThis)

    /* 
    * This calls the main function again if the container is removed,
    * Since navigating on Github dynamically changes the DOM,
    * the content script wouldn't be reloaded otherwise
    */
    onRemove(container, main)
}

main()