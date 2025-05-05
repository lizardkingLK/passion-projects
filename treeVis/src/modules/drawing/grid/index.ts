import { LINE_WIDTH, SCREEN_UNIT } from "../../constants";
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

  drawGrid(hLevel: number, wLevel: number, height: number, width: number) {
    let startX;
    let startY;
    let endX;
    let endY;
    let line: LineNode;
    let i: number;
    for (i = 0; i < hLevel - 1; i++) {
      startX = 0;
      startY = (i + 1) * SCREEN_UNIT;
      endX = width;
      endY = (i + 1) * SCREEN_UNIT;
      line = { startX, startY, endX, endY, lineWidth: LINE_WIDTH };
      this.#grid.push(line);
      this.#line.drawLine(line);
    }

    for (i = 0; i < wLevel - 1; i++) {
      startX = (i + 1) * SCREEN_UNIT;
      startY = 0;
      endX = (i + 1) * SCREEN_UNIT;
      endY = height;
      line = { startX, startY, endX, endY, lineWidth: LINE_WIDTH };
      this.#grid.push(line);
      this.#line.drawLine(line);
    }
  }

  clearGrid() {
    let lineNode;
    for (let index = 0; index < this.#grid.length; index++) {
      lineNode = this.#grid[index] as LineNode;
      this.#line.clearLine(lineNode);
    }
  }
}
