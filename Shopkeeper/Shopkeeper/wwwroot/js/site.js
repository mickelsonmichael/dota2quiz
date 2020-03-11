const stage = document.getElementById("stage");
const questionUrl = document.getElementById("question-url").value;
const correctDisplay = document.getElementById("correct-display");

function newQuestion() {
    correctDisplay.classList.remove("show");

    fetch(questionUrl)
    .then((response) => response.text())
    .then((html) => {
        document.querySelector(".box").innerHTML = html;
    })
    .catch((error) => console.warn(error));
}

newQuestion();

stage.addEventListener("click", (event) => {
    let elem = event.srcElement;

    if (elem.classList.contains("option-img") && !elem.classList.contains("selected")) {
        notIncorrect();

        let empty = document.querySelectorAll(".selected-item:empty");
        
        if (empty.length > 0) {
            elem.classList.add("selected");

            let cloned = elem.cloneNode();
            cloned.classList.replace("option-img", "selected-item-img")

            empty[0].appendChild(cloned);
        }

        if (empty.length == 1) {
            validateAnswer();
        }
    }
    else if (elem.classList.contains("selected-item-img")) {
        notIncorrect();

        let opt = document.querySelector(".option-img[data-id=" + elem.dataset.id + "]");

        opt.classList.remove("selected");
        elem.remove();
    }
});

function validateAnswer() {
    let answer = document.getElementById("answer")
                        .value
                        .split(",");

    let userInput = document.querySelectorAll(".selected-item-img");

    for (let i = 0; i < userInput.length; i++) {
        let id = userInput[i].dataset.id;
        if (answer.includes(id)) {
            answer.splice(answer.indexOf(id), 1);
            console.log(answer);
        }
        else {
            break;
        }
    }

    if (answer.length > 0) {
        incorrect();
    }
    else {
        correct();
    }
}

function correct() {
    correctDisplay.classList.add("show");

    setTimeout(() => {
        newQuestion();
    }, 2000);
}

function incorrect() {
    document.getElementById("incorrect-display")
        .classList.add("show");
}

function notIncorrect() {
    document.getElementById("incorrect-display")
        .classList.remove("show");
}