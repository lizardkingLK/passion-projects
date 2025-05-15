import { KEY_TREE_VISUAL_SETTINGS } from "../constants";
import { Json } from "../types";

export class Settings {
  static settings: Json | null = null;

  static reinitialize() {
    const settingsResult = Settings.#getSettings();
    if (settingsResult) {
      Settings.settings = JSON.parse(settingsResult);
    }
  }

  static initialize() {
    this.reinitialize();
    this.#setSettings();
  }

  static #setSettings() {
    const settings = Settings.settings;
    if (!settings) {
      return;
    }

    let value: boolean;
    let element: HTMLInputElement | null;
    for (const item in settings) {
      if (!Object.prototype.hasOwnProperty.call(settings, item)) {
        continue;
      }

      element = document.querySelector(`input[name=${item}]`);
      value = settings[item] as boolean;
      if (element) {
        element.checked = value;
      }
    }
  }

  static #getSettings() {
    return window.localStorage.getItem(KEY_TREE_VISUAL_SETTINGS);
  }
}
