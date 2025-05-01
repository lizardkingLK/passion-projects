import { CircleShape } from "../drawing/circle";
import { Grid } from "../drawing/grid";
import { CircleNode, LineNode } from "../types";
import { SCREEN_UNIT, TREE_VISUAL } from "../constants";
import { LineShape } from "../drawing/line";

export class Canvas {
  #canvas: HTMLCanvasElement;
  #context: CanvasRenderingContext2D;
  #grid: Grid;
  #circle: CircleShape;
  #line: LineShape;

  constructor() {
    this.#canvas = document.querySelector(TREE_VISUAL)!;
    this.#setCanvasSize(0, 0);

    this.#context = this.#canvas.getContext("2d")!;
    this.#initializeContext();

    this.#circle = new CircleShape(this.#context);

    this.#grid = new Grid(this.#context);

    this.#line = new LineShape(this.#context);
  }

  #setCanvasSize(width: number, height: number) {
    this.#canvas.width = width;
    this.#canvas.height = height;
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

  drawGrid(height: number, width: number) {
    this.#setCanvasSize(width * SCREEN_UNIT, height * SCREEN_UNIT);
    this.#grid.drawGrid(
      height,
      width,
      height * SCREEN_UNIT,
      width * SCREEN_UNIT
    );
  }

  clearGrid() {
    // this.#setCanvasSize(10 * SCREEN_UNIT, 10 * SCREEN_UNIT);
    this.#grid.clearGrid();
  }

  drawEdge() {}

  clearEdges(edges: LineNode[]) {
    edges.forEach((edge) => {
      this.#line.clearLine(edge);
    });
  }
}
