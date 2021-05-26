// *.page.client.js

import { getPage } from "vite-plugin-ssr/client";
import { patch } from "@nonphoto/bloom";
import S from "s-js";

main();

async function main() {
  const { Page, pageContext } = await getPage();
  S.root(() => {
    patch(document.body, Page(pageContext.pageProps));
  });
}
