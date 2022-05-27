
function main(){
    let branchElement = document.querySelector("[title='Switch branches or tags']")
    if(branchElement == null) return;
    let issueResolutionImage = document.createElement("img")
    let url = location.href.replace("https://github.com/","")
    issueResolutionImage.src = "https://isitmaintained.com/badge/resolution/" + url + ".svg"

    let openIssueImage = document.createElement("img")
    openIssueImage.src = "https://isitmaintained.com/badge/open/" + url + ".svg"

    let insertPosition = branchElement.parentElement.parentElement
    let beforeThis = insertPosition.nextElementSibling
    insertPosition.parentElement.insertBefore(issueResolutionImage,beforeThis)
    insertPosition.parentElement.insertBefore(openIssueImage,beforeThis)
}

main()