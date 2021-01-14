import "./item.css";

const sizeClass = {
  md: "",
  sm: "item--small",
  lg: "item--large",
};

const Item = ({
  item = undefined,
  onClick = undefined,
  size = "md",
  className = undefined,
}) => (
  <span
    className={
      "item" +
      (item ? "" : " blank") +
      (size ? " " + sizeClass[size] : "") +
      (className ? " " + className : "")
    }
    onClick={onClick}
  >
    {item && (
      <img className="item-img" src={`images/${item.file}`} alt={item.name} />
    )}
  </span>
);

export default Item;
