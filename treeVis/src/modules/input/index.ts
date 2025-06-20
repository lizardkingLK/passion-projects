import { Canvas } from "../canvas";
import { SETTING_USE_JSON_INPUT } from "../constants";
import { Settings } from "../settings";
import { Json } from "../types";
import { InputStrategy } from "./strategy";
import { ArrayInput } from "./strategy/arrayInput";
import { JsonInput } from "./strategy/jsonInput";

export class Input {
  static #inputItem: Input;

  #input: InputStrategy<Json | number[]>;
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

  switchInput() {
    this.#input = Settings.get<boolean>(SETTING_USE_JSON_INPUT)
      ? this.#jsonInput
      : this.#arrayInput;

    this.#input.setHeading();
    this.#input.initialize();
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
