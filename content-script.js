console.log("content-script.js");
a = document.querySelectorAll("[title='Switch branches or tags']")[0]
b = document.createElement("img")
url = location.href.replace("https://github.com/","")
b.src = "https://isitmaintained.com/badge/resolution/" + url + ".svg"

d = document.createElement("img")
d.src = "http://isitmaintained.com/badge/open/" + url + ".svg"

c = a.parentElement.parentElement.nextElementSibling
a.parentElement.parentElement.parentElement.insertBefore(b,c)
 a.parentElement.parentElement.parentElement.insertBefore(d,c)
