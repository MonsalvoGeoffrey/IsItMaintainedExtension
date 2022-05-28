
function main(){
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
}

main()