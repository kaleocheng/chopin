function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
        setTimeout(fn, 1)
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}


function getTitle(url){
    return fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        const title = doc.querySelectorAll('title')[0]
        return title.innerText
    })
}

function shortenGithubURL(links){
    links = Array.from(links)
    links.forEach(link => {
        if (link.hostname == 'github.com'){
            const pathName = link.pathname
                                 .slice(1)
                                 .replace('/pull/', '#')
                                 .replace('/issues/', '#')
            link.innerHTML = pathName
        }
    })
}
docReady(function() {
    shortenGithubURL(document.links)
})
