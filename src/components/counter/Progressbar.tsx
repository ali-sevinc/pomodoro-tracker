import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function ProgressBar() {
  const { time, breakTime, timerProgress, breakProgress, status } = useSelector(
    (state: RootState) => state.counter
  );

  const totalWorkMins = time / 1000 / 60;
  const totalBreakMins = breakTime / 1000 / 60;

  let secs: number = 0;
  let mins: number = 0;

  if (status === "timerStarted") {
    const totalSeconds = Math.floor(timerProgress / 1000);
    secs = totalSeconds % 60;
    mins = Math.floor(totalSeconds / 60);
  }
  if (status === "breakStarted") {
    const totalSeconds = Math.floor(breakProgress / 1000);
    secs = totalSeconds % 60;
    mins = Math.floor(totalSeconds / 60);
  }
  if (status === "paused") {
    const totalSeconds = Math.floor(timerProgress / 1000);
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
      <progress value={timerProgress} max={time} />
    </header>
  );
}
