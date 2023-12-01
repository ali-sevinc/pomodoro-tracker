import { useCounterContext } from "../../context/CounterContext";

export default function ProgressBar() {
  const { pomodoroTime, timerProgress, status, breakTime, breakProgress } =
    useCounterContext();

  const totalWorkMins = pomodoroTime / 1000 / 60;
  const totalBreakMins = breakTime / 1000 / 60;
  const totalSeconds = Math.floor(timerProgress / 1000);
  let secs: number = 0;
  let mins: number = 0;
  if (status === "timerStarted") {
    secs = totalSeconds % 60;
    mins = Math.floor(totalSeconds / 60);
  }
  if (status === "breakStarted") {
    secs = totalSeconds % 60;
    mins = Math.floor(totalSeconds / 60);
  }
  if (status === "paused") {
    secs = totalSeconds % 60;
    mins = Math.floor(totalSeconds / 60);
  }

  if (status === "breakStarted") {
    return (
      <header className="progress">
        <div>
          <p>
            <span>Progress: </span>
            <span>
              {mins < 10 && "0"}
              {mins}:{secs < 10 && "0"}
              {secs}
            </span>
          </p>
          <p>
            <span>Time: </span>
            <span>{totalBreakMins} mins</span>
          </p>
        </div>
        <progress value={breakProgress} max={breakTime} />
      </header>
    );
  }

  return (
    <header className="progress">
      <div>
        <p>
          <span>Progress: </span>
          <span>
            {mins < 10 && "0"}
            {mins}:{secs < 10 && "0"}
            {secs}
          </span>
        </p>
        <p>
          <span>Time: </span>
          <span>{totalWorkMins} mins</span>
        </p>
      </div>
      <progress value={timerProgress} max={pomodoroTime} />
    </header>
  );
}
