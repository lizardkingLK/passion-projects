import {
  CLASS_INFO,
  DURATION_FIVE_SECONDS,
  INFO_THEME_CHANGE_DETECTED,
} from "../constants";
import { popupContent } from "../notifying";

export class Theme {
  static themeColor: string | null;
  static negateColor: string | null;

  static render() {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    const { matches: prefersDarkTheme } = mediaQueryList;

    const rootElement = document.querySelector(":root") as HTMLElement;
    const computedStyles = getComputedStyle(rootElement);

    const dayColor = computedStyles.getPropertyValue("--day");
    const nightColor = computedStyles.getPropertyValue("--night");

    if (!prefersDarkTheme) {
      this.themeColor = nightColor;
      this.negateColor = dayColor;
    } else {
      this.themeColor = dayColor;
      this.negateColor = nightColor;
    }

    mediaQueryList.onchange = () =>
      popupContent({
        className: CLASS_INFO,
        message: INFO_THEME_CHANGE_DETECTED,
        duration: DURATION_FIVE_SECONDS,
      });
  }

  static get(isNegateColor: boolean) {
    return isNegateColor ? this.negateColor : this.themeColor;
  }
}
