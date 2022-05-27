
function main(){
    let a = document.querySelectorAll("[title='Switch branches or tags']")[0]
    let b = document.createElement("img")
    let url = location.href.replace("https://github.com/","")
    b.src = "https://isitmaintained.com/badge/resolution/" + url + ".svg"

    let d = document.createElement("img")
    d.src = "https://isitmaintained.com/badge/open/" + url + ".svg"

    let c = a.parentElement.parentElement.nextElementSibling
    a.parentElement.parentElement.parentElement.insertBefore(b,c)
    a.parentElement.parentElement.parentElement.insertBefore(d,c)
}

main()