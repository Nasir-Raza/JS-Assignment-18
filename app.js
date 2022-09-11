/*Coded by 
     Name	: Nasir Raza
     Roll #	: KH01210813250
*/

var todoObjectArr = [];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var count = 0;
var updateId = "";
var nodes = "";
var updateButtonExists = false;
var divTodo = document.getElementById("todo");

/* creating div for Todo Input*/

var divInputTodo = document.createElement("div");
divInputTodo.setAttribute("class", "todoinput");

var TodoInputHeading = document.createElement("h1");
var TodoInputHeadingText = document.createTextNode("Todo Application");
TodoInputHeading.appendChild(TodoInputHeadingText);

var labelTodo = document.createElement("label");
var labelTodoText = document.createTextNode("Todo Description");
labelTodo.appendChild(labelTodoText);

var descTodo = document.createElement("input");
descTodo.setAttribute("type", "text");
descTodo.setAttribute("id", "tododesc");
descTodo.setAttribute("class", "inputdesc");

var lb = document.createElement("br");

var labelTodo1 = document.createElement("label");
var labelTodo1Text = document.createTextNode("Number of Days to Complete");
labelTodo1.appendChild(labelTodo1Text);

var daysCompTodo = document.createElement("input");
daysCompTodo.setAttribute("type", "number");
daysCompTodo.setAttribute("id", "tododayscomp");
daysCompTodo.setAttribute("class", "inputdays");
daysCompTodo.setAttribute("min", "0");
daysCompTodo.setAttribute("max", "100");
daysCompTodo.setAttribute("value", "0");


var addButton = document.createElement("button");
var addButtonText = document.createTextNode("Add");
addButton.setAttribute("class", "add-button");
addButton.setAttribute("onClick", "addObjToArray()");
addButton.appendChild(addButtonText);

divInputTodo.appendChild(TodoInputHeading);
divInputTodo.appendChild(labelTodo);
divInputTodo.appendChild(descTodo);

divInputTodo.appendChild(lb);

divInputTodo.appendChild(labelTodo1);
divInputTodo.appendChild(daysCompTodo);

divInputTodo.appendChild(addButton);
divTodo.appendChild(divInputTodo);

/* creating div for Todo List Heading*/

var divListHeadTodo = document.createElement("div");
divListHeadTodo.setAttribute("class", "todolisthead");

var TodoListHeading = document.createElement("h1");
var TodoListHeadingText = document.createTextNode("Todo List Items");

TodoListHeading.appendChild(TodoListHeadingText);
divListHeadTodo.appendChild(TodoListHeading);
divTodo.appendChild(divListHeadTodo);


/* creating div for Todo List*/

var divListTodo = document.createElement("div");
divListTodo.setAttribute("id", "todolist");
divListTodo.setAttribute("class", "todolist");
divTodo.appendChild(divListTodo);

/* creating constructor for Todo List*/

function TodoObject(id, description, daysToComplete, isCompleted, dateCreated, expCompDate, actCompDate) {
    this.id = id;
    this.description = description;
    this.daysToComplete = daysToComplete;
    this.isCompleted = isCompleted;
    this.dateCreated = dateCreated;
    this.expCompDate = expCompDate;
    this.actCompDate = actCompDate;
}

function addObjToArray() {
    var todoDescription = document.getElementById("tododesc").value;
    var todoDaysToComp = document.getElementById("tododayscomp").value;

    document.getElementById("tododesc").value = "";
    document.getElementById("tododayscomp").value = 0;

    var curDate = new Date();
    var itemCreationDate = curDate.getDate() + "-" + months[curDate.getMonth()] + "-" + curDate.getFullYear();
    var itemExpCompDate = "";

    if (todoDaysToComp === "" || todoDaysToComp === "0") {
        todoDaysToComp = 0;
        itemExpCompDate = itemCreationDate;
    }
    else {
        itemExpCompDate = curDate.setDate(curDate.getDate() + parseInt(todoDaysToComp));
        itemExpCompDate = new Date(itemExpCompDate);
        itemExpCompDate = itemExpCompDate.getDate() + "-" + months[itemExpCompDate.getMonth()] + "-" + itemExpCompDate.getFullYear();
    }

    if (todoDescription === "") {
        alert("Description cannot be left blank.");
    }
    else if (parseInt(todoDaysToComp) < 0) {
        alert("Days to Complete cannot be negative.");
    }
    else {

        todoObjectArr.push(new TodoObject(count, todoDescription, todoDaysToComp, 0, itemCreationDate, itemExpCompDate, ""));
        addListItems();
        count++;
    }

}

// Creating Ordered List
var todoOrderList = document.createElement("ol")
todoOrderList.setAttribute("class", "olist")

