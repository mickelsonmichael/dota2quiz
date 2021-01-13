import './App.css';
import Answers from "./answers";
import Question from "./question";
import { useState } from "react";
import Items from "./items.json";

const defaultAttempts = 3;

const App = () => {
  const [attempts, setAttempts] = useState(defaultAttempts); 

  const firstItem = Items.items.find(i => i.id === "solar_crest");

  return (
    <div className="App">
      <div class="quiz-container">
        <Question item={firstItem} />

        <Answers options={firstItem.components} />
      </div>
    </div>
  );
}

export default App;
