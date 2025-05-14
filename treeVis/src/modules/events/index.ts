import {
  TREE_INPUT,
  TREE_INPUT_CONTAINER,
  TREE_SETTINGS_CONTAINER,
  TREE_VISUAL_HEADER_SETTINGS,
  TREE_VISUAL_SETTINGS_CLOSE,
} from "../constants";
import { Handler } from "./handler";

export class Events {
  #handler: Handler;

  constructor() {
    this.#handler = new Handler();
  }

  static registerEvents() {
    const events = new Events();
    events.#registerTreeInputChangeListener();
    events.#registerTreeInputFocusOutListener();
    events.#registerSettingsClickListener();
    events.#registerDragListeners();
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
  }

  // TODO: handle download canvas functionality

  #registerTreeInputChangeListener() {
    document
      .querySelector(TREE_INPUT)!
      .addEventListener(
        "input",
        (event) => this.#handler.inputChanged(event),
        false
      );
  }

  #registerTreeInputFocusOutListener() {
    document
      .querySelector(TREE_INPUT)!
      .addEventListener("focusout", () => this.#handler.inputFocusOut(), false);
  }

  #registerDragListeners() {
    [TREE_INPUT_CONTAINER].forEach((container) => {
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
      elementContainer.addEventListener("dragstart", dragStart, false);
      elementContainer.addEventListener("dragend", dragEnd, false);
    });
  }
}
