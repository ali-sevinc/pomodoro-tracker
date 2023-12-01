import { ChangeEvent, FormEvent, useState } from "react";

import { useCounterContext } from "../../context/CounterContext";

import Button from "../ui/Button";

export default function CounterOptions() {
  const [values, setValues] = useState({
    pomodoroTime: 25,
    breakTime: 5,
  });

  const { setTimer } = useCounterContext();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const pomodoroTime = values.pomodoroTime;
    const breakTime = values.breakTime;
    if (!pomodoroTime || !breakTime) return;
    setTimer({
      pomodoroTime: Number(pomodoroTime) * 60 * 1000,
      breakTime: Number(breakTime) * 60 * 1000,
    });

    setValues({
      pomodoroTime: 25,
      breakTime: 5,
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="options-form">
        <div className="inputs">
          <label htmlFor="pomodoro-time">Work time:</label>
          <select
            value={values.pomodoroTime}
            onChange={handleChange}
            id="pomodoro-time"
            name="pomodoroTime"
          >
            <option value={20}>20 mins</option>
            <option value={25}>25 mins</option>
            <option value={30}>30 mins</option>
            <option value={35}>35 mins</option>
          </select>
        </div>
        <div className="inputs">
          <label htmlFor="break-time">Break time:</label>
          <select
            value={values.breakTime}
            onChange={handleChange}
            id="break-time"
            name="breakTime"
          >
            <option value={5}>5 mins</option>
            <option value={6}>6 mins</option>
            <option value={7}>7 mins</option>
            <option value={8}>8 mins</option>
            <option value={9}>9 mins</option>
            <option value={10}>10 mins</option>
          </select>
        </div>
      </div>
      <Button type="primary">Set</Button>
    </form>
  );
}
