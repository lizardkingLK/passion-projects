import { LINE_WIDTH } from "../../constants";
import { LineNode } from "../../types";

export class LineShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  drawLine({ startX, startY, endX, endY, lineWidth }: LineNode) {
    this.#context.lineWidth = lineWidth;
    this.#context.moveTo(startX, startY);
    this.#context.lineTo(endX, endY);
    this.#context.stroke();
  }

  clearLine({ startX, startY, endX, endY }: LineNode) {
    const width = endX - startX;
    const height = endY - startY;

    this.#context.clearRect(
      startX,
      startY,
      width ?? LINE_WIDTH,
      height ?? LINE_WIDTH
    );
  }
}
