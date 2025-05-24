import { Canvas } from "../canvas";
import {
  COLOR_ERROR,
  COLOR_INFO,
  INFO_FORMATTED_INPUT,
  KEY_TREE_JSON_INPUT_CONTENT,
  SETTING_USE_AUTO_FORMAT,
  SETTING_USE_AUTO_SAVE,
  TIME_FOUR_SECONDS,
  TIME_ONE_SECOND,
  TREE_INPUT,
  TREE_INPUT_HEADER_TITLE,
} from "../constants";
import { Drawing } from "../drawing";
import { Settings } from "../settings";
import {
  validateJsonInput,
  treeAnalyze,
  popupStatusMessage,
  isValidJsonInput,
  getLocalStorageItem,
  setLocalStorageItem,
} from "../utility";
import { IInput } from "./inputStrategy";

export class JsonInput implements IInput {
  #canvas: Canvas;

  constructor(canvas: Canvas) {
    this.#canvas = canvas;
  }

  initialize(): void {
    const inputContent = getLocalStorageItem(KEY_TREE_JSON_INPUT_CONTENT) ?? "";
    const inputElement = document.querySelector(
      TREE_INPUT
    )! as HTMLTextAreaElement;
    inputElement.value = inputContent;
  }

  validate(): void {
    const { isSuccess, message } = isValidJsonInput();
    if (!isSuccess) {
      popupStatusMessage({
        color: COLOR_ERROR,
        message: message!,
        duration: TIME_ONE_SECOND,
      });

      return;
    }

    if (Settings.get<boolean>(SETTING_USE_AUTO_FORMAT)) {
      this.format(isSuccess, message);
    }
  }

  format(isSuccess?: boolean, message?: string | null): void {
    if (isSuccess === undefined && message === undefined) {
      const isValidJsonResult = isValidJsonInput();
      isSuccess = isValidJsonResult.isSuccess;
      message = isValidJsonResult.message;
    }

    if (!isSuccess) {
      popupStatusMessage({
        color: COLOR_ERROR,
        message: message!,
        duration: TIME_ONE_SECOND,
      });

      return;
    }

    const treeInput = document.querySelector(
      TREE_INPUT
    )! as HTMLTextAreaElement;

    treeInput.value = JSON.stringify(JSON.parse(treeInput.value), undefined, 2);

    if (Settings.get<boolean>(SETTING_USE_AUTO_SAVE)) {
      this.save(treeInput.value);
    }

    popupStatusMessage({
      color: COLOR_INFO,
      duration: TIME_ONE_SECOND,
      message: INFO_FORMATTED_INPUT,
    });
  }

  setHeading(): void {
    document.querySelector(TREE_INPUT_HEADER_TITLE)!.innerHTML = "Json Input";
  }

  setVisual() {
    this.#canvas.clearGrid();
    this.#canvas.clearNodes();
    this.#canvas.setSize(0, 0);
  }

  draw(): void {
    const now = Date.now();

    const inputContent = this.read();

    this.#canvas.clearGrid();
    this.#canvas.clearNodes();
    this.#canvas.setSize(0, 0);

    const {
      isSuccess: isValidObject,
      data: validData,
      message: validationErrorMessage,
    } = validateJsonInput(inputContent);
    if (!isValidObject) {
      console.error(validationErrorMessage);
      return;
    }

    const {
      isSuccess: isValidAnalyze,
      data: analizedData,
      message: analizeErrorMessage,
    } = treeAnalyze(validData!);
    if (!isValidAnalyze) {
      console.error(analizeErrorMessage);
      return;
    }

    const { width, height, root } = analizedData!;

    this.#canvas.setSize(
      width * Drawing.screenUnit,
      height * Drawing.screenUnit
    );
    this.#canvas.drawGrid(height, width);
    this.#canvas.drawNodes(width, root);

    popupStatusMessage({
      color: COLOR_INFO,
      message: `${Date.now() - now} ms`,
      duration: TIME_FOUR_SECONDS,
    });
  }

  save(inputContent: string): void {
    setLocalStorageItem(KEY_TREE_JSON_INPUT_CONTENT, inputContent);
  }

  load() {
    return getLocalStorageItem(KEY_TREE_JSON_INPUT_CONTENT);
  }

  read(): string {
    const value = (
      document.querySelector(TREE_INPUT)! as HTMLTextAreaElement
    ).value.trim();

    this.save(value);

    return value;
  }
}
