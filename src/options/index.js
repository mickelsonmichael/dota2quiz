import Item from "../item";
import recipe from "./recipe.json";
import "./options.css";

const Options = ({ options, onOptionClick }) => (
  <div className="options">
    {options.map((o) => (
      <Item key={o.id} item={o} onClick={() => onOptionClick(o)} />
    ))}

    <Item
      className="options-recipe"
      item={recipe}
      onClick={() => onOptionClick(recipe)}
    />
  </div>
);

export default Options;
