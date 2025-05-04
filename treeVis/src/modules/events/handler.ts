import { inDepthAnalyze, validateJson } from "../utility";
import { Canvas } from "../canvas";

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

    const {
      isSuccess: isValidAnalyze,
      data: analizedData,
      message: analizeErrorMessage,
    } = inDepthAnalyze(validData!);
    if (!isValidAnalyze) {
      console.error(analizeErrorMessage);
      return;
    }

    const { width, height, nodes } = analizedData!;

    this.#canvas.drawGrid(height, width);
    this.#canvas.drawNodes(width, height, nodes);
  }

  // getCircleConfig(level: number | null): CircleNode {
  //   // TODO: set cordinateX and cordinateY actuals
  //   let config: CircleNode = {
  //     cordinateX: Math.random() * window.innerWidth,
  //     cordinateY: Math.random() * window.innerHeight,
  //     radius: 20,
  //   };

  //   return config;
  // }

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
          window.scrollX + bcr.left + bcr.width / 2 + (currentLeft - previousLeft) + "px";
        target.style.left = newCenterX;

        const newCenterY =
        window.scrollY + bcr.top + bcr.height / 2 + (currentTop - previousTop) + "px";
        target.style.top = newCenterY;
      },
    };
  }
}
