import "./messages.css";

const Messages = ({ visible, isCorrect }) => {
  if (visible) {
    if (isCorrect) return null;
    if (!isCorrect) return <div className="incorrect-message">incorrect</div>;
  }
  if (!visible) return null;
};

export default Messages;
