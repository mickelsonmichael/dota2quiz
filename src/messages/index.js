import "./messages.css";

const Messages = (props) => {
  let visible = false;
  let isCorrect = false;

  if (props.checkWin !== 0) {
    visible = true;
  }
  if (props.checkWin === 2) {
    isCorrect = true;
  }

  if (visible) {
    if (isCorrect) {
      return <br />;
    } else {
      return <div className="incorrect-message">incorrect</div>;
    }
  } else {
    return <div></div>;
  }
};

export default Messages;
