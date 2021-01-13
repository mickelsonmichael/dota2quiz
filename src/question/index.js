const Question = ({ item }) => (
    <div id="stage" class="box">
        <div class="target-item-container">
            <span class="target-item">
                <img id="target-item" src={`images/${item.file}`} alt={item.name} />
            </span>
        </div>

        <div class="selected-items">
            {item.components.map(c => (<span className="selected-item" />))}
            {item.recipe && (<span className="selected-item" />)}
        </div>
    </div>
);

export default Question;
