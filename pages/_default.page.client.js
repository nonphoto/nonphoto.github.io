import { useClientRouter } from "vite-plugin-ssr/client/router";
import { patch } from "@nonphoto/bloom";
import S from "s-js";

const page = S.data();

S.root(() => {
  patch(document.body, page);
});

useClientRouter({
  async render({ Page, pageContext }) {
    page(Page(pageContext));
  },
  onTransitionStart() {},
  onTransitionEnd() {},
});
