import { html } from "vite-plugin-ssr";

export { render };
export { passToClient };

const passToClient = ["pageProps"];

function render({ Page, pageContext }) {
  return html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        ${Page(pageContext.pageProps)}
      </body>
    </html>
  `;
}
