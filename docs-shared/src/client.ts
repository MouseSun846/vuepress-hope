import { defineClientConfig } from "vuepress/client";
import { setupTransparentNavbar } from "vuepress-theme-hope/presets/transparentNavbar.js";

import ProjectLink from "./components/ProjectLink.js";
import SocialLink from "./components/SocialLink.js";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ProjectLink", ProjectLink);
    app.component("SocialLink", SocialLink);
  },
  setup: () => {
    setupTransparentNavbar({ type: "homepage", light: "#333", dark: "#bbb" });
  },
});
