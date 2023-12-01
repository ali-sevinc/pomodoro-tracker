import { ChangeEvent, FormEvent, useState } from "react";

import Button from "../ui/Button";
import { useDispatch } from "react-redux";
import { setTimer } from "./counterSlice";

export default function CounterOptions() {
  const [values, setValues] = useState({
    time: 25,
    breakTime: 5,
  });

  const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const time = Number(values.time);
    const breakTime = Number(values.breakTime);
    if (!time || !breakTime || isNaN(time) || isNaN(breakTime)) return;

    const milPomodoro = time * 60 * 1000;
    const milBreak = breakTime * 60 * 1000;

    dispatch(
      setTimer({
        time: milPomodoro,
        breakTime: milBreak,
      })
    );

    setValues({
      time: 25,
      breakTime: 5,
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="options-form">
        <div className="inputs">
          <label htmlFor="pomodoro-time">Work time:</label>
          <select
            value={values.time}
            onChange={handleChange}
            id="pomodoro-time"
            name="time"
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
