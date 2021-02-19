import "./item.css";
import classnames from "classnames";

export const sizeClass = {
  md: "",
  sm: "item--small",
  lg: "item--large",
};

const Item = ({
  item = undefined,
  onClick = undefined,
  size = "md",
  className = undefined,
}) => {

  const classes = classnames([
    "item",
    {
      "blank": !item,
      [`${sizeClass[size]}`]: size,
      [className]: className
    }
  ]);

  const renderImage = () => (
    <img className="item-img" src={`images/${item.file}`} alt={item.name} />
  );

  return (
    <span className={classes} onClick={onClick}>
      { item && renderImage()}
    </span>
  )
};

export default Item;
