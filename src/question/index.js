import Item from "../item";
import "./question.css";

// create an array of numbers from 0 to n
const range = (n) => [...Array(n).keys()];

const Question = ({ item, selection = [] }) => {
  const numberOfAnswers = item.components.length + (item.recipe ? 1 : 0);

  return (
    <div className="question">
      <div className="question-target">
        <Item item={item} size="lg" />
      </div>
      <div className="question-selection">
        {range(numberOfAnswers).map((i) => (
          <Item key={i} item={selection[i]} />
        ))}
      </div>
    </div>
  );
};

export default Question;
