import Image from "/components/Image.js";
import images from "/data/images/";
import { css } from "goober";

export function Page() {
  return {
    tagName: "ul",
    class: css({
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridGap: "1rem",
      margin: 0,
      padding: 0,
      listStyle: "none",
    }),
    children: images.map((image) => ({
      tagName: "li",
      children: Image(image),
    })),
  };
}
