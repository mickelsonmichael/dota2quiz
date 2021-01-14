import Item from "../item";

// create an array of numbers from 0 to n
const range = (n) => [...Array(n).keys()];

const Question = ({ item, selection = [] }) => {
  const numberOfAnswers = item.components.length + (item.recipe ? 1 : 0);

  return (
    <div className="question">
      <div key="targets" className="question-target">
        <Item item={item} />
      </div>
      <div key="selection" className="question-selection">
        {range(numberOfAnswers).map((i) => (
          <Item key={i} item={selection[i]} />
        ))}
      </div>
    </div>
  );
};

export default Question;
