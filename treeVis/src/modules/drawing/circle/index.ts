import { Drawing } from "..";
import { SMOOTHING_ENABLED, SMOOTHING_QUALITY } from "../../constants";
import { TDrawCircleNode } from "../../types";

export class CircleShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  #setContext(lineWidth: number) {
    this.#context.lineWidth = lineWidth;
    this.#context.imageSmoothingEnabled = SMOOTHING_ENABLED;
    this.#context.imageSmoothingQuality = SMOOTHING_QUALITY;
    this.#context.strokeStyle = Drawing.getLineColor()!;
    this.#context.fillStyle = Drawing.getNodeColor()!;
  }

  drawCircle({ cordinateX, cordinateY, radius }: TDrawCircleNode) {
    const lineWidth = Drawing.getLineWidth() * 2;
    const startAngle = Math.atan(cordinateY / cordinateX);

    this.#setContext(lineWidth);

    this.#context.beginPath();

    this.#context.arc(
      cordinateX,
      cordinateY,
      radius,
      startAngle,
      2 * Math.PI + startAngle
    );

    this.#context.stroke();

    this.#context.fill();
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
