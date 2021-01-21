import "./messages.css";

const Messages = ({ visible, isCorrect }) => {
  if (!visible) return null;

  return (
    <div className="message">
      {isCorrect ? (
        <div className="correct-message">correct</div>
      ) : (
        <div className="incorrect-message">incorrect</div>
      )}
    </div>
  );
};

export default Messages;
