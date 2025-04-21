import { CircleShape } from "../shapes/circle";
import { CircleNode } from "../types";
import {
  TREE_VISUAL,
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
    this.#canvas.width = window.screen.width;
    this.#canvas.height = window.screen.height;
  }

  #initializeContext() {
    this.#context.lineWidth = 1;
    this.#context.strokeStyle = "black";
    this.#context.imageSmoothingEnabled = true;
    this.#context.imageSmoothingQuality = "high";
  }

  // circle methods
  drawCircle(circleConfig: CircleNode) {
    this.#circle.drawCircle(circleConfig);
  }

  clearCircle(circleConfig: CircleNode) {
    this.#circle.clearCircle(circleConfig);
  }
}