// Adding objects to Todo list
function addListItems() {
    console.log(todoObjectArr.length)
    // todoOrderList.innerHTML = "";
    for (var key in todoObjectArr) {
        // for (var key = 0; key < todoObjectArr.length; key++) {
        // todoOrderList.innerHTML = "";
        console.log("key", key)
        var todoOrderListItem = document.createElement("li")
        var todoOrderListItemText = document.createTextNode("Item " + (parseInt(todoObjectArr[key].id) + 1));

        todoOrderListItem.setAttribute("id", "olli" + todoObjectArr[key].id)

        // Creating Edit button
        var editButton = document.createElement("button");
        var editButtonText = document.createTextNode("Edit");
        editButton.setAttribute("id", todoObjectArr[key].id);
        editButton.setAttribute("class", "itemlistbutton");
        editButton.setAttribute("onClick", "editItem(this.id)");
        editButton.appendChild(editButtonText);

        // Creating Delete button
        var deleteButton = document.createElement("button");
        var deleteButtonText = document.createTextNode("Delete");
        deleteButton.setAttribute("id", todoObjectArr[key].id);
        deleteButton.setAttribute("class", "itemlistbutton");
        deleteButton.setAttribute("onClick", "deleteItem(this.id)");
        deleteButton.appendChild(deleteButtonText);

        // Creating Complete button
        var completeButton = document.createElement("button");
        var completeButtonText = document.createTextNode("Complete");
        completeButton.setAttribute("id", todoObjectArr[key].id);
        completeButton.setAttribute("class", "itemlistbutton");
        completeButton.setAttribute("onClick", "completeItem(this.id)");
        completeButton.appendChild(completeButtonText);

        // Creating Unordered List
        var todoUnorderList = document.createElement("ul")
        todoUnorderList.setAttribute("id", "ul" + todoObjectArr[key].id)
        todoUnorderList.setAttribute("class", "ulist")

        var todoUnorderListItem1 = document.createElement("li")
        var todoUnorderListItem1Text = document.createTextNode("Id: " + todoObjectArr[key].id);

        var todoUnorderListItem2 = document.createElement("li")
        var todoUnorderListItem2Text = document.createTextNode("Description: " + todoObjectArr[key].description);

        var todoUnorderListItem3 = document.createElement("li")
        var todoUnorderListItem3Text = document.createTextNode("Days to Complete: " + todoObjectArr[key].daysToComplete);

        var todoUnorderListItem4 = document.createElement("li")
        var todoUnorderListItem4Text = document.createTextNode("Date Created: " + todoObjectArr[key].dateCreated);

        var todoUnorderListItem5 = document.createElement("li")
        var todoUnorderListItem5Text = document.createTextNode("Date Completed (Exp.): " + todoObjectArr[key].expCompDate);

        var todoUnorderListItem6 = document.createElement("li")
        var todoUnorderListItem6Text = document.createTextNode("Date Completed (Act.): " + todoObjectArr[key].actCompDate);

        var todoUnorderListItem7 = document.createElement("li")
        var todoUnorderListItem7Text = "";
        if (todoObjectArr[key].isCompleted === 0) {
            todoUnorderListItem7Text = document.createTextNode("Is Completed: No");
        }
        else {
            todoUnorderListItem7Text = document.createTextNode("Is Completed: Yes");
        }

        todoUnorderListItem1.appendChild(todoUnorderListItem1Text);
        todoUnorderListItem2.appendChild(todoUnorderListItem2Text);
        todoUnorderListItem3.appendChild(todoUnorderListItem3Text);
        todoUnorderListItem4.appendChild(todoUnorderListItem4Text);
        todoUnorderListItem5.appendChild(todoUnorderListItem5Text);
        todoUnorderListItem6.appendChild(todoUnorderListItem6Text);
        todoUnorderListItem7.appendChild(todoUnorderListItem7Text);

        todoUnorderList.appendChild(todoUnorderListItem1);
        todoUnorderList.appendChild(todoUnorderListItem2);
        todoUnorderList.appendChild(todoUnorderListItem3);
        todoUnorderList.appendChild(todoUnorderListItem4);
        todoUnorderList.appendChild(todoUnorderListItem5);
        todoUnorderList.appendChild(todoUnorderListItem6);
        todoUnorderList.appendChild(todoUnorderListItem7);
    }
    todoOrderListItem.appendChild(todoOrderListItemText);
    todoOrderListItem.appendChild(editButton);
    todoOrderListItem.appendChild(deleteButton);
    todoOrderListItem.appendChild(completeButton);
    todoOrderListItem.appendChild(todoUnorderList);
    todoOrderList.appendChild(todoOrderListItem);
    divListTodo.appendChild(todoOrderList);
}

var updateButton = "";

