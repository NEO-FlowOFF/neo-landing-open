import { defineConfig } from "astro/config";
import icon from "astro-icon";

export default defineConfig({
  site: "https://neo-landing-open.vercel.app",
  integrations: [icon()],
});
