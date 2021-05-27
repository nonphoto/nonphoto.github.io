import { html } from "vite-plugin-ssr";
import { serialize } from "@nonphoto/bloom";
import { extractCss } from "goober";
import S from "s-js";

export { render };
export { passToClient };

const passToClient = ["pageProps"];

function render({ Page, pageContext }) {
  const content = S.root(() => {
    return serialize(Page(pageContext));
  });
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style id="_goober">
          ${extractCss()}
        </style>
      </head>
      <body>
        ${html.dangerouslySetHtml(content)}
      </body>
    </html>
  `;
}
