import {
  CANVAS_WIDTH as cWidth,
  CANVAS_HEIGHT as cHeight,
  TREE_VISUAL,
} from "./constants";
import { Circle } from "./types";

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

  drawCircle({ centerX, centerY, radius }: Circle) {
    // add stroke style
    this.#context.strokeStyle = "black";

    // set starting angle
    const startAngle = Math.atan(centerY / centerX);

    // draw a circle
    this.#context.arc(
      centerX,
      centerY,
      radius,
      startAngle,
      2 * Math.PI + startAngle
    );

    this.#context.stroke();
  }
}
