import {
  FONT_FAMILY,
  FONT_KERNING,
  FONT_STRETCH,
  FONT_VARIANT_CAPS,
  LINE_WIDTH,
  SCREEN_UNIT,
  TEXT_ALIGN,
  TEXT_BASELINE,
  TEXT_RENDERING,
} from "../../constants";

export class TextShape {
  #context: CanvasRenderingContext2D;

  constructor(context: CanvasRenderingContext2D) {
    this.#context = context;
  }

  drawText(cordinateX: number, cordinateY: number, value: string) {
    this.#context.textAlign = TEXT_ALIGN;
    this.#context.textBaseline = TEXT_BASELINE;
    this.#context.textRendering = TEXT_RENDERING;
    this.#context.fontKerning = FONT_KERNING;
    this.#context.fontStretch = FONT_STRETCH;
    this.#context.fontVariantCaps = FONT_VARIANT_CAPS;
    this.#context.font = FONT_FAMILY;
    this.#context.fillText(
      value,
      cordinateX,
      cordinateY,
      SCREEN_UNIT - LINE_WIDTH * 2
    );
  }
}
