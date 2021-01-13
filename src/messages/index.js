const Messages = () => (
    <div class="messages">
        <div id="streak-message" class="show">
            Current Streak: <span id="streak">@Model.Streak</span>
        </div>
        <div id="attempts-message">
            Attempts Remaining Before Streak Lost: <span id="attempts-left">3</span>
        </div>
        <div id="incorrect-display">
            <div class="incorrect-message">
                Incorrect!
                <span id="incorrect-message-reset">
                    Streak Reset.
                </span>
            </div>
            <div class="incorrect-answer">
                <a href="#answer" id="incorrect-answer-link">
                    Show Answer (Lose Streak)
                </a>
            </div>
        </div>
    </div>
);

export default Messages;
