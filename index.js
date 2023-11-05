import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'
const appSettings = {
    databaseURL: "https://octo-list-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const workToComplete = ref(database,"workList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const workToCompleteEl = document.getElementById("work-list")

addButtonEl.addEventListener("click", function () {
    const inputValue = inputFieldEl.value

    push(workToComplete, inputValue)
    
    clearInput()

}) 

onValue(workToComplete, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearWorkList()
    
        for (let i=0; i<itemsArray.length; i++ ) {
            let currentItem = itemsArray[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
    
            addingWorkList(currentItem)
        }
    } else {
        workToCompleteEl.innerHTML = "Your list is empty"
    }

   
})

function clearWorkList() {
    workToCompleteEl.innerHTML = ""
}

function clearInput() {
    inputFieldEl.value = ""
}

function addingWorkList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent =  itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `workList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    workToCompleteEl.append(newEl)
}
