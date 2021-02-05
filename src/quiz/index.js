import { useState, useEffect } from "react";
import getQuestion from "../question/Generator";
import Question from "../question";
import Options from "../options";
import "./quiz.css";
import Messages from "../messages";
import Streak from "../streak/streak";

const quizStateEnum = {
  noAnswer: 0,
  incorrect: 1,
  correct: 2,
};

const intialQuiz = {
  question: getQuestion(),
  selection: [],
  checkWin: quizStateEnum.noAnswer,
  streakCount: 0,
  attemptsRemaining: 3,
};

const Quiz = () => {
  // current item/question
  const [quiz, setQuiz] = useState(intialQuiz);

  const {
    question,
    selection,
    checkWin,
    streakCount,
    attemptsRemaining,
  } = quiz;

  // variables used to check is incorrect message should display
  let visible = checkWin > 0;
  let isCorrect = checkWin === 2;

  const newQuestion = () =>
    setQuiz((prev) => ({
      ...prev,
      question: getQuestion(),
      selection: [],
    }));

  // the number of components that make up the answer, plus 1 if the recipe is required
  const numberOfAnswers =
    question.components.length + (question.recipe ? 1 : 0);

  const checkAnswer = () => {
    // if they aren't done answering the question, reset state
    if (selection.length !== numberOfAnswers || selection.includes(undefined)) {
      setQuiz((prev) => ({
        ...prev,
        checkWin: quizStateEnum.noAnswer,
      }));
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
        setQuiz((prev) => ({
          ...prev,
          checkWin: quizStateEnum.incorrect,
          attemptsRemaining: attemptsRemaining - 1,
          // streakCount: 0,
        }));

        if (attemptsRemaining === 1) {
          console.log("here");
          setQuiz((prev) => ({
            ...prev,
            attemptsRemaining: 3,
            streakCount: 0,
          }));
        }

        return;
      }

      // remove the answer from the list of correct answers
      answerIds.splice(index, 1);
    }

    // if no correct answers left in the list, then correct
    // otherwise, they missed one
    const isCorrect = answerIds.length === 0;

    if (isCorrect) quiz.attemptsRemaining = 3;

    setQuiz((prev) => ({
      ...prev,
      checkWin: isCorrect ? quizStateEnum.correct : quizStateEnum.incorrect,
      streakCount: isCorrect ? streakCount + 1 : 0,
    }));

    setTimeout(() => {
      newQuestion();
    }, 3000);
  };

  useEffect(checkAnswer, [
    selection,
    numberOfAnswers,
    question.components,
    question.recipe,
  ]);

  const addSelection = (option) => {
    if (selection.length === 0) {
      // otherwise they still have empty spaces in the selection to add
      setQuiz((prev) => ({
        ...prev,
        selection: [...prev.selection, option],
      }));
    }

    // loop through the selections and ensure none are undefined
    for (let i = 0; i < numberOfAnswers; i++) {
      // replace the first undefined selection with the new selection
      if (selection[i] === undefined) {
        setQuiz((prev) => ({
          ...prev,
          selection: [
            ...prev.selection.slice(0, i),
            option,
            ...prev.selection.slice(i + 1),
          ],
        }));
        // exit the addSelection function
        return;
      }
    }
  };

  const removeSelection = (i) => {
    setQuiz((prev) => ({
      ...prev,
      selection: [
        ...prev.selection.slice(0, i),
        undefined,
        ...prev.selection.slice(i + 1),
      ],
    }));
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
      <Messages visible={visible} isCorrect={isCorrect} />
      <Streak
        streakCounter={streakCount}
        attemptsRemaining={attemptsRemaining}
      />
    </div>
  );
};

export default Quiz;
