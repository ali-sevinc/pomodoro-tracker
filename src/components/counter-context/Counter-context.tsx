import { useCounterContext } from "../../context/CounterContext";

import MusicPlayer from "../ui/MusicPlayer";
import CounterOptions from "./CounterOptions-context";
import Container from "../ui/Container";
import ProgressBar from "./Progressbar-context";
import Button from "../ui/Button";

export default function Counter() {
  const { startTimer, stopTimer, resetTimer, status, startBreak } =
    useCounterContext();
  return (
    <Container>
      <CounterOptions />
      <MusicPlayer />
      <ProgressBar />
      <div className="counter-actions">
        {status === "paused" && (
          <Button onClick={startTimer} type="primary">
            Start
          </Button>
        )}
        {status === "breakStarted" ||
          (status === "timerStarted" && (
            <Button onClick={stopTimer} type="secondary">
              Stop
            </Button>
          ))}
        <Button onClick={resetTimer} type="danger">
          Reset
        </Button>
      </div>

      <div className="finish-actions">
        {status === "timerEnd" && (
          <Button onClick={startBreak} type="primary">
            Time out
          </Button>
        )}
        {status === "breakEnd" && (
          <Button onClick={resetTimer} type="primary">
            Finished
          </Button>
        )}
      </div>
      <h2 className="warning">Be careful, alarm sound bit loud.</h2>
    </Container>
  );
}
