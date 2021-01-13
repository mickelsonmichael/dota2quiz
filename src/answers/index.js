const Answers = ({ options }) => (
    <div id="answer-container">
        <div id="option-items" class="option-items">
            {options.map(o => (
                <span class="option">
                    <img class="option-img" src={`images/${o}`} alt={o} draggable="false" />
                </span>
            ))}
            <span class="option recipe">
                <img
                    class="option-img"
                    src="recipeurl"
                    alt="Recipe"
                    draggable="false"
                />
            </span>
        </div>
    </div>
);

export default Answers;
