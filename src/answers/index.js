const Answers = ({ options }) => (
    <div id="answer-container">
        <div id="option-items" className="option-items">
            {options.map(o => (
                <span key={o.id} className="option">
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
    </div>
);

export default Answers;
