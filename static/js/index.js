function docReady(fn) {
    // see if DOM is already available
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
        setTimeout(fn, 1)
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}

function getAnchor(url) {
    return (url.split('#').length > 1) ? url.split('#')[1] : null;
}

function getTitle(url){
    return fetch(url)
      .then((response) => response.text())
      .then((html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html')
        const title = doc.querySelectorAll('title')[0]
          if (title.innerText.length > 50 ){
              return title.innerText.slice(0, 50) + '...'
          }
        return title.innerText
    })
}

function shortenURL(links){
    links = Array.from(links)
    links.forEach(link => {
        if (link.hostname == 'github.com'){
            const anchor = getAnchor(link.href)
            const pathName = link.pathname
                                 .slice(1)
                                 .replace('/pull/', '#')
                                 .replace('/issues/', '#')
                                 .replace(/^(Wiredcraft\/)/,'')
            link.innerHTML = pathName
            if (anchor) {
                link.innerText += ' (comment)'
            }
        }
    })
}
docReady(function() {
    shortenURL(document.links)
})
