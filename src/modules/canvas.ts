import {
  CANVAS_WIDTH as cWidth,
  CANVAS_HEIGHT as cHeight,
  TREE_VISUAL,
} from "./constants";

export class Canvas {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;

  constructor() {
    this.#canvas = document.querySelector(TREE_VISUAL)!;
    this.#initializeCanvas();
    this.#context = this.#canvas.getContext("2d")!;
    this.#initializeContext();
  }

  #initializeCanvas() {
    this.#canvas.height = cHeight;
    this.#canvas.width = cWidth;
  }

  #initializeContext() {
    this.#context.lineWidth = 1;
    this.#context.imageSmoothingEnabled = true;
    this.#context.imageSmoothingQuality = "high";
  }

  drawCircle() {
    // move to 0,0
    this.#context.moveTo(0, 0);

    // line to center
    this.#context.lineTo(cWidth, cHeight);

    // add stroke style
    this.#context.strokeStyle = "black";

    // draw with stroke
    this.#context.stroke();

    // move to center
    this.#context.moveTo(cWidth / 2, cHeight / 2);

    // draw a circle
    const startAngle = Math.atan(cHeight / cWidth);
    this.#context.arc(
      cWidth / 2,
      cHeight / 2,
      500,
      startAngle,
      2 * Math.PI + startAngle
    );

    this.#context.stroke();
  }
}
