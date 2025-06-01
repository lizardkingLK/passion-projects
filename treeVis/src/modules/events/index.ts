import {
  CLASS_BLOCK,
  CLASS_HIDDEN,
  TREE_INPUT,
  TREE_INPUT_CONTAINER,
  TREE_INPUT_OPTION_FORMAT,
  TREE_INPUT_OPTION_REDRAW,
  TREE_SETTINGS_FOOTER_CLOSE,
  TREE_SETTINGS_HEADER_CLOSE,
  TREE_SETTINGS_CONTAINER,
  TREE_SETTINGS_SAVE,
  TREE_VISUAL,
  TREE_VISUAL_HEADER_SETTINGS,
  TREE_HELP_CONTAINER,
  TREE_VISUAL_HEADER_HELP,
  TREE_HELP_HEADER_CLOSE,
  TREE_HELP_FOOTER_CLOSE,
  CLASS_SETTINGS_NUMBER_INPUT,
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
    events.#registerDialogClickListener();
    events.#registerSettingsInputListener();
    events.#registerDragListeners();
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

  #registerDialogClickListener() {
    [
      {
        dialogQuerySelector: TREE_SETTINGS_CONTAINER,
        dialogOpenQuerySelector: TREE_VISUAL_HEADER_SETTINGS,
        dialogCloseHeaderQuerySelector: TREE_SETTINGS_HEADER_CLOSE,
        dialogCloseFooterQuerySelector: TREE_SETTINGS_FOOTER_CLOSE,
        dialogSaveQuerySelector: TREE_SETTINGS_SAVE,
      },
      {
        dialogQuerySelector: TREE_HELP_CONTAINER,
        dialogOpenQuerySelector: TREE_VISUAL_HEADER_HELP,
        dialogCloseHeaderQuerySelector: TREE_HELP_HEADER_CLOSE,
        dialogCloseFooterQuerySelector: TREE_HELP_FOOTER_CLOSE,
        dialogSaveQuerySelector: null,
      },
    ].forEach(
      ({
        dialogQuerySelector,
        dialogOpenQuerySelector,
        dialogCloseHeaderQuerySelector,
        dialogCloseFooterQuerySelector,
        dialogSaveQuerySelector,
      }) => {
        let dialogModal = document.querySelector(dialogQuerySelector)!;

        document.querySelector(dialogOpenQuerySelector)!.addEventListener(
          "click",
          () => {
            dialogModal.setAttribute("class", CLASS_BLOCK);
          },
          false
        );

        document
          .querySelector(dialogCloseHeaderQuerySelector)!
          .addEventListener(
            "click",
            () => {
              dialogModal.setAttribute("class", CLASS_HIDDEN);
            },
            false
          );

        document
          .querySelector(dialogCloseFooterQuerySelector)!
          .addEventListener(
            "click",
            () => {
              dialogModal.setAttribute("class", CLASS_HIDDEN);
            },
            false
          );

        if (!dialogSaveQuerySelector) {
          return;
        }

        document.querySelector(dialogSaveQuerySelector)!.addEventListener(
          "click",
          () => {
            this.#handler.settingsSubmitted();
            dialogModal.setAttribute("class", CLASS_HIDDEN);
          },
          false
        );
      }
    );
  }

  #registerSettingsInputListener() {
    document.querySelectorAll(CLASS_SETTINGS_NUMBER_INPUT)!.forEach((input) =>
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
