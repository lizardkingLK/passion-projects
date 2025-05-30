import { Drawing } from "..";
import { LineNode } from "../../types";
import { LineShape } from "../line";

export class GridShape {
  #context: CanvasRenderingContext2D;
  #line: LineShape;
  #grid: LineNode[];
  #timeoutRefs: number[];

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
    this.#line = new LineShape(this.#context);
    this.#grid = [];
    this.#timeoutRefs = [];
  }

  drawGrid(
    hLevel: number,
    wLevel: number,
    canvasHeight: number,
    canvasWidth: number
  ) {
    const lineWidth = Drawing.getLineWidth();
    const screenUnit = Drawing.getScreenUnit();
    let startX;
    let startY;
    let endX;
    let endY;
    let line: LineNode;
    let i: number;
    let clearStartX: number;
    let clearStartY: number;
    let clearWidth: number;
    let clearHeight: number;

    // horizontal lines
    for (i = 0; i < hLevel - 1; i++) {
      startX = 0;
      startY = (i + 1) * screenUnit;

      endX = canvasWidth;
      endY = (i + 1) * screenUnit;

      clearWidth = canvasWidth;
      clearHeight = lineWidth;
      clearStartX = 0;
      clearStartY = startY - lineWidth / 2;

      line = {
        startX,
        startY,
        endX,
        endY,
        lineWidth,
        clearWidth,
        clearHeight,
        clearStartX,
        clearStartY,
      };

      this.#grid.push(line);
    }

    // vertical lines
    for (i = 0; i < wLevel - 1; i++) {
      startX = (i + 1) * screenUnit;
      startY = 0;

      endX = (i + 1) * screenUnit;
      endY = canvasHeight;

      clearWidth = lineWidth;
      clearHeight = canvasHeight;
      clearStartX = startX - lineWidth / 2;
      clearStartY = 0;

      line = {
        startX,
        startY,
        endX,
        endY,
        lineWidth,
        clearWidth,
        clearHeight,
        clearStartX,
        clearStartY,
      };

      this.#grid.push(line);
    }

    // clear previous refs first
    this.#timeoutRefs.forEach((timeoutRefId) => {
      clearTimeout(timeoutRefId);
    });

    // draw lines - asynchronously
    this.#timeoutRefs = this.#grid.map((line) =>
      setTimeout(() => this.#line.drawLine(line), Math.random() * 10)
    );
  }

  clearGrid() {
    let lineNode;
    for (let index = 0; index < this.#grid.length; index++) {
      lineNode = this.#grid[index] as LineNode;

      this.#line.clearLine(lineNode);
    }

    this.#grid = [];
  }
}
