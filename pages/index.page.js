import S from "s-js";
import Image from "/components/Image.js";
import images from "/data/images/";

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
      Image({ ...images[0], pos: [0, 0] }),
      { children: ["hello: ", time] },
      { tagName: "a", href: "/about", children: "About" },
    ],
  };
}
