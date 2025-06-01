import { Drawing } from "..";
import {
  SMOOTHING_ENABLED,
  SMOOTHING_QUALITY,
  STROKE_STYLE,
} from "../../constants";
import { LineNode } from "../../types";

export class LineShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  #setContext(lineWidth: number) {
    this.#context.lineWidth = lineWidth;
    this.#context.strokeStyle = STROKE_STYLE;
    this.#context.imageSmoothingEnabled = SMOOTHING_ENABLED;
    this.#context.imageSmoothingQuality = SMOOTHING_QUALITY;
    this.#context.strokeStyle = Drawing.getLineColor()!;
  }

  drawLine({ startX, startY, endX, endY, lineWidth }: LineNode) {
    this.#setContext(lineWidth);
    this.#context.beginPath();
    this.#context.moveTo(startX, startY);
    this.#context.lineTo(endX, endY);
    this.#context.stroke();
  }

  clearLine({ clearWidth, clearHeight, clearStartX, clearStartY }: LineNode) {
    this.#context.clearRect(clearStartX, clearStartY, clearWidth, clearHeight);
  }
}
