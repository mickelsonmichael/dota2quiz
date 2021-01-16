import { useState } from "react";
import getQuestion from "../question/Generator";
import Question from "../question";
import Options from "../options";
import "./quiz.css";

const Quiz = () => {
  const [question, setQuestion] = useState(getQuestion());
  const [selection, setSelection] = useState([]);

  const newQuestion = () => {
    setQuestion(getQuestion());
    setSelection([]);
  };

  const addSelection = (option) => {
    const numberOfAnswers =
      question.components.length + (question.recipe ? 1 : 0);

    if (selection.length === numberOfAnswers) {
      for (let i = 0; i < selection.length; i++) {
        if (selection[i] === undefined) {
          setSelection((prev) => [
            ...prev.slice(0, i),
            option,
            ...prev.slice(i + 1),
          ]);
          return;
        }
      }
      return;
    }

    setSelection((prev) => [...prev, option]);
  };

  const removeSelection = (i) => {
    setSelection((prev) => {
      return [...prev.slice(0, i), undefined, ...prev.slice(i + 1)];
    });
  };

  return (
    <div className="quiz-container">
      <div id="stage" className="box">
        <Question
          item={question}
          selection={selection}
          onSelectionRemove={removeSelection}
        />

        <Options options={question.options} onOptionClick={addSelection} />
      </div>
    </div>
  );
};

export default Quiz;
