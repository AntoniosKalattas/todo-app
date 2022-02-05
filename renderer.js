const fs = require('fs');
const readline = require('readline');
const remote = require('electron').remote;
import1();

let task = -1; //number of the tasks
// state variables
let toDoListArray = [];
let delArray = [];
// ui variables
const form = document.querySelector(".form");
const input = form.querySelector(".form__input");
const ul = document.querySelector(".toDoList");

// event listeners
form.addEventListener('submit', e => {
    task++;
    console.log(task);
    // prevent default behaviour - Page reload
    e.preventDefault();
    // give item a unique ID
    let itemId = String(Date.now());
    // get/assign input value
    let toDoItem = input.value;
    //pass ID and item into functions
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    console.log(itemId)
        // clear the input box. (this is default behaviour but we got rid of that)
    input.value = '';
});

ul.addEventListener('dblclick', e => {
    console.log("dbl");
    let id = e.target.getAttribute('data-id');

    if (!id) return
    complete(id);
});

ul.addEventListener('contextmenu', e => {
    console.log("right");
    task--;
    let id = e.target.getAttribute('data-id')
    if (!id) return // user clicked in something else
        //pass id through to functions
    removeItemFromDOM(id);
    removeItemFromArray(id);
});

// functions
function addItemToDOM(itemId, toDoItem) {
    // create an li
    const li = document.createElement('li')
    li.setAttribute("data-id", itemId);
    // add toDoItem text to li
    li.innerText = toDoItem
        // add li to the DOM
    ul.appendChild(li);

}

function addItemToArray(itemId, toDoItem, id) {
    toDoListArray.push({ itemId, toDoItem });
    delArray[task] = false;
    save(itemId);
}

async function import1() {
    const fileStream = fs.createReadStream('data.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        let itemId = String(Date.now());
        let toDoItem = line;
        addItemToArray(itemId, toDoItem);
        addItemToDOM(itemId, toDoItem);
    }
}

function complete(id) {
    var li = document.querySelector('[data-id="' + id + '"]');
    let k = 0;
    for (let i = 0; i < toDoListArray.length; i++) {
        if (toDoListArray[i].itemId == id)
            k = i;
    }
    console.log(delArray[k]);
    if (delArray[k] == false) {
        console.log(toDoListArray);
        let a = (toDoListArray[k].toDoItem);
        li.innerHTML = `<del>${a} </del>`;
    }
    if (delArray[k] == true) {
        console.log(toDoListArray);
        let a = (toDoListArray[k].toDoItem);
        li.innerHTML = `<b>${a}</b>`;
    }
    if (delArray[k] == false) {
        delArray[k] = true;
    } else
        delArray[k] = false;
}

function removeItemFromDOM(id) {
    console.log("removed")
        // get the list item by data ID
    var li = document.querySelector('[data-id="' + id + '"]');
    // remove list item
    ul.removeChild(li);
}

function removeItemFromArray(id) {
    // create a new toDoListArray with all li's that don't match the ID
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
    save(id);
}

function removedata(id) {
    for (let i = 0; i < toDoListArray.length; i++) {
        if (toDoListArray[i].itemId == id)
            k = i;
    }
    let data = fs.readFileSync("data.txt", 'utf-8');
    let newValue = data.replace(toDoListArray[k].itemId, '0');
    fs.writeFileSync("data.txt", newValue);
}

function save(id) {
    fs.writeFileSync("./data.txt", "");
    for (let i = 0; i < toDoListArray.length; i++) {
        let a = (toDoListArray[i].toDoItem);
        fs.appendFileSync("./data.txt", a + "\n");
    }
}

function cdc() {
    console.log("nigger")
    window.close();
}