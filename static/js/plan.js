
function blurFinishedTitles() {
    let planTitles = Array.from(document.getElementsByTagName('h2'))
    planTitles.forEach(t => {
        if (t.nextElementSibling.querySelectorAll('.task-list-item').length == 0){
            t.className = 'blur'
        }
        t.nextElementSibling.className = 'without-bullets'
    })
}

function removeElements(elms){
    elms.forEach(el => el.remove())
}

function handleDate(){
    const tasks = Array.from(document.getElementsByClassName('date'))
    const year = new Date().getFullYear()
    tasks.forEach(task => {
        let parentElement = task.parentNode.parentNode
        if (parentElement.tagName == 'DEL') {
            parentElement = parentElement.parentNode
        }
        const current = parentElement.parentNode.previousElementSibling.id
        const currentLink = (current) => {
            let link = document.createElement('A')
            link.setAttribute('href', `#${current}`)
            link.className = 'date-refer'
            link.innerHTML = current
            return link
        }
        const createLi = (current, task) => {
            const li = document.createElement('LI')
            li.className = 'task-list-shadow'
            let label = task.parentNode.cloneNode(true)
            if (task.parentNode.parentNode.tagName == 'DEL'){
                label = task.parentNode.parentNode.cloneNode(true)
            }
            label.appendChild(currentLink(current))
            li.appendChild(label)
            return li
        }
        const dates = task.className.split(' ').filter(c => c != 'date') 
        dates.forEach(date => {
            const id = `${year}-${date}`
            let title = document.getElementById(id)
            if (title) {
                if (title.nextElementSibling.tagName == 'UL') {
                    const ul = title.nextElementSibling
                    const li = createLi(current, task)
                    ul.appendChild(li)
                }
            } else {
                title = document.createElement('H2')
                title.id = id
                title.innerHTML = `<a class="anchor" href="#${id}"><span>${id}</span></a>`
                const ul = document.createElement('UL')
                ul.setAttribute('class', 'without-bullets')
                const li = createLi(current, task)
                ul.append(li)
                const lastTitle = task.parentNode.parentNode.parentNode.nextElementSibling
                lastTitle.before(ul)
                ul.before(title)
            }
        })
    })
}

function improvePlan(){
    blurFinishedTitles()
    handleDate()
}
