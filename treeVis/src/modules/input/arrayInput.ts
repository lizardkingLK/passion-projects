import { Canvas } from "../canvas";
import {
  KEY_TREE_ARRAY_INPUT_CONTENT,
  TREE_INPUT,
  TREE_INPUT_HEADER_TITLE,
} from "../constants";
import { getLocalStorageItem, setLocalStorageItem } from "../utility";
import { IInput } from "./inputStrategy";

export class ArrayInput implements IInput {
  #canvas: Canvas;

  constructor(canvas: Canvas) {
    this.#canvas = canvas;
  }

  initialize(): void {
    const inputContent =
      getLocalStorageItem(KEY_TREE_ARRAY_INPUT_CONTENT) ?? "";
    const inputElement = document.querySelector(
      TREE_INPUT
    )! as HTMLTextAreaElement;
    inputElement.value = inputContent;
  }

  validate(): void {
    throw new Error("Method not implemented.");
  }

  format(isSuccess?: boolean, message?: string | null): void {
    console.log(isSuccess, message, this.#canvas.clearCircle);

    throw new Error("Method not implemented.");
  }

  setTitle(): void {
    document.querySelector(TREE_INPUT_HEADER_TITLE)!.innerHTML = "Array Input";
  }

  draw(): void {
    throw new Error("Method not implemented.");
  }

  save(inputContent: string): void {
    setLocalStorageItem(KEY_TREE_ARRAY_INPUT_CONTENT, inputContent);
  }

  load() {
    return getLocalStorageItem(KEY_TREE_ARRAY_INPUT_CONTENT);
  }

  read(): string {
    const value = (document.querySelector(TREE_INPUT)! as HTMLTextAreaElement)
      .value;

    this.save(value);

    return value;
  }
}
