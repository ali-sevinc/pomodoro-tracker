import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

type PayloadType = { pomodoroTime?: number; breakTime?: number };
type Action = {
  type:
    | "timer/set"
    | "timer/startTimer"
    | "timer/pomodoroProgress"
    | "timer/startBreak"
    | "timer/breakProgress"
    | "timer/stop"
    | "timer/reset";
  payload?: PayloadType;
};
interface InitialType {
  status: "timerStarted" | "timerEnd" | "breakStarted" | "breakEnd" | "paused";
  pomodoroTime: number;
  breakTime: number;
  timerProgress: number;
  breakProgress: number;
  setTimer: (x: PayloadType) => void;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  startBreak: () => void;
}

const initialState: InitialType = {
  status: "paused",
  pomodoroTime: 25 * 60 * 1000,
  breakTime: 5 * 60 * 1000,
  timerProgress: 0,
  breakProgress: 0,
  setTimer: () => {},
  startTimer: () => {},
  stopTimer: () => {},
  resetTimer: () => {},
  startBreak: () => {},
};
const CounterContext = createContext(initialState);

function reducer(state: InitialType, action: Action) {
  if (action.type === "timer/set") {
    return {
      ...state,
      pomodoroTime: action.payload?.pomodoroTime,
      breakTime: action.payload?.breakTime,
    } as InitialType;
  }
  if (action.type === "timer/startTimer") {
    return {
      ...state,
      status: "timerStarted",
    } as InitialType;
  }
  if (action.type === "timer/stop") {
    return {
      ...state,
      status: "paused",
    } as InitialType;
  }
  if (action.type === "timer/pomodoroProgress") {
    if (state.pomodoroTime === state.timerProgress)
      return { ...state, status: "timerEnd" } as InitialType;
    return {
      ...state,
      timerProgress: state.timerProgress + 1000,
    } as InitialType;
  }
  if (action.type === "timer/startBreak") {
    return {
      ...state,
      status: "breakStarted",
    } as InitialType;
  }
  if (action.type === "timer/breakProgress") {
    if (state.breakTime === state.breakProgress)
      return { ...state, status: "breakEnd" } as InitialType;

    return {
      ...state,
      breakProgress: state.breakProgress + 1000,
    } as InitialType;
  }
  if (action.type === "timer/reset") {
    return initialState;
  }
  return state;
}

export default function CounterProvider({ children }: { children: ReactNode }) {
  const [
    { breakTime, pomodoroTime, status, breakProgress, timerProgress },
    dispatch,
  ] = useReducer(reducer, initialState);

  function setTimer(values: PayloadType) {
    dispatch({ type: "timer/set", payload: values });
  }
  function startTimer() {
    dispatch({ type: "timer/startTimer" });
  }
  function stopTimer() {
    dispatch({ type: "timer/stop" });
  }
  function resetTimer() {
    dispatch({ type: "timer/reset" });
  }
  function startBreak() {
    dispatch({ type: "timer/startBreak" });
  }

  useEffect(
    function () {
      let interval: number;
      if (status === "timerStarted") {
        interval = setInterval(() => {
          dispatch({ type: "timer/pomodoroProgress" });
        }, 1000);
      }
      return () => clearInterval(interval);
    },
    [status]
  );

  useEffect(
    function () {
      let interval: number;
      if (status === "breakStarted") {
        interval = setInterval(() => {
          dispatch({ type: "timer/breakProgress" });
        }, 1000);
      }
      return () => clearInterval(interval);
    },
    [status]
  );
  return (
    <CounterContext.Provider
      value={{
        breakTime,
        pomodoroTime,
        breakProgress,
        timerProgress,
        status,
        resetTimer,
        setTimer,
        startTimer,
        stopTimer,
        startBreak,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCounterContext() {
  const counter = useContext(CounterContext);
  return counter;
}
