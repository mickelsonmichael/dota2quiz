const numberOfOptions = 7;
const targets = [];
const currentQuestion = document.getElementById("target-item");
const options = document.getElementById("option-items");

addQuestions();
loadQuestion();

function addQuestions() {
    for (var key in Items.items) {
        if (!Items.items.hasOwnProperty(key)) continue;
    
        var item = Items.items[key]
        
        if (item.components.length > 0) {
            targets.push(item);
        }
    }
}

function loadQuestion() {
    // get a random item index
    var key = Math.floor(Math.random() * targets.length);
    var item = targets[key];

    // remove all the current options
    while (options.firstChild && options.children.length > 1) {
        options.removeChild(options.firstChild);
    }

    // set the current item
    currentQuestion.src = item.url;
    currentQuestion.alt = item.name;    
    
    // get all it's components and add them to the list of options
    for (var compKey in item.components) {
        if (!item.components.hasOwnProperty(key)) continue;
        var itemId = item.components[compKey];

        if (itemId === "recipe") continue;

        var comp = getItem(itemId);
        var span = document.createElement("span");
        span.classList.add("option");
        
        var img = document.createElement("img");
        img.src = comp.url;
        img.alt = comp.name;
        span.append(img);

        options.prepend(span);
    }
    
}

function getItem(id) {
    for (key in Items.items) {
        var item = Items.items[key];

        if (item.id === id) return item;
    }
}