import images from "/data/images/";
import Image from "/components/Image.js";
import { css } from "goober";

function cycleTo(array, fn) {
  const index = array.findIndex(fn);
  return array.slice(index).concat(array.slice(0, index));
}

export function Page(pageContext) {
  const imageId = pageContext.routeParams.imageId;
  return {
    children: [
      { tagName: "a", href: "/", children: "Home" },
      {
        class: css({
          display: "flex",
          flexDirection: "column",
        }),
        children: cycleTo(images, ({ id }) => id === imageId).map(Image),
      },
    ],
  };
}
