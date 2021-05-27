import Image from "/components/Image.js";
import images from "/data/images/";

export function Page() {
  return {
    children: [
      Image({ ...images[0], pos: [100, 100] }),
      { tagName: "a", href: "/", children: "Home" },
    ],
  };
}
