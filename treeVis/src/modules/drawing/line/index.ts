import { LineNode } from "../../types";

export class LineShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  drawLine({ startX, startY, endX, endY, lineWidth }: LineNode) {
    this.#context.lineWidth = lineWidth;
    this.#context.beginPath();
    this.#context.moveTo(startX, startY);
    this.#context.lineTo(endX, endY);
    this.#context.stroke();
  }

  clearLine({ clearWidth, clearHeight, clearStartX, clearStartY }: LineNode) {
    this.#context.clearRect(clearStartX, clearStartY, clearWidth, clearHeight);
  }
}
