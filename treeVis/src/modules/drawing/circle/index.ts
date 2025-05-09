import { LINE_WIDTH } from "../../constants";
import { TDrawCircleNode } from "../../types";

export class CircleShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  drawCircle({ cordinateX, cordinateY, radius }: TDrawCircleNode) {
    this.#context.lineWidth = LINE_WIDTH;
    this.#context.beginPath();

    const startAngle = Math.atan(cordinateY / cordinateX);

    this.#context.arc(
      cordinateX,
      cordinateY,
      radius,
      startAngle,
      2 * Math.PI + startAngle
    );

    this.#context.stroke();
  }

  clearCircle({ cordinateX, cordinateY, radius }: TDrawCircleNode) {
    this.#context.clearRect(
      cordinateX - radius - LINE_WIDTH,
      cordinateY - radius - LINE_WIDTH,
      radius * 2 + 2 * LINE_WIDTH,
      radius * 2 + 2 * LINE_WIDTH
    );
  }
}
