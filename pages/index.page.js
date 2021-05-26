import S from "s-js";

export { Page };

function Page() {
  const time = S.data(0);
  if (typeof window !== "undefined") {
    (function tick(t) {
      time(t);
      requestAnimationFrame(tick);
    })();
  }
  return { style: { color: "red" }, children: ["hello: ", time] };
}
