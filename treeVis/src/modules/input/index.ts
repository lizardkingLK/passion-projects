import { Canvas } from "../canvas";
import { SETTING_USE_ARRAY_INPUT, SETTING_USE_AUTO_SAVE } from "../constants";
import { Settings } from "../settings";
import { ArrayInput } from "./arrayInput";
import { IInput } from "./inputStrategy";
import { JsonInput } from "./jsonInput";

export class Input {
  static #inputItem: Input;

  #input: IInput;
  #jsonInput: JsonInput;
  #arrayInput: ArrayInput;
  #canvas: Canvas;

  constructor() {
    this.#canvas = new Canvas();
    this.#jsonInput = new JsonInput(this.#canvas);
    this.#arrayInput = new ArrayInput(this.#canvas);
    this.#input = this.#jsonInput;
    this.switchInput();
  }

  static getInstance() {
    if (Input.#inputItem === undefined) {
      this.#inputItem = new Input();
    }

    return this.#inputItem;
  }

  static initialize() {
    if (!Settings.get<boolean>(SETTING_USE_AUTO_SAVE)) {
      return;
    }

    this.#inputItem.#input.initialize();
  }

  switchInput() {
    if (Settings.get<boolean>(SETTING_USE_ARRAY_INPUT)) {
      this.#input = this.#arrayInput;
    } else {
      this.#input = this.#jsonInput;
    }

    this.#input.setHeading();
    this.#input.initialize();
    this.#input.setVisual();
  }

  draw() {
    this.#input.draw();
  }

  validate() {
    this.#input.validate();
  }

  format() {
    this.#input.format();
  }

  setHeading() {
    this.#input.setHeading();
  }
}
