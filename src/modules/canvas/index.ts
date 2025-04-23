import { CircleShape } from "../drawing/circle";
import { CircleNode } from "../types";
import {
  TREE_VISUAL,
} from "../constants";

export class Canvas {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #circle: CircleShape;

  constructor() {
    this.#canvas = document.querySelector(TREE_VISUAL)!;
    this.#initializeCanvas();

    this.#context = this.#canvas.getContext("2d")!;
    this.#initializeContext();

    this.#circle = new CircleShape(this.#context);
  }

  #initializeCanvas() {
    this.#canvas.width = window.innerWidth;
    this.#canvas.height = window.innerHeight;
  }

  #initializeContext() {
    this.#context.lineWidth = 1;
    this.#context.strokeStyle = "black";
    this.#context.imageSmoothingEnabled = true;
    this.#context.imageSmoothingQuality = "high";
  }

  drawCircle(circleConfig: CircleNode) {
    this.#circle.drawCircle(circleConfig);
  }

  clearCircle(circleConfig: CircleNode) {
    this.#circle.clearCircle(circleConfig);
  }
}
