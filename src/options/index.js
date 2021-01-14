const Options = ({ options, onOptionClick }) => (
    <div id="option-items" className="option-items">
        {options.map(o => (
            <span key={o.id} className="option" onClick={() => onOptionClick(o)}>
                <img className="option-img" src={`images/${o.file}`} alt={o.name} draggable="false" />
            </span>
        ))}
        <span className="option recipe">
            <img
                className="option-img"
                src="./items/recipe_lg.png"
                alt="Recipe"
                draggable="false"
            />
        </span>
    </div>
);

export default Options;
