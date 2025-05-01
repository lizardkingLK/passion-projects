import { TREE_INPUT, TREE_INPUT_CONTAINER } from "../constants";
import { Handler } from "./handler";

export class Events {
  #handler: Handler;

  constructor() {
    this.#handler = new Handler();
  }

  static registerEvents() {
    const events = new Events();
    events.#registerTreeInputChangeListener();
    events.#registerDragListeners();
  }

  #registerTreeInputChangeListener() {
    document
      .querySelector(TREE_INPUT)!
      .addEventListener(
        "input",
        (event) => this.#handler.inputChanged(event),
        false
      );
  }

  #registerDragListeners() {
    [TREE_INPUT_CONTAINER].forEach((container) => {
      let left: number = 0;
      let top: number = 0;

      const { dragOver, dragEnd } = this.#handler.elementDragged(left, top);

      document.addEventListener("dragover", dragOver, false);

      const elementContainer: HTMLElement = document.querySelector(container)!;

      elementContainer.addEventListener("dragend", dragEnd, false);
    });
  }
}
