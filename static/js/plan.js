
function blurFinishedTitles() {
    let planTitles = Array.from(document.getElementsByTagName("h2"))
    planTitles.forEach(t => {
        if (t.nextElementSibling.querySelectorAll(".task-list-item").length == 0){
            t.className = 'blur'
        }
    })
}
