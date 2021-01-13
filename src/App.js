import './App.css';
import Answers from "./answers";
import Question from "./question";

function App() {
  return (
    <div className="App">
      <div class="quiz-container">
        <Question />

        <Answers />
      </div>
    </div>
  );
}

export default App;
