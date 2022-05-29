
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
    console.log("content-script.js loaded");
    let branchElement = document.querySelector("[title='Switch branches or tags']")
    if(branchElement == null) return;

    let re = /^https:\/\/github\.com\/[^\/]*\/[^\/]*/i

    let issueResolutionImage = document.createElement("div")
    let url = location.href
    let urlParsed = url.match(re)[0].replace("https://github.com/","")

    chrome.runtime.sendMessage(
        "https://isitmaintained.com/badge/resolution/" + urlParsed + ".svg?no-cache",
        data => {
            issueResolutionImage.innerHTML = data
        }
    );

    let openIssueImage = document.createElement("div")

    chrome.runtime.sendMessage(
        "https://isitmaintained.com/badge/open/" + urlParsed + ".svg?no-cache",
        data => {
            openIssueImage.innerHTML = data
        }
    );

    let insertPosition = branchElement.parentElement.parentElement
    let beforeThis = insertPosition.nextElementSibling
    insertPosition.parentElement.insertBefore(issueResolutionImage,beforeThis)
    insertPosition.parentElement.insertBefore(openIssueImage,beforeThis)

    onRemove(issueResolutionImage, main)
}

main()