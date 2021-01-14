import Item from "../item";
import recipe from "./recipe.json";

const Options = ({ options, onOptionClick }) => (
  <div id="option-items" className="option-items">
    {options.map((o) => (
      <Item key={o.id} item={o} onClick={() => onOptionClick(o)} />
    ))}

    <Item item={recipe} onClick={() => onOptionClick(recipe)} />
  </div>
);

export default Options;
