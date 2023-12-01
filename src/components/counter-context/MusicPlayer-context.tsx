import { useEffect } from "react";

import { useCounterContext } from "../../context/CounterContext";

import sound from "../../assets/sound.wav";

export default function MusicPlayer() {
  const { status } = useCounterContext();

  useEffect(
    function () {
      if (status === "timerEnd" || status === "breakEnd") {
        const audio = new Audio(sound);
        audio.play();
      }
    },
    [status]
  );

  return <div></div>;
}
