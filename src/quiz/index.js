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
    setSelection((prev) => [...prev, option]);
  };

  return (
    <div className="quiz">
      <Question item={question} selection={selection} />

      <hr />

      <Options options={question.options} onOptionClick={addSelection} />
    </div>
  );
};

export default Quiz;
