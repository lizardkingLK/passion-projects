import { Drawing } from "..";
import {
  STROKE_STYLE,
  SMOOTHING_ENABLED,
  SMOOTHING_QUALITY,
} from "../../constants";
import { TDrawBoxNode } from "../../types";

export class BoxShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  #setContext() {
    this.#context.strokeStyle = STROKE_STYLE;
    this.#context.imageSmoothingEnabled = SMOOTHING_ENABLED;
    this.#context.imageSmoothingQuality = SMOOTHING_QUALITY;
    this.#context.fillStyle = Drawing.getCanvasColor()!;
  }

  drawBox({ cordinateX, cordinateY, width, height }: TDrawBoxNode) {
    this.#setContext();

    this.#context.fillRect(cordinateX, cordinateY, width, height);
  }
}
