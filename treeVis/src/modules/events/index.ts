import {
  draggableElements,
  sidebarButtonTogglers,
  sidebarContentTogglers,
} from "../../values";
import {
  TREE_INPUT,
  TREE_INPUT_OPTION_FORMAT,
  TREE_INPUT_OPTION_REDRAW,
  TREE_VISUAL_HEADER_SAVE,
  TREE_SETTINGS_NUMBER_INPUT,
  TREE_SIDEBAR_TOGGLE,
  TREE_SETTINGS_COLOR_INPUT,
} from "../constants";
import { Handler } from "./handler";

export class Events {
  #handler: Handler;

  constructor() {
    this.#handler = new Handler();
  }

  static register() {
    const events = new Events();
    events.#registerSidebarListeners();
    events.#registerTreeInputChangeListener();
    events.#registerTreeInputFocusOutListener();
    events.#registerTreeInputOptionClickListener();
    events.#registerSidebarContentListener();
    events.#registerSaveClickListener();
    events.#registerSettingsInputListeners();
    events.#registerDragListeners();
  }

  #registerSidebarListeners() {
    document
      .querySelector(TREE_SIDEBAR_TOGGLE)!
      .addEventListener("click", () => this.#handler.toggleSidePane());

    sidebarButtonTogglers.forEach((elementId) => {
      document
        .querySelector(elementId)!
        .addEventListener("click", (event) =>
          this.#handler.toggleActive(event.currentTarget as HTMLButtonElement)
        );
    });
  }

  #registerTreeInputChangeListener() {
    document
      .querySelector(TREE_INPUT)!
      .addEventListener(
        "input",
        (event) => this.#handler.inputChanged(event as CustomEvent),
        false
      );
  }

  #registerTreeInputFocusOutListener() {
    document
      .querySelector(TREE_INPUT)!
      .addEventListener(
        "focusout",
        () => this.#handler.inputFocusOutValidation(),
        false
      );
  }

  #registerSidebarContentListener() {
    sidebarContentTogglers.forEach(
      ({
        sidebarContentQuerySelector,
        sidebarOpenQuerySelector,
        sidebarResetQuerySelector,
        sidebarSaveQuerySelector,
      }) => {
        const sidebarContent = document.querySelector(
          sidebarContentQuerySelector
        )! as HTMLElement;

        document
          .querySelector(sidebarOpenQuerySelector)!
          .addEventListener(
            "click",
            () => this.#handler.handleSidebarOptionOpen(sidebarContent),
            false
          );

        sidebarResetQuerySelector &&
          document
            .querySelector(sidebarResetQuerySelector)!
            .addEventListener(
              "click",
              () => this.#handler.settingsResetRequested(),
              false
            );

        sidebarSaveQuerySelector &&
          document
            .querySelector(sidebarSaveQuerySelector)!
            .addEventListener(
              "click",
              () => this.#handler.settingsSubmitted(),
              false
            );
      }
    );
  }

  #registerSettingsInputListeners() {
    document.querySelectorAll(TREE_SETTINGS_NUMBER_INPUT)!.forEach((input) =>
      input.addEventListener(
        "keyup",
        (event) => {
          this.#handler.numericalSettingChanged(
            event.target as HTMLInputElement
          );
        },
        false
      )
    );

    document
      .querySelectorAll(TREE_SETTINGS_COLOR_INPUT)!
      .forEach((input) =>
        input.addEventListener("change", (event) =>
          this.#handler.colorSettingChanged(event.target as HTMLInputElement)
        )
      );
  }

  #registerTreeInputOptionClickListener() {
    const inputChangeEvent = new CustomEvent("input", {
      bubbles: false,
      cancelable: true,
      detail: { isSynthetic: true },
    });

    document.querySelector(TREE_INPUT_OPTION_REDRAW)!.addEventListener(
      "click",
      () => {
        document.querySelector(TREE_INPUT)!.dispatchEvent(inputChangeEvent);
      },
      false
    );

    document.querySelector(TREE_INPUT_OPTION_FORMAT)!.addEventListener(
      "click",
      () => {
        this.#handler.handleInputFormat();
      },
      false
    );
  }

  #registerSaveClickListener() {
    document.querySelector(TREE_VISUAL_HEADER_SAVE)!.addEventListener(
      "click",
      () => {
        this.#handler.handleVisualSave();
      },
      false
    );
  }

  #registerDragListeners() {
    draggableElements.forEach((elementId) => {
      let previousLeft: number = 0;
      let currentLeft: number = 0;
      let previousTop: number = 0;
      let currentTop: number = 0;

      const { dragStart, dragEnd } = this.#handler.elementDragged(
        previousLeft,
        currentLeft,
        previousTop,
        currentTop
      );

      const elementContainer: HTMLElement = document.querySelector(elementId)!;

      elementContainer.classList.add("draggable");
      elementContainer.setAttribute("draggable", "true");

      elementContainer.addEventListener("dragstart", dragStart, false);
      elementContainer.addEventListener("dragend", dragEnd, false);
    });
  }
}
