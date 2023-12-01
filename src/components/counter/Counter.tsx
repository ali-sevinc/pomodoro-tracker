import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import MusicPlayer from "../ui/MusicPlayer";
import CounterOptions from "./CounterOptions";
import Container from "../ui/Container";
import ProgressBar from "./Progressbar";
import Button from "../ui/Button";
import {
  breakTimer,
  poTimer,
  reset,
  startBreak,
  startTimer,
  stopTimer,
} from "./counterSlice";

export default function Counter() {
  const status = useSelector((state: RootState) => state.counter.status);
  const dispatch = useDispatch();

  useEffect(
    function () {
      const worker = new Worker("./workers/worker.js");
      // let interval: number;
      if (status === "timerStarted") {
        // interval = setInterval(() => {
        //   dispatch(poTimer());
        // }, 1000);
        worker.postMessage({ type: "start" });
        worker.onmessage = function (event) {
          const { type } = event.data;
          switch (type) {
            case "dispatch":
              dispatch(poTimer());
              break;
            default:
              break;
          }
        };
      }
      if (status === "breakStarted") {
        // interval = setInterval(() => {
        //   dispatch(breakTimer());
        // }, 1000);
        worker.postMessage({ type: "start" });
        worker.onmessage = function (event) {
          const { type } = event.data;
          switch (type) {
            case "dispatch":
              dispatch(breakTimer());
              break;
            default:
              break;
          }
        };
      }

      // return () => clearInterval(interval);
      return () => {
        worker.postMessage({ type: "stop" });
        worker.terminate();
      };
    },
    [status, dispatch]
  );

  return (
    <Container>
      <CounterOptions />
      <MusicPlayer />
      <ProgressBar />
      <div className="counter-actions">
        {status === "paused" && (
          <Button onClick={() => dispatch(startTimer())} type="primary">
            Start
          </Button>
        )}
        {status === "breakStarted" ||
          (status === "timerStarted" && (
            <Button onClick={() => dispatch(stopTimer())} type="secondary">
              Stop
            </Button>
          ))}
        <Button onClick={() => dispatch(reset())} type="danger">
          Reset
        </Button>
      </div>

      <div className="finish-actions">
        {status === "timerEnd" && (
          <Button onClick={() => dispatch(startBreak())} type="primary">
            Time out
          </Button>
        )}
        {status === "breakEnd" && (
          <Button onClick={() => dispatch(reset())} type="primary">
            Finished
          </Button>
        )}
      </div>
      <h2 className="warning">Be careful, alarm sound bit loud.</h2>
    </Container>
  );
}
