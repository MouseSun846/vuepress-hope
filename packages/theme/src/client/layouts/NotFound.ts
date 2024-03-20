import type { SlotsType, VNode } from "vue";
import { defineComponent, h } from "vue";
import { useRoute } from "vuepress/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import SkipLink from "@theme-hope/components/SkipLink";
import { useThemeLocaleData } from "@theme-hope/composables/index";

import "../styles/not-found.scss";
import "../styles/not-found-hint.scss";

export default defineComponent({
  name: "NotFound",

  slots: Object as SlotsType<{
    default: () => VNode[] | VNode | null;
  }>,

  setup(_props, { slots }) {
    const route = useRoute();
    const themeLocale = useThemeLocaleData();

    return (): VNode[] => [
      h(SkipLink),
      h(CommonWrapper, { noSidebar: true }, () =>
        h(
          "main",
          { id: "main-content", class: "vp-page not-found" },
          slots.default?.() || [
            h("div", { class: "not-found-hint" }, [
              h(
                "p",
                { class: "error-hint" },
                Array.isArray(route.query["tip"])
                  ? ""
                  : route.query["tip"] || "",
              ),
            ]),
            h("div", { class: "actions" }, [
              h(
                "button",
                {
                  type: "button",
                  class: "action-button",
                  onClick: () => {
                    window.history.go(-1);
                  },
                },
                themeLocale.value.routeLocales.back,
              ),
              h(
                "button",
                {
                  type: "button",
                  class: "action-button",
                  onClick: () => {
                    window.open(
                      Array.isArray(route.query["exterLink"])
                        ? ""
                        : route.query["exterLink"] || "",
                      "_blank",
                    );
                  },
                },
                "开通权限",
              ),
            ]),
          ],
        ),
      ),
    ];
  },
});
