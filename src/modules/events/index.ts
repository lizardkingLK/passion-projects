import { Canvas } from "../canvas";
import { TREE_INPUT, TREE_INPUT_CONTAINER } from "../constants";
import { Handler } from "./handler";

export class Events {
  static registerEvents() {
    const events = new Events();
    events.#registerTreeInputChangeListener();
    events.#registerTreeInputDragListener();
  }

  #registerTreeInputChangeListener() {
    const canvas = new Canvas();
    const handler = new Handler();

    document
      .querySelector(TREE_INPUT)!
      .addEventListener(
        "input",
        (event: Event) => handler.inputChanged(event, canvas),
        false
      );
  }

  #registerTreeInputDragListener() {
    const treeInputContainer: HTMLElement =
      document.querySelector(TREE_INPUT_CONTAINER)!;

    let left: number;
    let top: number;

    document.addEventListener(
      "dragover",
      (event: DragEvent) => {
        left = event.pageX;
        top = event.pageY;
      },
      false
    );

    treeInputContainer.addEventListener(
      "dragend",
      () => {
        treeInputContainer.style.left = `${left}px`;
        treeInputContainer.style.top = `${top}px`;
      },
      false
    );
  }
}