// Edit Todo list item / object from object list array
function editItem(id) {
    addButton.disabled = true;

    nodes = document.getElementById("todolist").getElementsByTagName('button');
    for (var i = 0; i < nodes.length; i++) {
        nodes[i].disabled = true;
    }
    console.log("Edit Id: ", id);
    
    for (var i = 0; i < todoObjectArr.length; i++) {
        if (todoObjectArr[i].id === parseInt(id)) {
            document.getElementById("tododesc").value = todoObjectArr[i].description;
            document.getElementById("tododayscomp").value = todoObjectArr[i].daysToComplete;
            updateId = todoObjectArr[i].id
            if(!updateButtonExists) {
                updateButton = document.createElement("button");
                var updateButtonText = document.createTextNode("Update");
                updateButton.setAttribute("class", "update-button");
                updateButton.setAttribute("onClick", "updateItem(updateId, updateButton, nodes)")
                updateButton.appendChild(updateButtonText);
                divInputTodo.appendChild(updateButton);
                updateButtonExists = true;
            }
            break;
        }
    }
}

// Update Todo list item / object from object list array
function updateItem(id, updateButtonid, p_Nodes) {
    console.log("Update Id:", id);
    var todoDescription = document.getElementById("tododesc").value;
    var todoDaysToComp = document.getElementById("tododayscomp").value;
      
    if (todoDescription === "") {
        alert("Description cannot be left blank.");
    }
    else if (parseInt(todoDaysToComp) < 0) {
        alert("Days to Complete cannot be negative.");
    }
    else {
        for (var i = 0; i < todoObjectArr.length; i++) {
            if (todoObjectArr[i].id === parseInt(id)) {
                todoObjectArr[i].description = todoDescription;
 
                var creationDate = todoObjectArr[i].dateCreated;
                creationDate = new Date(creationDate);
                
                var itemExpCompDate = "";
            
                if (todoDaysToComp === "" || todoDaysToComp === "0") {
                    todoDaysToComp = 0;
                    itemExpCompDate = todoObjectArr[i].dateCreated;
                }
                else {
                    itemExpCompDate = creationDate.setDate(creationDate.getDate() + parseInt(todoDaysToComp));
                    itemExpCompDate = new Date(itemExpCompDate);
                    itemExpCompDate = itemExpCompDate.getDate() + "-" + months[itemExpCompDate.getMonth()] + "-" + itemExpCompDate.getFullYear();
                }
            
                todoObjectArr[i].daysToComplete = todoDaysToComp;
                todoObjectArr[i].expCompDate = itemExpCompDate;
            
                var olliId = "olli" + id;
                var nodeToEdit = document.getElementById(olliId);
                    
                nodeToEdit.lastChild.children[1].innerText = "Description: " + todoDescription;
                nodeToEdit.lastChild.children[2].innerText = "Days to Complete: " + todoDaysToComp;
                nodeToEdit.lastChild.children[4].innerText = "Date Completed (Exp.): " + itemExpCompDate;
            
                updateButtonid.remove();
                updateButtonExists = false;
                addButton.disabled = false;
               
                for (var i = 0; i < p_Nodes.length; i++) {
                    nodes[i].disabled = false;
                }
                document.getElementById("tododesc").value = "";
                document.getElementById("tododayscomp").value = 0;
            }
        }
    }
}

// Delete Todo list item / object from object list array
function deleteItem(id) {
    console.log("Delete id: ", id);

    var olliId = "olli" + id;
    var nodeToDelete = document.getElementById(olliId)

    nodeToDelete.remove();

    for (var i = 0; i < todoObjectArr.length; i++) {
        if (todoObjectArr[i].id === parseInt(id)) {
            todoObjectArr.splice(i, 1);
            break;
        }
    }
}

// Marked Todo list item / object from object list array as Completed
function completeItem(id) {
    console.log("Complete Id: ", id);
    for (var i = 0; i < todoObjectArr.length; i++) {
        if (todoObjectArr[i].id === parseInt(id)) {
            todoObjectArr[i].isCompleted = 1;
            var curDate = new Date();
            var itemCompleteDate = curDate.getDate() + "-" + months[curDate.getMonth()] + "-" + curDate.getFullYear();
            todoObjectArr[i].actCompDate = itemCompleteDate;

            var olliId = "olli" + id;
            var nodeToComplete = document.getElementById(olliId);

            nodeToComplete.lastChild.children[5].innerText = "Date Completed (Act.): " + itemCompleteDate;
            nodeToComplete.lastChild.children[6].innerText = "Is Completed: Yes";

            nodeToComplete.lastChild.setAttribute("class", "ulist complete");

            nodeToComplete.firstChild.nodeValue += " (Completed)";
            nodeToComplete.firstChild.nextSibling.remove();
            nodeToComplete.firstChild.nextSibling.remove();
            nodeToComplete.firstChild.nextSibling.remove();
            break;
        }
    }
}

