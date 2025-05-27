import { KEY_TREE_VISUAL_SETTINGS, TREE_SETTINGS_BODY } from "../constants";
import settingsJson from "./settings.json";
import { Json } from "../types";
import { Input } from "../input";
import { getLocalStorageItem, setLocalStorageItem } from "../storing";

export class Settings {
  static settings: Json | null = null;

  static initialize() {
    this.evaluateSettings();
    this.#setSettingsUI();
  }

  static evaluateSettings() {
    const settingsResult = getLocalStorageItem(KEY_TREE_VISUAL_SETTINGS);
    if (settingsResult) {
      Settings.settings = JSON.parse(settingsResult);
    }

    this.#setupReflectingUI();
  }

  static saveSettings() {
    const settingsFields = document.querySelectorAll(
      ".settingsField label input"
    );
    const settingsJson: Json = {};
    let element;
    let fieldName;
    for (const settingField in settingsFields) {
      if (Object.prototype.hasOwnProperty.call(settingsFields, settingField)) {
        element = settingsFields[settingField] as HTMLInputElement;
        fieldName = element.getAttribute("name")!;
        if (element.type === "checkbox") {
          settingsJson[fieldName] = element.checked;
        } else if (element.type === "number") {
          settingsJson[fieldName] = element.value;
        }
      }
    }

    setLocalStorageItem(KEY_TREE_VISUAL_SETTINGS, JSON.stringify(settingsJson));
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

  static #setupReflectingUI() {
    Input.getInstance().switchInput();
  }

  static #setSettingsUI() {
    this.#setSettingDialog();
    this.#setSettingValues();
  }

  static #setSettingDialog() {
    const settingDialog = document.querySelector(
      TREE_SETTINGS_BODY
    )! as HTMLDivElement;
    let settingField: HTMLDivElement;
    let settingsFieldInputContainer: HTMLLabelElement;
    let settingsFieldDescriptionContainer: HTMLDivElement;
    settingsJson.map(({ id, name, label, description, type }) => {
      settingField = document.createElement("div");
      settingField.setAttribute("class", "settingsField");

      settingsFieldInputContainer = Settings.#getSettingsControl({
        id,
        name,
        type,
      });

      settingsFieldDescriptionContainer = Settings.#getSettingsDescription(
        label,
        description
      );

      settingField.appendChild(settingsFieldDescriptionContainer);
      settingField.appendChild(settingsFieldInputContainer);
      settingDialog.appendChild(settingField);
    });
  }

  static #getSettingsDescription(
    label: string,
    description: string
  ): HTMLDivElement {
    const settingsFieldDescriptionContainer = document.createElement("div");
    settingsFieldDescriptionContainer.setAttribute(
      "class",
      "settingsFieldDescription"
    );

    const settingsFieldHeader = document.createElement("p");
    settingsFieldHeader.innerText = label;
    settingsFieldDescriptionContainer.appendChild(settingsFieldHeader);

    const settingsFieldDescription = document.createElement("h5");
    settingsFieldDescription.innerText = description;
    settingsFieldDescriptionContainer.appendChild(settingsFieldDescription);

    return settingsFieldDescriptionContainer;
  }

  static #getSettingsControl({
    id,
    name,
    type,
  }: {
    id: string;
    name: string;
    type: string;
  }): HTMLLabelElement {
    const settingsFieldContainer = document.createElement("label");
    settingsFieldContainer.setAttribute(
      "class",
      `${type}SettingsFieldContainer`
    );

    const settingsFieldControlInput = document.createElement("input");
    settingsFieldControlInput.setAttribute("name", name);
    settingsFieldControlInput.setAttribute("id", id);
    settingsFieldControlInput.setAttribute("type", type);
    settingsFieldContainer.appendChild(settingsFieldControlInput);

    const settingsFieldControlSpan = document.createElement("span");
    settingsFieldContainer.appendChild(settingsFieldControlSpan);

    return settingsFieldContainer;
  }

  static #setSettingValues() {
    const settings = Settings.settings;
    if (!settings) {
      return;
    }

    let element: HTMLInputElement | null;
    for (const item in settings) {
      if (!Object.prototype.hasOwnProperty.call(settings, item)) {
        continue;
      }

      element = document.querySelector(`input[name=${item}]`);
      if (!element) {
        continue;
      }

      if (element.type === "checkbox") {
        element.checked = settings[item] as boolean;
      } else if (element.type === "number") {
        element.value = settings[item] as string;
      }
    }
  }
}
