
function main(){
    let branchElement = document.querySelector("[title='Switch branches or tags']")
    if(branchElement == null) return;

    let re = /^https:\/\/github\.com\/[^\/]*\/[^\/]*/i

    let issueResolutionImage = document.createElement("div")
    let url = location.href//.replace("https://github.com/","")
    let urlParsed = url.match(re)[0].replace("https://github.com/","")
    //issueResolutionImage.crossOrigin = "anonymous"
    //issueResolutionImage.src = "https://isitmaintained.com/badge/resolution/" + urlParsed + ".svg?no-cache"

    chrome.runtime.sendMessage( //goes to bg_page.js
        "https://isitmaintained.com/badge/resolution/" + urlParsed + ".svg?no-cache",
        data => {
            //issueResolutionImage.src = ('data:image/svg+xml;uft8,' + data)//.replace("#", "%23")
            issueResolutionImage.innerHTML = data
            //console.log(data)
            //console.log(issueResolutionImage.src)
            //branchElement.appendChild(issueResolutionImage)
        }
    );

    //return;
    let openIssueImage = document.createElement("div")
    //openIssueImage.crossOrigin = "anonymous"
    //openIssueImage.src = "https://isitmaintained.com/badge/open/" + urlParsed + ".svg?no-cache"

    chrome.runtime.sendMessage( //goes to bg_page.js
        "https://isitmaintained.com/badge/open/" + urlParsed + ".svg?no-cache",
        data => {
            //issueResolutionImage.src = ('data:image/svg+xml;uft8,' + data)//.replace("#", "%23")
            openIssueImage.innerHTML = data
            //console.log(data)
            //console.log(issueResolutionImage.src)
            //branchElement.appendChild(issueResolutionImage)
        }
    );

    let insertPosition = branchElement.parentElement.parentElement
    let beforeThis = insertPosition.nextElementSibling
    insertPosition.parentElement.insertBefore(issueResolutionImage,beforeThis)
    insertPosition.parentElement.insertBefore(openIssueImage,beforeThis)
}

main()