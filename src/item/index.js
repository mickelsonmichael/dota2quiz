import "./item.css";

const Item = ({ item = undefined, onClick = undefined }) => (
  <span className={"item " + (item?.id ?? "blank")} onClick={onClick}>
    {item && (
      <img className="item-img" src={`images/${item.file}`} alt={item.name} />
    )}
  </span>
);

export default Item;
