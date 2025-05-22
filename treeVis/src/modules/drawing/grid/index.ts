import { Drawing } from "..";
import { LINE_WIDTH } from "../../constants";
import { LineNode } from "../../types";
import { LineShape } from "../line";

export class GridShape {
  #context: CanvasRenderingContext2D;
  #line: LineShape;
  #grid: LineNode[];

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
    this.#line = new LineShape(this.#context);
    this.#grid = [];
  }

  drawGrid(
    hLevel: number,
    wLevel: number,
    canvasHeight: number,
    canvasWidth: number
  ) {
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
      startY = (i + 1) * Drawing.screenUnit;

      endX = canvasWidth;
      endY = (i + 1) * Drawing.screenUnit;

      clearWidth = canvasWidth;
      clearHeight = LINE_WIDTH;
      clearStartX = 0;
      clearStartY = startY - LINE_WIDTH / 2;

      line = {
        startX,
        startY,
        endX,
        endY,
        lineWidth: LINE_WIDTH,
        clearWidth,
        clearHeight,
        clearStartX,
        clearStartY,
      };

      this.#grid.push(line);
    }

    // vertical lines
    for (i = 0; i < wLevel - 1; i++) {
      startX = (i + 1) * Drawing.screenUnit;
      startY = 0;

      endX = (i + 1) * Drawing.screenUnit;
      endY = canvasHeight;

      clearWidth = LINE_WIDTH;
      clearHeight = canvasHeight;
      clearStartX = startX - LINE_WIDTH / 2;
      clearStartY = 0;

      line = {
        startX,
        startY,
        endX,
        endY,
        lineWidth: LINE_WIDTH,
        clearWidth,
        clearHeight,
        clearStartX,
        clearStartY,
      };

      this.#grid.push(line);
    }

    // draw lines - asynchronously
    this.#grid.map((line) =>
      setTimeout(() => {
        this.#line.drawLine(line);
      }, Math.random() * 10)
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
