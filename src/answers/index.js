import Item from "../item";
import "./answers.css";
import { items } from "../items.json";

const Answers = ({ item }) => {
  const answers = items.filter((it) => item.components.includes(it.id));

  return (
    <div className="answer">
      <div className="answer-target">
        <Item item={item} />
      </div>
      <div className="answer-components">
        {answers.map((comp, index) => (
          <Item key={`${comp.id}-${index}`} item={comp} />
        ))}
        {item.recipe && <Item recipe />}
      </div>
    </div>
  );
};

export default Answers;
