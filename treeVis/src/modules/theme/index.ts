export class Theme {
  static #prefersDark: boolean | null;
  static themeColor: string | null;
  static negateColor: string | null;

  static render() {
    this.#prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const rootElement = document.querySelector(":root") as HTMLElement;
    const computedStyles = getComputedStyle(rootElement);

    const dayColor = computedStyles.getPropertyValue("--day");
    const nightColor = computedStyles.getPropertyValue("--night");

    if (this.#prefersDark) {
      this.themeColor = nightColor;
      this.negateColor = dayColor;
    } else {
      this.themeColor = dayColor;
      this.negateColor = nightColor;
    }
  }

  static get(isNegateColor: boolean) {
    return isNegateColor ? this.negateColor : this.themeColor;
  }
}
