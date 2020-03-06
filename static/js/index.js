function docReady(fn) {
  document.addEventListener('DOMContentLoaded', fn)
}

function isNumeric(num){
  return !isNaN(num)
}

function isValidUrl(string){
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function shortenURL(links){
    links = Array.from(links)
    links.filter(link => isValidUrl(link.innerHTML)).forEach(link => {
        if (link.hostname == 'github.com'){
            const pathArray = link.pathname.slice(1).split('/')
            const user = pathArray[0]
            const repo = pathArray[1]
            const lastPath = pathArray[pathArray.length -1]
            if (pathArray.length == 2) {
                link.innerHTML = repo
            } else if (lastPath.length == 40){
                link.innerHTML = `${repo}@${lastPath.slice(0,5)}`
            } else if (isNumeric(lastPath)){
                link.innerHTML = `${repo}#${lastPath}`
            } else {
                link.innerHTML = `${repo}/.../${lastPath}`
            }
            return
        }

        if (link.hostname == 'paper.dropbox.com') {
            link.innerHTML = link.pathname.slice(1).split('/')[1].split('--')[0]
            return
        }

        if (link.hostname.match(/*\.slack\.com\/archives.*/)) {
            link.innerHTML = `${link.hostname.split('.')[0]} slack`
            return
        }

        const url = new URL(link.innerHTML)
        link.innerHTML = url.hostname.replace(/^www\./, "")
        let after = url.pathname + url.search + url.hash
        after = after.split(".html")[0].replace(/\/$/, "")
        if (after.length > 30) {
            after = after.split('/').pop()
            link.innerHTML += `/${after}`
            return
        }
        link.innerHTML += after
    })
}

function toggleHighlight(e) {
  const height = 250
  e.preventDefault()
  let link = e.target
  let div = link.parentElement.parentElement
  let highlightDiv = link.parentElement

  if (link.innerHTML == "more&nbsp;") {
    link.innerHTML = "less&nbsp;"
    div.style.maxHeight = ""
    div.style.overflow = "none"
    div.querySelectorAll('pre').forEach(pre => {
        pre.style.filter = ''
    })
    highlightDiv.style.bottom = "15px"
  }
  else {
    link.innerHTML = "more&nbsp;"
    div.style.maxHeight = `${height}px`
    div.style.overflow = "hidden"
    div.scrollIntoView({ behavior: 'smooth' })
    div.querySelectorAll('pre').forEach(pre => {
        pre.style.filter = 'blur(0.8px)'
    })
    highlightDiv.style.bottom = "0"
  }
}

function makeCollapsible() {
  const height = 250
  const divs = document.querySelectorAll('.highlight')
  divs.forEach(div => {
      div.querySelectorAll('pre').forEach(pre => {
          pre.style.backgroundColor = ''
      })
      if (div.offsetHeight > height) {
            div.querySelectorAll('pre').forEach(pre => {
                pre.style.filter = 'blur(0.8px)'
            })
            div.style.maxHeight = `${height}px`
            div.style.overflow = "hidden"

            let e = document.createElement('div')
            e.className = "highlight-link"
            e.innerHTML = '<a href="">more&nbsp;</a>'
            div.appendChild(e)
      }

  })

  const links = document.querySelectorAll('.highlight-link')
  links.forEach(link => {
        link.addEventListener('click', toggleHighlight)
    })
}

docReady(function() {
    makeCollapsible()
    shortenURL(document.links)
})
