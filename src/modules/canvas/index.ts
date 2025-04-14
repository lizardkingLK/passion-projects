import { CircleShape } from "../shapes/circle";
import { Circle } from "../types";
import {
  TREE_VISUAL,
  CANVAS_WIDTH as cWidth,
  CANVAS_HEIGHT as cHeight,
} from "../constants";

export class Canvas {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #circle: CircleShape;

  constructor() {
    // initialize canvas
    this.#canvas = document.querySelector(TREE_VISUAL)!;
    this.#initializeCanvas();

    // initialize context
    this.#context = this.#canvas.getContext("2d")!;
    this.#initializeContext();

    // initialize circle
    this.#circle = new CircleShape(this.#context);
  }

  #initializeCanvas() {
    this.#canvas.height = cHeight;
    this.#canvas.width = cWidth;
  }

  #initializeContext() {
    this.#context.lineWidth = 1;
    this.#context.strokeStyle = "black";
    this.#context.imageSmoothingEnabled = true;
    this.#context.imageSmoothingQuality = "high";
  }

  // circle methods
  drawCircle(circleConfig: Circle) {
    this.#circle.drawCircle(circleConfig);
  }

  clearCircle(circleConfig: Circle) {
    this.#circle.clearCircle(circleConfig);    
  }
}
