import "./streak.css";

const Streak = ({ streakCounter, attemptsRemaining }) => {
  return (
    <div>
      <div className="streak">streak counter: {streakCounter}</div>
      <div className="streak">attempts remaining: {attemptsRemaining} </div>
    </div>
  );
};

export default Streak;
