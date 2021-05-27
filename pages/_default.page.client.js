import { useClientRouter } from "vite-plugin-ssr/client/router";
import { patch } from "@nonphoto/bloom";
import S from "s-js";

const renderResult = S.data();

S.root(() => {
  S(() => {
    if (renderResult()) {
      const { Page, pageContext } = renderResult();
      patch(document.body, Page(pageContext));
    }
  });
});

useClientRouter({
  render: renderResult,
  onTransitionStart() {},
  onTransitionEnd() {},
});
