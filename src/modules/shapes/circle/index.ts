import { CircleNode } from "../../types";

export class CircleShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  drawCircle({ cordinateX, cordinateY, radius }: CircleNode) {
    // stroke as a new path
    this.#context.beginPath();

    // set starting angle
    const startAngle = Math.atan(cordinateY / cordinateX);

    // draw a circle
    this.#context.arc(
      cordinateX,
      cordinateY,
      radius,
      startAngle,
      2 * Math.PI + startAngle
    );

    this.#context.stroke();
  }

  clearCircle({ cordinateX, cordinateY, radius }: CircleNode) {
    this.#context.clearRect(
      cordinateX - radius - 1,
      cordinateY - radius - 1,
      radius * 2 + 2,
      radius * 2 + 2
    );
  }
}
