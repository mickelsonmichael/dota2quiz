import "./messages.css";
import Loading from "../loading/index.js";

const Messages = ({ visible, isCorrect }) => {
  if (!visible) return null;

  return (
    <div className="message">
      {isCorrect ? (
        <div>
          <div className="correct-message">correct</div>
          <Loading />
        </div>
      ) : (
        <div className="incorrect-message">incorrect</div>
      )}
    </div>
  );
};

export default Messages;
