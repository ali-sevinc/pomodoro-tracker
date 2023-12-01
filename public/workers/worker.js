let timer;
self.onmessage = function (event) {
  const { type } = event.data;
  if (type === "start") {
    timer = setInterval(() => {
      self.postMessage({ type: "dispatch" });
    }, 1000);
  } else if (type === "stop") {
    clearInterval(timer);
  }
};
