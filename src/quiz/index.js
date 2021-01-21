import { useState, useEffect } from "react";
import getQuestion from "../question/Generator";
import Question from "../question";
import Options from "../options";
import "./quiz.css";
import Messages from "../messages";

const quizStateEnum = {
  noAnswer: 0,
  incorrect: 1,
  correct: 2,
};

const Quiz = () => {
  // current item/question
  const [question, setQuestion] = useState(getQuestion());
  // the user's submitted answer array
  const [selection, setSelection] = useState([]);
  // whether or not the user's answer is correct
  const [checkWin, setcheckWin] = useState(quizStateEnum.noAnswer);

  // variables used to check is incorrect message should display
  let visible = checkWin > 0;
  let isCorrect = checkWin === 2;

  const newQuestion = () => {
    setTimeout(() => {
      setcheckWin(quizStateEnum.noAnswer);
      setQuestion(getQuestion());
      setSelection([]);
    }, 3000);
  };

  // the number of components that make up the answer, plus 1 if the recipe is required
  const numberOfAnswers =
    question.components.length + (question.recipe ? 1 : 0);

  const checkAnswer = () => {
    // if they aren't done answering the question, reset state
    if (selection.length !== numberOfAnswers || selection.includes(undefined)) {
      setcheckWin(quizStateEnum.noAnswer);
      return;
    }

    // get a list of the expected ids
    let answerIds = [...question.components];

    // add the recipe's id if required
    if (question.recipe) {
      answerIds.push("recipe");
    }

    // loop through all their answers
    for (let sel of selection) {
      // find the index of this answer's id in the list of correct answers
      const index = answerIds.indexOf(sel.id); // return -1 if not found

      // if the item is not a correct answer, set state to incorrect
      if (index === -1) {
        setcheckWin(quizStateEnum.incorrect);
        return;
      }

      // remove the answer from the list of correct answers
      answerIds.splice(index, 1);
    }

    // if no correct answers left in the list, then correct
    // otherwise, they missed one
    setcheckWin(
      answerIds.length === 0 ? quizStateEnum.correct : quizStateEnum.incorrect
    );
  };

  useEffect(checkAnswer, [selection, numberOfAnswers, question.components, question.recipe]);

  const addSelection = (option) => {
    // if they have picked the right number of selections already
    if (selection.length === numberOfAnswers) {
      // loop through the selections and ensure none are undefined
      for (let i = 0; i < selection.length; i++) {
        // replace the first undefined selection with the new selection
        if (selection[i] === undefined) {
          setSelection((prev) => [
            ...prev.slice(0, i),
            option,
            ...prev.slice(i + 1),
          ]);

          // exit the addSelection function
          return;
        }
      }

      // none were undefined, don't let them add the new item
      return;
    }

    // otherwise they still have empty spaces in the selection to add
    setSelection((prev) => [...prev, option]);
  };

  const removeSelection = (i) => {
    setSelection((prev) => {
      return [...prev.slice(0, i), undefined, ...prev.slice(i + 1)];
    });
  };

  return (
    <div className="quiz">
      <Question
        item={question}
        selection={selection}
        onSelectionRemove={removeSelection}
      />
      <hr />
      <Options options={question.options} onOptionClick={addSelection} />
      <Messages
        visible={visible}
        isCorrect={isCorrect}
        newQuestion={newQuestion}
      />
    </div>
  );
};

export default Quiz;
