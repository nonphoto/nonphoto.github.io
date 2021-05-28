import ssr from "vite-plugin-ssr/plugin";
import { imagetools } from "vite-imagetools";

export default {
  plugins: [ssr(), imagetools()],
};
