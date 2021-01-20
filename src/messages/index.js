import "./messages.css";

const Messages = ({ visible, isCorrect, newQuestion }) => {
  if (visible) {
    if (isCorrect) {
      return null;
    } else {
      return <div className="incorrect-message">incorrect</div>;
    }
  } else {
    return null;
  }
};

export default Messages;
