import { Drawing } from "..";
import {
  FONT_FAMILY,
  FONT_KERNING,
  FONT_STRETCH,
  FONT_VARIANT_CAPS,
  SMOOTHING_ENABLED,
  SMOOTHING_QUALITY,
  TEXT_ALIGN,
  TEXT_BASELINE,
  TEXT_RENDERING,
} from "../../constants";
import { TDrawTextNode } from "../../types";

export class TextShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  #setContext(fontSize: string, color: string) {
    this.#context.textAlign = TEXT_ALIGN;
    this.#context.textBaseline = TEXT_BASELINE;
    this.#context.textRendering = TEXT_RENDERING;
    this.#context.fontKerning = FONT_KERNING;
    this.#context.fontStretch = FONT_STRETCH;
    this.#context.fontVariantCaps = FONT_VARIANT_CAPS;
    this.#context.font = fontSize;
    this.#context.fillStyle = color;
    this.#context.imageSmoothingEnabled = SMOOTHING_ENABLED;
    this.#context.imageSmoothingQuality = SMOOTHING_QUALITY;
  }

  drawText({ cordinateX, cordinateY, value }: TDrawTextNode) {
    const screenUnit = Drawing.getScreenUnit();

    this.#setContext(
      FONT_FAMILY.replace("{0}", screenUnit / 4 + "px"),
      Drawing.getTextColor()!
    );

    this.#context.fillText(
      value,
      cordinateX,
      cordinateY,
      screenUnit - Drawing.getLineWidth() * 2
    );
  }
}
