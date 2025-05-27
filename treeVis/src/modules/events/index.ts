import {
  SETTINGS_NUMBER_INPUT,
  TREE_INPUT,
  TREE_INPUT_CONTAINER,
  TREE_INPUT_OPTION_FORMAT,
  TREE_INPUT_OPTION_REDRAW,
  TREE_SETTINGS_CANCEL,
  TREE_SETTINGS_CONTAINER,
  TREE_SETTINGS_SAVE,
  TREE_VISUAL,
  TREE_VISUAL_HEADER_SETTINGS,
  TREE_VISUAL_SETTINGS_CLOSE,
} from "../constants";
import { Handler } from "./handler";

export class Events {
  #handler: Handler;

  constructor() {
    this.#handler = new Handler();
  }

  static register() {
    const events = new Events();
    events.#registerTreeInputChangeListener();
    events.#registerTreeInputFocusOutListener();
    events.#registerTreeInputOptionClickListener();
    events.#registerSettingsClickListener();
    events.#registerSettingsInputListener();
    events.#registerDragListeners();
  }

  #registerTreeInputChangeListener() {
    document
      .querySelector(TREE_INPUT)!
      .addEventListener("input", () => this.#handler.inputChanged(), false);
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

  #registerSettingsClickListener() {
    const settingsModal = document.querySelector(TREE_SETTINGS_CONTAINER)!;
    document.querySelector(TREE_VISUAL_HEADER_SETTINGS)!.addEventListener(
      "click",
      () => {
        settingsModal.setAttribute("class", "block");
      },
      false
    );

    document.querySelector(TREE_VISUAL_SETTINGS_CLOSE)!.addEventListener(
      "click",
      () => {
        settingsModal.setAttribute("class", "hidden");
      },
      false
    );

    document.querySelector(TREE_SETTINGS_CANCEL)!.addEventListener(
      "click",
      () => {
        settingsModal.setAttribute("class", "hidden");
      },
      false
    );

    document.querySelector(TREE_SETTINGS_SAVE)!.addEventListener(
      "click",
      () => {
        this.#handler.settingsSubmitted();
        settingsModal.setAttribute("class", "hidden");
      },
      false
    );
  }

  #registerSettingsInputListener() {
    document.querySelectorAll(SETTINGS_NUMBER_INPUT)!.forEach((input) =>
      input.addEventListener(
        "keyup",
        (event) => {
          this.#handler.numericalSettingChanged(
            event.target as HTMLInputElement,
            1,
            10
          );
        },
        false
      )
    );
  }

  #registerTreeInputOptionClickListener() {
    document.querySelector(TREE_INPUT_OPTION_REDRAW)!.addEventListener(
      "click",
      () => {
        const inputChangeEvent = new Event("input", {
          bubbles: false,
          cancelable: true,
        });
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

  // TODO: handle download canvas functionality

  #registerDragListeners() {
    [TREE_INPUT_CONTAINER, TREE_VISUAL].forEach((container) => {
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

      const elementContainer: HTMLElement = document.querySelector(container)!;

      elementContainer.setAttribute("draggable", "true");
      elementContainer.classList.add("draggable");
      elementContainer.addEventListener("dragstart", dragStart, false);
      elementContainer.addEventListener("dragend", dragEnd, false);
    });
  }
}
