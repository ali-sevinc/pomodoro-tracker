import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface InitialType {
  status: "timerStarted" | "timerEnd" | "breakStarted" | "breakEnd" | "paused";
  time: number;
  breakTime: number;
  timerProgress: number;
  breakProgress: number;
}
const initialState: InitialType = {
  status: "paused",
  time: 25 * 60 * 1000,
  breakTime: 5 * 60 * 1000,
  timerProgress: 0,
  breakProgress: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setTimer: (
      state,
      action: PayloadAction<{ time: number; breakTime: number }>
    ) => {
      state.time = action.payload.time;
      state.breakTime = action.payload.breakTime;
    },
    startTimer: (state) => {
      state.status = "timerStarted";
    },
    stopTimer: (state) => {
      state.status = "paused";
    },
    poTimer: (state) => {
      if (state.time === state.timerProgress) state.status = "timerEnd";

      state.timerProgress += 1000;
    },
    startBreak: (state) => {
      state.status = "breakStarted";
    },
    breakTimer: (state) => {
      if (state.breakProgress === state.breakTime) state.status = "breakEnd";
      state.breakProgress += 1000;
    },
    reset: () => {
      return initialState;
    },
  },
});

export const {
  breakTimer,
  poTimer,
  reset,
  setTimer,
  startBreak,
  startTimer,
  stopTimer,
} = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter;

export default counterSlice.reducer;
