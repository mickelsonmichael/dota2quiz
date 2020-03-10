const questionUrl = document.querySelector("#question-url").value;

function newQuestion() {
    fetch(questionUrl)
    .then((response) => response.text())
    .then((html) => {
        document.querySelector(".box").innerHTML = html;
    })
    .catch((error) => console.warn(error));
}

newQuestion();
