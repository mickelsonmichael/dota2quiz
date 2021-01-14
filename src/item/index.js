import "./item.css";

const Item = ({ item = undefined }) => (
    <span className={"item " + (item?.id ?? "blank")}>
        {item && (<img className="item-img" src={`images/${item.file}`} alt={item.name} />)}
    </span>
);

export default Item;
