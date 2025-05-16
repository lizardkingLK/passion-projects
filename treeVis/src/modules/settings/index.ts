import { KEY_TREE_VISUAL_SETTINGS, TREE_SETTINGS_BODY } from "../constants";
import settingsJson from "./settings.json";
import { Json } from "../types";

export class Settings {
  static settings: Json | null = null;

  static initialize() {
    this.reinitialize();
    this.#setSettingDialog();
    this.#setSettingValues();
  }

  static reinitialize() {
    const settingsResult = Settings.#getSettings();
    if (settingsResult) {
      Settings.settings = JSON.parse(settingsResult);
    }
  }

  static get<T>(key: string) {
    if (
      this.settings &&
      Object.prototype.hasOwnProperty.call(this.settings, key)
    ) {
      return this.settings[key] as T;
    }

    return null;
  }

  static #setSettingDialog() {
    const settingDialog = document.querySelector(
      TREE_SETTINGS_BODY
    )! as HTMLDivElement;
    let settingField: HTMLDivElement;
    let settingsFieldControl: HTMLLabelElement;
    let settingsFieldControlInput: HTMLInputElement;
    let settingsFieldControlSpan: HTMLSpanElement;
    let settingsFieldDescription: HTMLParagraphElement;
    settingsJson.map(({ id, name, label, type }) => {
      settingField = document.createElement("div");
      settingField.setAttribute("class", "settingsField");

      settingsFieldControl = document.createElement("label");
      settingsFieldControl.setAttribute("class", "settingsFieldLabel");

      settingsFieldControlInput = document.createElement("input");
      settingsFieldControlInput.setAttribute("name", name);
      settingsFieldControlInput.setAttribute("id", id);
      settingsFieldControlInput.setAttribute("type", type);
      settingsFieldControl.appendChild(settingsFieldControlInput);

      settingsFieldControlSpan = document.createElement("span");
      settingsFieldControlSpan.setAttribute("class", "settingsCheckThumb");
      settingsFieldControl.appendChild(settingsFieldControlSpan);
      settingField.appendChild(settingsFieldControl);

      settingsFieldDescription = document.createElement("p");
      settingsFieldDescription.innerText = label;
      settingField.appendChild(settingsFieldDescription);

      settingDialog.appendChild(settingField);
    });
  }

  static #setSettingValues() {
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
