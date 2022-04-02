//import1();
//createFile()
let task = -1; //number of the tasks
// state variables
let toDoListArray = [];
let delArray = [];
// ui variables
const form = document.querySelector(".form");
const input = form.querySelector(".form__input");
const ul = document.querySelector(".toDoList");
// storage(android only)
var storage = window.localStorage;
var value;

console.log(fp);
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
    // clear the input box. (this is default behaviour but we got rid of that)
    input.value = "";
    //pass ID and item into functions
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    console.log(itemId)
});

function createFile(dirEntry, fileName, isAppend) {
    // Creates a new file or returns the file if it already exists.
    dirEntry.getFile(fileName, { create: true, exclusive: false }, function(fileEntry) {

        writeFile(fileEntry, null, isAppend);

    }, onErrorCreateFile);

}

//ul.addEventListener('dblclick', e => {
//    console.log("dbl");
//    let id = e.target.getAttribute('data-id');
//
//    if (!id) return
//    complete(id);
//});

ul.addEventListener('dblclick', e => {
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
    console.log(toDoItem);
    console.log(itemId);
    const li = document.createElement('li')
    li.setAttribute("data-id", itemId);
    storage.setItem(itemId, toDoItem);
    console.log("you have added the item: " + storage.getItem(itemId));
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

function writeFile(fileEntry, dataObj) {
    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...");
            readFile(fileEntry);
        };

        fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString());
        };

        // If data object is not passed in,
        // create a new Blob instead.
        if (!dataObj) {
            dataObj = new Blob(['some file data'], { type: 'text/plain' });
        }

        fileWriter.write(dataObj);
    });
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
    console.log('you choose to remove the tiem:' + storage.getItem(id));
    // get the list item by data ID
    var li = document.querySelector('[data-id="' + id + '"]');
    storage.removeItem('id');
    // remove list item
    ul.removeChild(li);
}

function removeItemFromArray(id) {
    // create a new toDoListArray with all li's that don't match the ID
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray);
    //save(id);
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

window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {

    console.log('file system open: ' + fs.name);
    createFile(fs.root, "data   .txt", false);

}, onErrorLoadFs);
