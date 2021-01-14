import { useState } from "react";
import getQuestion from "../question/Generator";
import Question from "../question";
import Options from "../options";

const Quiz = () => {
    const [state, setState] = useState({
        question: getQuestion(),
        selection: []
    });

    const addSelection = (option) => {
        setState(prev => ({
        ...prev,
        selection: [ ...prev.selection, option ]
        }));
    }

    console.log(state);
    return (
        <div className="App">
        <div className="quiz-container">
            <div id="stage" className="box">
            <Question item={state.question} selection={state.selection} />
            <Options options={state.question.options} onOptionClick={addSelection} />
            </div>
        </div>
        </div>
    );
}

export default Quiz;
