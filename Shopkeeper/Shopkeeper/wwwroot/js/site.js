const stage = document.getElementById("stage");
const questionUrl = document.getElementById("question-url").value;
const answerUrl = document.getElementById("answer-url").value;
const nextQuestionBtn = document.getElementById("next-question");

function newQuestion() {
    let qUrl = questionUrl;

    // record the current streak
    let streak = document.getElementById("streak");
    if (streak) {
        qUrl += "?streak=" + streak.innerText;
    }
    else {
        qUrl += "?streak=" + 0;
    }

    // pass the current question
    let currentQ = document.getElementById("question");
    if (currentQ) {
        qUrl += "&previous=" + currentQ.value;
    }

    fetch(qUrl)
        .then((response) => response.text())
        .then((html) => {
            stage.innerHTML = html;
        })
        .catch((error) => console.warn(error));
}

newQuestion();

stage.addEventListener("click", (event) => {
    let elem = event.srcElement;

    if (elem.classList.contains("option-img") && !elem.classList.contains("selected")) {
        

        let empty = document.querySelectorAll(".selected-item:empty");
        
        if (empty.length > 0) {
            
            elem.classList.add("selected");

            let cloned = elem.cloneNode();
            cloned.classList.replace("option-img", "selected-item-img")

            empty[0].appendChild(cloned);
        }

        if (empty.length === 1) {
            validateAnswer();
        }
    }
    else if (elem.classList.contains("selected-item-img")) {
        notIncorrect();

        let opt = document.querySelector(".option-img[data-id=" + elem.dataset.id + "]");

        opt.classList.remove("selected");
        elem.remove();
    }
    else if (elem.id === "incorrect-answer-link")  {
        showAnswer();
    }
});

function validateAnswer() {
    notIncorrect();

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
    incrementStreak();
    newQuestion();
}

function incorrect() {
    document.getElementById("incorrect-display")
        .classList.add("show");

    document.getElementById("streak-message")
        .classList.remove("show");

    document.getElementById("streak")
        .innerText = "0";
}

function notIncorrect() {
    document.getElementById("incorrect-display")
        .classList.remove("show");

    document.getElementById("streak-message")
        .classList.add("show");
}

function incrementStreak() {
    let counter = document.getElementById("streak");

    counter.innerText = (Number(counter.innerText) + 1)
}

function showAnswer() {
    let aUrl = answerUrl + "?itemId=" + document.getElementById("question").value;

    fetch(aUrl)
        .then((response) => response.text())
        .then((html) => {
            let ansContainer = document.getElementById("answer-container");
            ansContainer.innerHTML = html;
            ansContainer.classList.add("show");

            document.getElementById("next-question").addEventListener("click", (event) => {
                document.getElementById("answer-container").classList.remove("show");
            
                newQuestion();
            });
        })
        .catch((error) => console.warn(error));
}