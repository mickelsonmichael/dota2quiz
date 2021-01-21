import "./messages.css";
import Loading from "../loading/index.js";

const Messages = ({ visible, isCorrect, newQuestion }) => {
  if (!visible) return null;

  return (
    <div className="message">
      {isCorrect ? (
        <div>
          <div className="correct-message">correct</div>
          <Loading />
          {newQuestion()}
        </div>
      ) : (
        <div className="incorrect-message">incorrect</div>
      )}
    </div>
  );
};

export default Messages;
