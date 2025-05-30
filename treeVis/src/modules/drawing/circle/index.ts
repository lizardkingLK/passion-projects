import { Drawing } from "..";
import { TDrawCircleNode } from "../../types";

export class CircleShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  drawCircle({ cordinateX, cordinateY, radius }: TDrawCircleNode) {
    this.#context.lineWidth = Drawing.getLineWidth();
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
    const lineWidth = Drawing.getLineWidth();
    
    this.#context.clearRect(
      cordinateX - radius - lineWidth,
      cordinateY - radius - lineWidth,
      radius * 2 + 2 * lineWidth,
      radius * 2 + 2 * lineWidth
    );
  }
}
