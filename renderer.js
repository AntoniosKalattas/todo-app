// IEFE
(() => {
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
        addItemToArray(itemId, toDoItem, task);
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

    function addItemToArray(itemId, toDoItem) {
        // add item to array as an object with an ID so we can find and delete it later
        toDoListArray.push({ itemId, toDoItem });
        delArray[task] = false;
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
    }

})();