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
