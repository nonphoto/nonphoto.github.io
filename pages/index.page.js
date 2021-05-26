import S from "s-js";
import "/components/test.js";

export { Page };

function Page() {
  const time = S.data(0);
  if (typeof window !== "undefined") {
    console.log("start");
    (function tick(t) {
      time(t);
      requestAnimationFrame(tick);
    })();
  }
  return {
    style: { color: "red" },
    children: [
      { children: ["hello: ", time] },
      { tagName: "a", href: "/about", children: "About" },
    ],
  };
}
