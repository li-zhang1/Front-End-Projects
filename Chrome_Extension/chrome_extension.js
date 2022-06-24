let myResouces = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const resoucesFromLocalStorage = JSON.parse(localStorage.getItem("myResouces"))
const tabBtn = document.getElementById("tab-btn")

if (resoucesFromLocalStorage) {
    myResouces = resoucesFromLocalStorage
    render(myResouces)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myResouces.push(tabs[0].url)
        localStorage.setItem("myResouces", JSON.stringify(myResouces))
        render(myResouces)
    })
})

function render(resouces) {
    let listItems = ""
    for (let i = 0; i < resouces.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${resouces[i]}'>
                    ${resouces[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myResouces = []
    render(myResouces)
})

inputBtn.addEventListener("click", function () {
    myResouces.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myResouces", JSON.stringify(myResouces))
    render(myResouces)
})