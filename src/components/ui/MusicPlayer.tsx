import { useEffect } from "react";

import sound from "../../assets/sound.wav";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function MusicPlayer() {
  const { status } = useSelector((state: RootState) => state.counter);

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
