import { popupStatusMessage, treeAnalyze, validateJson } from "../utility";
import { Canvas } from "../canvas";
import { COLOR_INFO } from "../constants";

export class Handler {
  #canvas: Canvas;

  constructor() {
    this.#canvas = new Canvas();
  }

  inputChanged(event: Event) {
    this.#canvas.clearGrid();
    this.#canvas.clearNodes();

    const {
      isSuccess: isValidObject,
      data: validData,
      message: validationErrorMessage,
    } = validateJson((<HTMLTextAreaElement>event.target).value);
    if (!isValidObject) {
      console.error(validationErrorMessage);
      return;
    }

    const now = Date.now();

    const {
      isSuccess: isValidAnalyze,
      data: analizedData,
      message: analizeErrorMessage,
    } = treeAnalyze(validData!);
    if (!isValidAnalyze) {
      console.error(analizeErrorMessage);
      return;
    }

    const { width, height,root } = analizedData!;
    this.#canvas.drawGrid(height, width);
    this.#canvas.drawNodes(width, root);

    popupStatusMessage({
      color: COLOR_INFO,
      message: `${Date.now() - now} ms`,
      duration: 4000,
    });
  }

  elementDragged(
    previousLeft: number,
    currentLeft: number,
    previousTop: number,
    currentTop: number
  ) {
    return {
      dragStart: (event: DragEvent) => {
        previousLeft = event.pageX;
        previousTop = event.pageY;
      },
      dragEnd: (event: DragEvent) => {
        currentLeft = event.pageX;
        currentTop = event.pageY;

        const target = event.currentTarget as HTMLElement;
        const bcr = target.getBoundingClientRect();

        const newCenterX =
          window.scrollX +
          bcr.left +
          bcr.width / 2 +
          (currentLeft - previousLeft) +
          "px";
        target.style.left = newCenterX;

        const newCenterY =
          window.scrollY +
          bcr.top +
          bcr.height / 2 +
          (currentTop - previousTop) +
          "px";
        target.style.top = newCenterY;
      },
    };
  }
}
