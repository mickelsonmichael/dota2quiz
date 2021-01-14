import Item from "../item";

const Question = ({ item, selection = [] }) => [
    <div key="targets" className="target-item-container">
        <span className="target-item">
            <img id="target-item" src={`images/${item.file}`} alt={item.name} />
        </span>
    </div>,
    <div key="selection" className="selected-items">
        {selection && selection.map(i => (<Item key={i.id} item={i} />))}
        {item.components.slice(0, item.components.length - selection.length).map((c, i) => (<span key={i} className="selected-item" />))}
        {item.recipe && (<span className="selected-item" />)}
    </div>
];

export default Question;
