import "./messages.css";

const Messages = ({ checkWin, visible, isCorrect }) => {
  if (checkWin !== 0) {
    visible = true;
  }
  if (checkWin === 2) {
    isCorrect = true;
  }

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
