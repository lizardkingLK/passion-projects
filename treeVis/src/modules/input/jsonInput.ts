import { Canvas } from "../canvas";
import {
  COLOR_ERROR,
  COLOR_INFO,
  INFO_FORMATTED_Input,
  KEY_TREE_JSON_INPUT_CONTENT,
  SETTING_USE_AUTO_FORMAT,
  TIME_FOUR_SECONDS,
  TIME_ONE_SECOND,
  TREE_INPUT,
  TREE_INPUT_HEADER_TITLE,
} from "../constants";
import { Drawing } from "../drawing";
import { Settings } from "../settings";
import {
  validateJson,
  treeAnalyze,
  popupStatusMessage,
  isValidJson,
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
    const { isSuccess, message } = isValidJson();
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
      const isValidJsonResult = isValidJson();
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

    popupStatusMessage({
      color: COLOR_INFO,
      duration: TIME_ONE_SECOND,
      message: INFO_FORMATTED_Input,
    });
  }

  setTitle(): void {
    document.querySelector(TREE_INPUT_HEADER_TITLE)!.innerHTML = "Json Input";
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
    } = validateJson(inputContent);
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
    const value = (document.querySelector(TREE_INPUT)! as HTMLTextAreaElement)
      .value;

    this.save(value);

    return value;
  }
}
